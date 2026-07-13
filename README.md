# MH Ecommerce

Proyecto final del curso de React (GCBA). Es una tienda online construida con React y Vite, con catálogo de productos, carrito de compras persistente, autenticación de usuarios y un panel de gestión de productos, todo conectado a Firebase (Firestore + Authentication).

## Tecnologías

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/) para el ruteo
- [Firebase](https://firebase.google.com/) (Firestore y Authentication)
- [React Toastify](https://fkhadra.github.io/react-toastify/) para notificaciones
- [Bootstrap Icons](https://icons.getbootstrap.com/)

## Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior
- npm (se instala junto con Node.js)

## Instalación

1. Cloná el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd Proyecto_Final
   ```

2. Instalá las dependencias:

   ```bash
   npm install
   ```

## Ejecutar en desarrollo

```bash
npm run dev
```

Esto levanta el servidor de desarrollo de Vite (con hot reload) en [http://localhost:5173](http://localhost:5173).

> **Nota sobre Firebase:** la configuración de Firebase (`src/firebase/config.js`) ya apunta a un proyecto existente, así que no hace falta ninguna variable de entorno ni configuración adicional para levantar el proyecto localmente. Si querés conectarlo a tu propio proyecto de Firebase, reemplazá los valores de `firebaseConfig` en ese archivo por los de tu propia app.

## Otros scripts disponibles

| Comando           | Descripción                                                   |
| ------------------ | -------------------------------------------------------------- |
| `npm run dev`      | Levanta el servidor de desarrollo con hot reload.               |
| `npm run build`    | Genera el build de producción en `dist/`.                       |
| `npm run preview`  | Sirve localmente el build de producción para previsualizarlo.   |
| `npm run lint`     | Corre ESLint sobre todo el proyecto.                             |
