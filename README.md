# HappyPet Shop - eCommerce React App

Bienvenido a **HappyPet Shop**, una aplicación de comercio electrónico moderna diseñada para amantes de las mascotas. Este proyecto fue construido con **React**, **Vite** y **Context API**, siguiendo las mejores prácticas de desarrollo web.

## 🚀 Características Principales

*   **Catálogo de Productos**: Exploración de productos con paginación y búsqueda en tiempo real.
*   **Detalle de Producto**: Vista individual con información detallada.
*   **Carrito de Compras**: Gestión global del estado del carrito (agregar, eliminar, vaciar, totales).
*   **Autenticación Simulada**: Login/Logout con persistencia en LocalStorage.
*   **Panel de Administración (CRUD)**: Ruta protegida para gestionar el inventario (Crear, Editar, Eliminar productos) conectado a MockAPI.
*   **Diseño Responsivo**: Adaptable a móviles, tablets y escritorio (Mobile-First).
*   **Feedback Visual**: Notificaciones toast para acciones de usuario.

## 🛠 Tecnologías Utilizadas

*   **Core**: React 19, Vite
*   **Routing**: React Router DOM
*   **Estilos**: Styled Components, Bootstrap (Grid/Reset)
*   **Iconos**: React Icons (FontAwesome)
*   **Notificaciones**: React Toastify
*   **SEO**: React Helmet Async

## ⚙️ Instalación y Ejecución

Sigue estos pasos para correr el proyecto localmente:

1.  **Clonar el repositorio** (o descargar los archivos):
    ```bash
    git clone <url-del-repo>
    cd pet-shop
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install --legacy-peer-deps
    ```
    *Nota: Se usa `--legacy-peer-deps` debido a conflictos de versiones con algunas librerías y React 19, pero la funcionalidad es estable.*

3.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

4.  **Credenciales de Prueba (Admin)**:
    *   **Email**: `admin@petshop.com`
    *   **Password**: `admin123`

## 📦 Build para Producción

Para generar los archivos estáticos optimizados para producción:

```bash
npm run build
```
Los archivos se generarán en la carpeta `dist`.

## 📂 Estructura del Proyecto

*   `src/components`: Componentes reutilizables (Header, ProductCard, etc.)
*   `src/context`: Manejo del estado global (Auth, Cart, Products)
*   `src/pages`: Vistas principales de la aplicación
*   `src/styles`: Estilos globales y temas
