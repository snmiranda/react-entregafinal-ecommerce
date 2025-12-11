import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Button = styled.button`
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover { opacity: 0.9; }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      toast.success("¡Bienvenido de nuevo!");
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <LoginContainer>
      <h2>Iniciar Sesión</h2>
      <p style={{ color: 'gray', fontSize: '0.9rem' }}>Prueba: admin@petshop.com / admin123</p>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Ingresar</Button>
      </Form>
      <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        ¿No tienes cuenta? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Regístrate aquí</Link>
      </p>
    </LoginContainer>
  );
}
