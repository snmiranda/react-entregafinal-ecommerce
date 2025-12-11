import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fdfdfd;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 80px;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  &:disabled { background-color: #ccc; cursor: not-allowed; }
`;

export default function ProductForm({ onSubmit, initialData, isEdit }) {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ title: '', price: '', description: '', image: '', category: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!formData.title.trim()) {
            toast.error("El nombre es obligatorio");
            return false;
        }
        if (!formData.price || Number(formData.price) <= 0) {
            toast.error("El precio debe ser mayor a 0");
            return false;
        }
        if (formData.description.length < 10) {
            toast.error("La descripción debe tener al menos 10 caracteres");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit(formData);
        if (!isEdit) setFormData({ title: '', price: '', description: '', image: '', category: '' });
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <h3>{isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <FormGroup>
                <Label>Nombre</Label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="Ej. Correa para Perro" />
            </FormGroup>
            <FormGroup>
                <Label>Categoría</Label>
                <Input name="category" value={formData.category} onChange={handleChange} placeholder="Ej. Alimentos, Juguetes" />
            </FormGroup>
            <FormGroup>
                <Label>Precio</Label>
                <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" step="0.01" />
            </FormGroup>
            <FormGroup>
                <Label>Imagen (URL)</Label>
                <Input name="image" value={formData.image} onChange={handleChange} placeholder="http://..." />
            </FormGroup>
            <FormGroup>
                <Label>Descripción</Label>
                <TextArea name="description" value={formData.description} onChange={handleChange} placeholder="Detalles del producto..." />
            </FormGroup>
            <SubmitButton type="submit">{isEdit ? 'Actualizar' : 'Crear Producto'}</SubmitButton>
        </FormContainer>
    );
}
