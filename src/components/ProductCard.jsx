import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartProvider';
import { FaCartPlus } from 'react-icons/fa';

const Card = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 12px rgba(0,0,0,0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f0f0f0;
`;

const Content = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const InfoLink = styled(Link)`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  &:hover { text-decoration: underline; }
`;

const Button = styled.button`
  margin-top: auto;
  width: 100%;
  padding: 0.8rem;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3cbdb4;
  }
`;

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Card className="h-100">
      <Link to={`/productos/${product.id}`}>
        <Image src={product.image} alt={product.title} onError={(e) => e.target.src = 'https://placehold.co/400x400?text=No+Image'} />
      </Link>
      <Content>
        <Title>{product.title}</Title>
        <Price>${product.price}</Price>
        <InfoLink to={`/productos/${product.id}`}>Ver Detalle</InfoLink>
        <Button onClick={() => addToCart(product)}>
          <FaCartPlus /> Agregar
        </Button>
      </Content>
    </Card>
  );
}
