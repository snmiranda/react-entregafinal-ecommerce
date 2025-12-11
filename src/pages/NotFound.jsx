import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  text-align: center;
  margin-top: 5rem;
`;

const Title = styled.h1`
  font-size: 6rem;
  color: var(--primary-color);
  margin-bottom: 0;
`;

export default function NotFound() {
    return (
        <Container>
            <Title>404</Title>
            <h2>Página no encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe o se ha movido.</p>
            <Link to="/" className="btn btn-primary mt-3">Volver al Inicio</Link>
        </Container>
    );
}
