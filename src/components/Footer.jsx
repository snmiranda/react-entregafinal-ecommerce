import styled from 'styled-components';
import { FaPaw, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #2d3436;
  color: white;
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
`;

const Section = styled.div`
  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--secondary-color);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
  margin-top: 1rem;
  
  a {
    transition: color 0.3s;
    &:hover { color: var(--primary-color); }
  }
`;

export default function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <Section>
                    <h3><FaPaw /> HappyPet Shop</h3>
                    <p>Todo lo que tu mascota necesita, en un solo lugar. Calidad y amor en cada producto.</p>
                </Section>
                <Section>
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/productos">Productos</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                    </ul>
                </Section>
                <Section>
                    <h3>Síguenos</h3>
                    <SocialLinks>
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTwitter /></a>
                    </SocialLinks>
                </Section>
            </FooterContent>
            <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', borderTop: '1px solid #444' }}>
                &copy; {new Date().getFullYear()} HappyPet Shop. Todos los derechos reservados.
            </div>
        </FooterContainer>
    );
}
