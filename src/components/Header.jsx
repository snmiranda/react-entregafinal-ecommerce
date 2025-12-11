import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaPaw, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';
import { useCart } from '../context/CartProvider';

const Navbar = styled.nav`
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 1rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  &:hover { opacity: 0.9; }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: none; // Simplified for now, would add hamburger in full version
  }
`;

const StyledLink = styled(NavLink)`
  color: rgba(255,255,255,0.9);
  font-weight: 500;
  transition: all 0.3s;
  &.active {
    color: white;
    font-weight: bold;
    border-bottom: 2px solid white;
  }
  &:hover { color: white; transform: translateY(-2px); }
`;

const Actions = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Badge = styled.span`
  background: white;
  color: var(--primary-color);
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
  font-weight: bold;
  position: absolute;
  top: -8px;
  right: -8px;
`;

const IconButton = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 1.4rem;
  transition: transform 0.2s;
  &:hover { transform: scale(1.1); }
`;

export default function Header() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar>
      <Logo to="/">
        <FaPaw /> HappyPet
      </Logo>

      <NavLinks>
        <StyledLink to="/">Inicio</StyledLink>
        <StyledLink to="/productos">Productos</StyledLink>
        <StyledLink to="/contacto">Contacto</StyledLink>
        {user?.role === 'admin' && <StyledLink to="/admin">Admin</StyledLink>}
      </NavLinks>

      <Actions>
        {user ? (
          <>
            <span style={{ fontSize: '0.9rem' }}>Hola, {user.name}</span>
            <IconButton onClick={handleLogout} title="Cerrar Sesión">
              <FaSignOutAlt />
            </IconButton>
          </>
        ) : (
          <StyledLink to="/login" title="Iniciar Sesión">
            <FaUser /> Login
          </StyledLink>
        )}

        {user && user.role === 'user' && (
          <Link to="/carrito" style={{ color: 'white' }}>
            <IconButton>
              <FaShoppingCart />
              {totalItems > 0 && <Badge>{totalItems}</Badge>}
            </IconButton>
          </Link>
        )}
      </Actions>
    </Navbar>
  );
}
