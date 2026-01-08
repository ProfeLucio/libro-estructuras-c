- 1. Limpieza de seguridad (opcional, por si quieres resetear todo)
DROP TABLE IF EXISTS bloques_contenido CASCADE;
DROP TABLE IF EXISTS pasos CASCADE;
DROP TABLE IF EXISTS unidades CASCADE;
DROP TABLE IF EXISTS niveles CASCADE;
DROP TABLE IF EXISTS libros CASCADE;
DROP TYPE IF EXISTS tipo_bloque;

-- 2. Tipo de contenido para los bloques
CREATE TYPE tipo_bloque AS ENUM ('texto', 'codigo', 'video', 'github');
ALTER TYPE tipo_bloque ADD VALUE 'imagen';
-- 3. Tabla de Libros (La raíz de todo)
-- Slug para: /libro/estructuras-de-datos-en-c
CREATE TABLE libros (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    autor VARCHAR(100) DEFAULT 'Profe Lucio',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla de Niveles (Relacionada al libro)
-- Slug para: /estructuras-de-datos-en-c/nivel-basico
CREATE TABLE niveles (
    id SERIAL PRIMARY KEY,
    libro_id INTEGER REFERENCES libros(id) ON DELETE CASCADE,
    slug VARCHAR(100) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    color VARCHAR(50),
    orden INTEGER NOT NULL,
    CONSTRAINT uq_nivel_slug UNIQUE (libro_id, slug)
);

-- 5. Tabla de Unidades
CREATE TABLE unidades (
    id SERIAL PRIMARY KEY,
    nivel_id INTEGER REFERENCES niveles(id) ON DELETE CASCADE,
    slug VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    orden INTEGER NOT NULL,
    CONSTRAINT uq_unidad_slug UNIQUE (nivel_id, slug)
);

-- 6. Tabla de Pasos (Lecciones)
CREATE TABLE pasos (
    id SERIAL PRIMARY KEY,
    unidad_id INTEGER REFERENCES unidades(id) ON DELETE CASCADE,
    slug VARCHAR(200) NOT NULL,
    id_referencia VARCHAR(20) NOT NULL, 
    titulo VARCHAR(200) NOT NULL,
    orden INTEGER NOT NULL,
    CONSTRAINT uq_paso_slug UNIQUE (unidad_id, slug)
);

-- 7. Tabla de Bloques de Contenido (Para los QRs y Anclas)
CREATE TABLE bloques_contenido (
    id SERIAL PRIMARY KEY,
    paso_id INTEGER REFERENCES pasos(id) ON DELETE CASCADE,
    tipo tipo_bloque NOT NULL,
    slug VARCHAR(100), -- Ejemplo: #ejemplo-punteros
    orden INTEGER NOT NULL,
    contenido_texto TEXT,
    codigo_fuente TEXT,
    url_recurso VARCHAR(500),
    titulo_recurso VARCHAR(200),
    CONSTRAINT uq_bloque_slug UNIQUE (paso_id, slug)
);

-- 8. Permisos para el usuario 'estructuras'
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO estructuras;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO estructuras;