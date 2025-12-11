import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProductsContext = createContext();

const API_URL = "https://6938784f4618a71d77d061c4.mockapi.io/products";

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Error al cargar productos");
            const data = await response.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            toast.error(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (newProduct) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) throw new Error("Error al crear producto");
            const savedProoduct = await response.json();
            setProducts(prev => [...prev, savedProoduct]);
            toast.success("Producto creado exitosamente");
            return true;
        } catch (err) {
            toast.error("No se pudo crear el producto");
            return false;
        }
    };

    const updateProduct = async (id, updatedData) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error("Error al actualizar");
            const savedProduct = await response.json();
            setProducts(prev => prev.map(p => p.id === id ? savedProduct : p));
            toast.success("Producto actualizado");
            return true;
        } catch (err) {
            toast.error("Error al actualizar producto");
            return false;
        }
    };

    const deleteProduct = async (id) => {
        
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("Error al eliminar");
            setProducts(prev => prev.filter(p => p.id !== id));
            toast.success("Producto eliminado");
        } catch (err) {
            toast.error("Error al eliminar el producto");
        }
    };

    return (
        <ProductsContext.Provider value={{ products, loading, error, fetchProducts, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductsContext.Provider>
    );
};
