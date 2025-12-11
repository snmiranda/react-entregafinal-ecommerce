import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useProducts } from '../context/ProductsProvider';
import { useCart } from '../context/CartProvider';
import { FaCartPlus, FaArrowLeft } from 'react-icons/fa';

const DetailContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  margin-top: 2rem;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 10px;
`;

const Price = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  font-weight: bold;
  margin: 1rem 0;
`;

const ActionButton = styled.button`
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover { opacity: 0.9; }
`;

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, loading } = useProducts();
    const { addToCart } = useCart();

    if (loading) return <div>Cargando...</div>;

    const product = products.find(p => p.id === id);

    if (!product) return (
        <div className="text-center mt-5">
            <h2>Producto no encontrado</h2>
            <button className="btn btn-secondary mt-3" onClick={() => navigate('/productos')}>Volver</button>
        </div>
    );

    return (
        <DetailContainer className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
                <Image src={product.image} alt={product.title} onError={(e) => e.target.src = 'https://placehold.co/400x400?text=No+Image'} />
            </div>
            <div className="col-md-6">
                <button className="btn btn-link text-secondary mb-3 p-0" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Volver
                </button>
                <h1>{product.title}</h1>
                <span className="badge bg-secondary mb-2">{product.category}</span>
                <Price>${product.price}</Price>
                <p className="lead">{product.description}</p>
                <p className="text-muted">ID: {product.id}</p>

                <ActionButton onClick={() => addToCart(product)}>
                    <FaCartPlus /> Agregar al Carrito
                </ActionButton>
            </div>
        </DetailContainer>
    );
}
