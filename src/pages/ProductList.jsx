import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useProducts } from '../context/ProductsProvider';
import ProductCard from '../components/ProductCard';
import { FaSearch } from 'react-icons/fa';

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchBar = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  
  input {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 2.5rem;
    border: 1px solid #ddd;
    border-radius: 25px;
    font-size: 1rem;
    &:focus { outline: 2px solid var(--secondary-color); border-color: transparent; }
  }
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary-color);
  background: ${props => props.active ? 'var(--primary-color)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--primary-color)'};
  border-radius: 5px;
  cursor: pointer;
  &:disabled { opacity: 0.5; cursor: default; }
  &:hover:not(:disabled) {
    background: var(--primary-color);
    color: white;
  }
`;

const ITEMS_PER_PAGE = 6;

export default function ProductList() {
    const { products, loading, error } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) return <div className="text-center mt-5"><h3>Cargando productos... 🐾</h3></div>;
    if (error) return <div className="text-center mt-5 text-danger"><h3>Error: {error}</h3></div>;

    return (
        <div>
            <h2 className="mb-4">Nuestros Productos</h2>

            <Controls>
                <SearchBar>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </SearchBar>
                <div>
                    <strong>{filteredProducts.length}</strong> productos encontrados
                </div>
            </Controls>

            {filteredProducts.length === 0 ? (
                <div className="text-center mt-5"><p>No se encontraron productos.</p></div>
            ) : (
                <div className="row g-4">
                    {currentProducts.map(product => (
                        <div key={product.id} className="col-12 col-md-6 col-lg-4">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <Pagination>
                    <PageButton
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        Anterior
                    </PageButton>
                    {[...Array(totalPages)].map((_, i) => (
                        <PageButton
                            key={i}
                            active={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </PageButton>
                    ))}
                    <PageButton
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        Siguiente
                    </PageButton>
                </Pagination>
            )}
        </div>
    );
}
