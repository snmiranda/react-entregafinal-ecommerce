import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthProvider'; // Import useAuth

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth(); // Get user
    const [cart, setCart] = useState(() => {

        const stored = localStorage.getItem('petShopCart');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('petShopCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        if (!user || user.role !== 'user') {
            toast.error("Debes iniciar sesión como cliente para comprar");
            return;
        }

        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            toast.info(`Aumentaste la cantidad de ${product.title}`);
            setCart(prevCart => prevCart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            toast.success(`${product.title} agregado al carrito!`);
            setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        
        if (!user || user.role !== 'user') return;
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        toast.warn("Producto eliminado del carrito");
    };

    const updateQuantity = (productId, delta) => {
        if (!user || user.role !== 'user') return;
        setCart(prevCart => prevCart.map(item => {
            if (item.id === productId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => {
        if (!user || user.role !== 'user') return;
        if (window.confirm("¿Seguro que quieres vaciar el carrito?")) {
            setCart([]);
            toast.info("Carrito vaciado");
        }
    };

    const total = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, total, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};
