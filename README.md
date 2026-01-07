# 📚 Estructuras de Datos - Plataforma Web Interactiva

> **Pensamiento algorítmico desde cero con C**  
> Recurso digital complementario del libro de Gonzalo Andrés Lucio

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat)](https://orm.drizzle.team/)

---

## Descripción

Plataforma web moderna y premium que acompaña al libro **"Estructuras de Datos: Pensamiento algorítmico desde cero con C"**. Ofrece una experiencia de aprendizaje interactiva con videos, código fuente, y seguimiento de progreso.

### ✨ Características Principales

- 🎥 **Video clases integradas** - Explicaciones visuales paso a paso
- 💻 **Código fuente completo** - Ejemplos en C con resaltado de sintaxis
- 📊 **Sistema de progreso** - Seguimiento del avance por unidad
- 🎨 **Diseño premium** - Inspirado en la portada del libro físico
- 🔄 **Transiciones fluidas** - Animaciones de carga entre páginas
- 📱 **Responsive** - Optimizado para móviles, tablets y desktop

---

## 🏗️ Arquitectura Técnica

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Iconos**: Lucide React
- **Video Player**: React Player
- **Syntax Highlighting**: Bright

### Backend
- **ORM**: Drizzle ORM
- **Base de Datos**: PostgreSQL
- **Cliente DB**: postgres-js

### Estructura del Proyecto

```
ebook/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.tsx          # Layout raíz con fuentes y providers
│   │   ├── page.tsx            # Página principal (Hero + Niveles)
│   │   └── niveles/
│   │       └── [level]/
│   │           ├── page.tsx    # Vista de nivel
│   │           └── [unit]/
│   │               └── page.tsx # Vista de unidad
│   ├── components/             # Componentes reutilizables
│   │   ├── LoadingScreen.tsx   # Pantalla de carga inicial/transiciones
│   │   ├── TransitionProvider.tsx # Proveedor de transiciones
│   │   ├── UnitSection.tsx     # Sección de unidad
│   │   └── UnitContent.tsx     # Contenido de pasos
│   ├── db/                     # Capa de base de datos
│   │   ├── schema.ts           # Esquema de tablas (Drizzle)
│   │   └── index.ts            # Cliente de DB
│   └── lib/
│       └── data.ts             # Contenido del libro (estructura)
├── public/
│   └── images/                 # Imágenes estáticas
├── drizzle.config.ts           # Configuración de Drizzle Kit
└── package.json
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 20+
- PostgreSQL 14+
- npm o pnpm

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/estructuras-datos-ebook.git
cd estructuras-datos-ebook
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Configuración de Base de Datos
DB_USER=estructuras
DB_HOST=localhost
DB_NAME=estructura_datos
DB_PASSWORD=tu_password
DB_PORT=5432

# URL de conexión para Drizzle ORM
DATABASE_URL=postgres://estructuras:tu_password@localhost:5432/estructura_datos

# Configuración del Servidor
PORT=3001
NODE_ENV=development
```

### 4. Sincronizar el esquema de base de datos

```bash
npm run db:push
```

Este comando creará las tablas necesarias en PostgreSQL:
- `units_progress` - Progreso de lectura por usuario
- `user_feedback` - Comentarios y retroalimentación

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3001`

---

## 📦 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run db:generate` | Genera migraciones de Drizzle |
| `npm run db:push` | Sincroniza el esquema con la DB |

---

## 🗄️ Esquema de Base de Datos

### `units_progress`
Almacena el progreso de lectura de cada usuario por unidad.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Identificador único |
| `user_id` | TEXT | ID del usuario |
| `unit_slug` | TEXT | Slug de la unidad |
| `level_slug` | TEXT | Slug del nivel |
| `completed_steps` | INTEGER | Pasos completados |
| `last_accessed` | TIMESTAMP | Último acceso |

### `user_feedback`
Almacena comentarios y retroalimentación de usuarios.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Identificador único |
| `user_id` | TEXT | ID del usuario (opcional) |
| `content` | TEXT | Contenido del comentario |
| `created_at` | TIMESTAMP | Fecha de creación |

---

## 🎨 Diseño y Estética

El diseño está inspirado en la portada del libro físico, con:

- **Tipografía hand-inked** para títulos principales
- **Elementos sketch-tech** (direcciones de memoria, variables)
- **Ilustraciones isométricas** (árbol creciendo desde circuitos)
- **Paleta de colores**: Crimson (#e44359), Gold (#ebc252), Mint (#53bd88)
- **Glassmorphism** y efectos de profundidad
- **Animaciones sutiles** para mejorar la experiencia

---

## 📚 Contenido del Libro

### Nivel Básico (Mint)
- Fundamentos y Herramientas
- Fundamentos del Lenguaje C
- Análisis de Algoritmos
- Ordenamiento Básico

### Nivel Intermedio (Gold)
- Ordenamiento Eficiente
- Punteros y Memoria Dinámica
- Listas Enlazadas
- Pilas y Colas
- Árboles Binarios

### Nivel Avanzado (Crimson)
- Árboles Balanceados y Heaps
- Tablas Hash
- Conjuntos, Mapas y Estructuras Derivadas
- Grafos
- Árboles Avanzados

---

## 🚀 Despliegue en Producción

### Opción 1: Vercel (Recomendado para Next.js)

```bash
npm install -g vercel
vercel
```

### Opción 2: VPS (Nginx + PM2)

1. **Build de producción**:
```bash
npm run build
```

2. **Configurar PM2**:
```bash
pm2 start npm --name "ebook" -- start
pm2 save
pm2 startup
```

3. **Configurar Nginx** (ejemplo):
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es parte del material complementario del libro "Estructuras de Datos: Pensamiento algorítmico desde cero con C".

© 2024 Gonzalo Andrés Lucio. Todos los derechos reservados.

---

## 👨‍💻 Autor

**Gonzalo Andrés Lucio**  
- 📧 Email: contacto@ejemplo.com
- 🌐 Website: [tu-sitio.com](https://tu-sitio.com)
- 💼 LinkedIn: [tu-perfil](https://linkedin.com/in/tu-perfil)

---

## 🙏 Agradecimientos

- Next.js Team por el increíble framework
- Drizzle Team por el ORM ligero y potente
- Comunidad de desarrolladores que contribuyen con feedback

---

**⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!**
