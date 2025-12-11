import styled from 'styled-components';
import { useCart } from '../context/CartProvider';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const CartContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 80px 2fr 1fr 1fr 50px;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  
  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr;
    gap: 0.5rem;
    
    .quantity-controls { grid-column: 1 / -1; justify-content: flex-start; }
    .price-info { grid-column: 1 / -1; }
  }
`;

const Thumb = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  button {
    background: #f0f0f0;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
    &:hover { background: #e0e0e0; }
  }
`;

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

    if (cart.length === 0) {
        return (
            <div className="text-center mt-5">
                <h2>Tu carrito está vacío 😿</h2>
                <p>¡Agrega algunos productos para consentir a tu mascota!</p>
                <Link to="/productos" className="btn btn-primary mt-3">Ir a la Tienda</Link>
            </div>
        );
    }

    return (
        <CartContainer>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Tu Carrito de Compras</h2>
                <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>Vaciar Carrito</button>
            </div>

            <div className="d-none d-md-grid" style={{ gridTemplateColumns: '80px 2fr 1fr 1fr 50px', fontWeight: 'bold', marginBottom: '1rem', color: '#666' }}>
                <span>Prod</span>
                <span>Nombre</span>
                <span>Cantidad</span>
                <span>Subtotal</span>
                <span></span>
            </div>

            {cart.map(item => (
                <CartItem key={item.id}>
                    <Thumb src={item.image} alt={item.title} onError={(e) => e.target.src = 'https://placehold.co/100?text=Pet'} />
                    <div>
                        <h5 className="m-0">{item.title}</h5>
                        <small className="text-muted d-md-none">${item.price} u.</small>
                    </div>

                    <QuantityControls className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}><FaMinus size={10} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}><FaPlus size={10} /></button>
                    </QuantityControls>

                    <div className="price-info">
                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>

                    <button className="btn btn-link text-danger p-0" onClick={() => removeFromCart(item.id)}>
                        <FaTrash />
                    </button>
                </CartItem>
            ))}

            <div className="d-flex justify-content-end mt-4 align-items-center gap-4">
                <h3>Total: <span className="text-primary">${total.toFixed(2)}</span></h3>
                <button className="btn btn-success btn-lg" onClick={() => alert("¡Gracias por tu compra! (Simulación)")}>
                    Finalizar Compra
                </button>
            </div>
        </CartContainer>
    );
}
