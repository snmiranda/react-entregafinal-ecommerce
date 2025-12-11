import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';

const HeroSection = styled.section`
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  border-radius: 15px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const CTAButton = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.2s, background-color 0.2s;
  &:hover {
    transform: scale(1.05);
    background-color: #ff5252;
    color: white;
    text-decoration: none;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.3s;
  &:hover { transform: translateY(-5px); }
  
  svg {
    font-size: 3rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
  }
`;

export default function Home() {
    return (
        <>
            <HeroSection>
                <Title>Bienvenido a HappyPet</Title>
                <Subtitle>El mejor lugar para consentir a tu mejor amigo</Subtitle>
                <CTAButton to="/productos">Ver Productos</CTAButton>
            </HeroSection>

            <FeaturesGrid>
                <FeatureCard>
                    <FaPaw />
                    <h3>Productos Premium</h3>
                    <p>Solo lo mejor para tus mascotas, seleccionados con amor.</p>
                </FeatureCard>
                <FeatureCard>
                    <FaPaw />
                    <h3>Envíos Rápidos</h3>
                    <p>Recibe tus productos en la puerta de tu casa en tiempo récord.</p>
                </FeatureCard>
                <FeatureCard>
                    <FaPaw />
                    <h3>Atención 24/7</h3>
                    <p>Estamos aquí para ayudarte a cuidar a tu mascota cuando lo necesites.</p>
                </FeatureCard>
            </FeaturesGrid>
        </>
    );
}
