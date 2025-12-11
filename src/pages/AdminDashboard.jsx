import { useState } from 'react';
import styled from 'styled-components';
import { useProducts } from '../context/ProductsProvider';
import ProductForm from '../components/ProductForm';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

const DashboardContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background: #f8f9fa;
    font-weight: 600;
  }
  
  tr:hover { background: #fdfdfd; }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  color: ${props => props.color || '#666'};
  font-size: 1.1rem;
  &:hover { opacity: 0.7; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export default function AdminDashboard() {
    const { products, deleteProduct, addProduct, updateProduct, loading } = useProducts();
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            await deleteProduct(id);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleFormSubmit = async (data) => {
        let success = false;
        if (editingProduct) {
            success = await updateProduct(editingProduct.id, data);
        } else {
            success = await addProduct(data);
        }

        if (success) {
            setShowForm(false);
            setEditingProduct(null);
        }
    };

    if (loading) return <div>Cargando panel...</div>;

    return (
        <DashboardContainer>
            <Header>
                <h2>Panel de Administración</h2>
                <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleCreate}>
                    <FaPlus /> Nuevo Producto
                </button>
            </Header>

            <div className="table-responsive">
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td>
                                    <ActionButton color="var(--primary-color)" onClick={() => handleEdit(product)} title="Editar">
                                        <FaEdit />
                                    </ActionButton>
                                    <ActionButton color="#e74c3c" onClick={() => handleDelete(product.id)} title="Eliminar">
                                        <FaTrash />
                                    </ActionButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {showForm && (
                <ModalOverlay>
                    <ModalContent>
                        <CloseButton onClick={() => setShowForm(false)}><FaTimes /></CloseButton>
                        <ProductForm
                            initialData={editingProduct}
                            isEdit={!!editingProduct}
                            onSubmit={handleFormSubmit}
                        />
                    </ModalContent>
                </ModalOverlay>
            )}
        </DashboardContainer>
    );
}
