export interface Paso {
    id: string;
    titulo: string;
    contenido: string[]; // Ahora es un array de strings para múltiples párrafos
    videoUrl?: string;
    codigo?: string;
    githubUrl?: string;
}

export interface Unidad {
    slug: string;
    numero: string;
    titulo: string;
    descripcion?: string;
    pasos: Paso[];
}

export interface Nivel {
    slug: string;
    titulo: string;
    descripcion: string;
    color: "mint" | "gold" | "crimson";
    unidades: Unidad[];
}

export const CONTENIDO_EBOOK: Nivel[] = [
    {
        slug: "nivel-basico",
        titulo: "Nivel Básico",
        descripcion: "Fundamentos, lenguaje XC y análisis.",
        color: "mint",
        unidades: [
            {
                slug: "fundamentos-herramientas",
                numero: "01",
                titulo: "Fundamentos y Herramientas",
                pasos: [
                    { id: "1.1", titulo: "¿Por qué estudiar estructuras de datos?", contenido: ["Las estructuras de datos son un pilar de la programación y las ciencias de la computación. Su estudio es esencial porque impacta directamente en la eficiencia y rendimiento de los programas: una mala elección de estructura puede hacer que un sistema sea innecesariamente lento o consuma demasiados recursos. Por el contrario, seleccionar la estructura de datos adecuada permite optimizar los algoritmos y resolver problemas de forma más eficaz. De hecho, expertos como Sedgewick y Wayne enfatizan que comprender las estructuras subyacentes de los datos nos ayuda a mejorar la eficiencia de las soluciones algorítmicas.", "Otro motivo para estudiar estructuras de datos es que nos ayudan a manejar la complejidad en la resolución de problemas. En problemas grandes o complejos, organizar los datos apropiadamente nos permite enfocarnos en el panorama general sin perdernos en los detalles de implementación. Esta abstracción simplifica el desarrollo de software: podemos modelar los datos de acuerdo al dominio del problema y luego diseñar algoritmos más claros sobre ese modelo. En otras palabras, las estructuras de datos proporcionan abstracciones que facilitan la construcción de soluciones: por ejemplo, si entendemos el concepto de una cola (queue) como abstracción para manejar tareas en orden FIFO, podemos utilizarlo lógicamente en nuestros programas sin preocuparnos de inmediato por cómo implementarlo; más adelante, elegiremos una estructura concreta (como un arreglo o lista enlazada) para materializar esa cola."] },
                    {
                        id: "1.2", titulo: "Tipos y clasificaciones de estructuras de datos", contenido: ["Existen muchos tipos de estructuras de datos, y es útil clasificarlas para entender sus características y usos. Una estructura de datos, en términos generales, es una forma particular de organizar información en un computador para que pueda ser utilizada de manera eficiente. Cada tipo de estructura está pensado para resolver ciertos problemas de almacenamiento y acceso a datos de forma óptima, y la elección de la estructura correcta puede influir significativamente en el rendimiento de un programa"],
                        codigo: `#include <iostream>
using namespace std;

int x = 0;
int array[5] = { 0, 1, 2, 3, 4};
int *apuntador;
int main() {
    cout << "El valor de x es: " << x << endl;
    cout << "El valor de array en su posición 1 es: " << array[1] << endl;
    /* cout<<&x<<endl;
    cout<<&array[0]<<endl;
    cout<<&array[1]<<endl;*/
    array[1] = array[1] + 10;
    cout << "El valor de array en su posición 1 es: " << array[1] << endl;
    apuntador = & array[1];
    cout << apuntador << endl;
    apuntador = apuntador + 1;
    cout << apuntador << endl;

    //apuntador = &array[1];
}`,
                        videoUrl: "https://www.youtube.com/embed/vRY_ZSGc1Bs?si=Sq7k3wh_c5ApRTHa",
                        githubUrl: "https://github.com/ProfeLucio/EDD2025-1"
                    },
                    { id: "1.4", titulo: "Herramientas de desarrollo profesional", contenido: ["VS Code.", "Git y GitHub."] },
                    { id: "1.5", titulo: "Configuración del entorno", contenido: ["Instalación de compiladores y setup inicial."] }
                ]
            },
            {
                slug: "fundamentos-lenguaje-c",
                numero: "02",
                titulo: "Fundamentos del Lenguaje C",
                pasos: [
                    { id: "2.1", titulo: "Filosofía de C", contenido: ["Control, rendimiento y disciplina."] },
                    { id: "2.2", titulo: "Tipado estático y estructuras básicas", contenido: ["Tipos primitivos y struct."] },
                    {
                        id: "2.3", titulo: "Gestión de memoria básica", contenido: ["Stack, variables y ámbito.", "Entendiendo el ciclo de vida de las variables."], codigo: `#include <iostream>
using namespace std;

int x = 0;
int array[5] = {0, 1, 2, 3, 4};
int *apuntador;
int main(){
    cout<<"El valor de x es: "<<x<<endl;
    cout<<"El valor de array en su posición 1 es: "<<array[1]<<endl;
   /* cout<<&x<<endl;
    cout<<&array[0]<<endl;
    cout<<&array[1]<<endl;*/
    array[1] = array[1] + 10;
    cout<<"El valor de array en su posición 1 es: "<<array[1]<<endl;
    apuntador = &array[1];
    cout<<apuntador<<endl;
    apuntador = apuntador + 1;
    cout<<apuntador<<endl;
    
    //apuntador = &array[1];
    
}` },
                    { id: "2.4", titulo: "Organización modular en C", contenido: ["Operadores aritméticos y sus prioridades."] },
                    { id: "2.5", titulo: "Funciones", contenido: ["Declaración, definición y paso de parámetros."] },
                ]
            },
            {
                slug: "analisis-algoritmos",
                numero: "03",
                titulo: "Análisis de Algoritmos",
                pasos: [
                    { id: "3.1", titulo: "¿Qué es un algoritmo?", contenido: ["Definición formal y características."] },
                    { id: "3.2", titulo: "Complejidad temporal y espacial", contenido: ["Medición de recursos."] },
                    { id: "3.3", titulo: "Notación Big-O", contenido: ["O(1), O(n), O(n²), etc."] },
                    { id: "3.4", titulo: "Estrategias para análisis empírico y teórico", contenido: ["Benchmarking vs conteo de operaciones."] }
                ]
            },
            {
                slug: "ordenamiento-basico",
                numero: "04",
                titulo: "Ordenamiento Básico",
                pasos: [
                    { id: "4.1", titulo: "Bubble Sort", contenido: ["El método de la burbuja explicado.", "Un algoritmo clásico pero ineficiente."], githubUrl: "..." },
                    { id: "4.2", titulo: "Selection Sort", contenido: ["Selección del mínimo.", "Iterando y buscando el menor elemento."], githubUrl: "..." },
                    { id: "4.3", titulo: "Insertion Sort", contenido: ["Inserción directa.", "Cómo ordenar barajas de cartas."], githubUrl: "..." },
                    { id: "4.4", titulo: "Comparación entre algoritmos O(n²)", contenido: ["¿Cuándo usar cuál?"] }
                ]
            }
        ]
    },
    {
        slug: "nivel-intermedio",
        titulo: "Nivel Intermedio",
        descripcion: "Memoria dinámica y estructuras lineales.",
        color: "gold",
        unidades: [
            {
                slug: "ordenamiento-eficiente",
                numero: "05",
                titulo: "Ordenamiento Eficiente",
                pasos: [
                    { id: "5.1", titulo: "Quicksort", contenido: ["Estrategia de pivote y partición."] },
                    { id: "5.2", titulo: "Merge Sort", contenido: ["División recursiva y mezcla."] },
                    { id: "5.3", titulo: "Heap Sort", contenido: ["Ordenamiento basado en montículos."] },
                    { id: "5.4", titulo: "Búsqueda binaria", contenido: ["Búsqueda logarítmica en datos ordenados."] },
                    { id: "5.5", titulo: "Comparativa teórica y experimental", contenido: ["Quicksort vs Merge Sort vs Heap Sort."] }
                ]
            },
            {
                slug: "memoria-dinamica",
                numero: "06",
                titulo: "Punteros y Memoria Dinámica",
                pasos: [
                    { id: "6.1", titulo: "Memoria estática vs Dinámica", contenido: ["Stack vs Heap."] },
                    { id: "6.2", titulo: "malloc, calloc, realloc y free", contenido: ["Ciclo de vida de la memoria dinámica."], codigo: "int* p = (int*)malloc(sizeof(int));" },
                    { id: "6.3", titulo: "Punteros y aritmética de punteros", contenido: ["Desplazamiento en memoria (ptr + 1)."] },
                    { id: "6.4", titulo: "Estructuras dinámicas con punteros", contenido: ["Punteros a structs y el operador flecha (->)."] }
                ]
            },
            {
                slug: "listas-enlazadas",
                numero: "07",
                titulo: "Listas Enlazadas",
                pasos: [
                    { id: "7.1", titulo: "Introducción a listas dinámicas", contenido: ["Concepto de nodo y enlace."] },
                    { id: "7.2", titulo: "Listas simplemente enlazadas", contenido: ["Implementación completa."] },
                    { id: "7.3", titulo: "Listas doblemente enlazadas", contenido: ["Navegación bidireccional."] },
                    { id: "7.4", titulo: "Listas circulares", contenido: ["El último nodo apunta al primero."] }
                ]
            },
            {
                slug: "pilas-colas",
                numero: "08",
                titulo: "Pilas y Colas",
                pasos: [
                    { id: "8.1", titulo: "Pilas (Stacks)", contenido: ["LIFO: Push, Pop, Peek."] },
                    { id: "8.2", titulo: "Colas (Queues)", contenido: ["FIFO: Enqueue, Dequeue."] },
                    { id: "8.3", titulo: "Implementación: Arrays vs Listas", contenido: ["Ventajas y desventajas de cada enfoque."] }
                ]
            },
            {
                slug: "arboles-binarios",
                numero: "09",
                titulo: "Árboles Binarios",
                pasos: [
                    { id: "9.1", titulo: "Introducción a Árboles", contenido: ["Raíz, hojas, altura y profundidad."] },
                    { id: "9.2", titulo: "Árbol Binario de Búsqueda (ABB)", contenido: ["Lógica de ordenamiento jerárquico."] },
                    { id: "9.3", titulo: "Recorridos: inorden, preorden, postorden", contenido: ["Preorden, Inorden, Postorden y Niveles."] },
                    { id: "9.4", titulo: "Eliminación en un ABB", contenido: ["El caso de los 2 hijos y el sucesor inorden."] }
                ]
            }
        ]
    },
    {
        slug: "nivel-avanzado",
        titulo: "Nivel Avanzado",
        descripcion: "E complejas.",
        color: "crimson",
        unidades: [
            {
                slug: "arboles-balanceados",
                numero: "10",
                titulo: "Árboles Balanceados y Heaps",
                pasos: [
                    { id: "10.1", titulo: "El problema del desbalance y degeneración", contenido: ["Degeneración en listas O(n)."] },
                    { id: "10.2", titulo: "Árboles AVL", contenido: ["Factor de equilibrio y rotaciones."] },
                    { id: "10.3", titulo: "Heaps Binarios y montículos", contenido: ["Max-Heap y Min-Heap."] },
                    { id: "10.4", titulo: "Implementación de Heaps", contenido: ["Representación en array y flotado/hundido."] }
                ]
            },
            {
                slug: "tablas-hash",
                numero: "11",
                titulo: "Tablas Hash",
                pasos: [
                    { id: "11.1", titulo: "¿Qué es Hashing?", contenido: ["Mapeo de claves a índices."] },
                    { id: "11.2", titulo: "Funciones Hash", contenido: ["Diseño de funciones eficientes."] },
                    { id: "11.3", titulo: "Resolución de colisiones", contenido: ["Encadenamiento vs Sondeo lineal."] },
                    { id: "11.4", titulo: "Implementación en C", contenido: ["Tabla Hash en C paso a paso."] }
                ]
            },
            {
                slug: "conjuntos-mapas",
                numero: "12",
                titulo: "Conjuntos, mapas y estructuras derivadas",
                pasos: [
                    { id: "12.1", titulo: "Set (Conjuntos)", contenido: ["Teoría y operaciones de conjuntos."] },
                    { id: "12.2", titulo: "Implementación en C", contenido: ["Hash Sets vs Tree Sets."] },
                    { id: "12.3", titulo: "Mapas y Diccionarios", contenido: ["Pares clave-valor."] }
                ]
            },
            {
                slug: "grafos",
                numero: "13",
                titulo: "Grafos",
                pasos: [
                    { id: "13.1", titulo: "Teoría de Grafos", contenido: ["Vértices, aristas, dirección y peso."] },
                    { id: "13.2", titulo: "Representación de Grafos", contenido: ["Matriz vs Listas de Adyacencia."] },
                    { id: "13.3", titulo: "Recorridos BFS y DFS", contenido: ["Algoritmos fundamentales de exploración."] },
                    { id: "13.4", titulo: "Implementación en C", contenido: ["Creación de grafo dinámico."] }
                ]
            },
            {
                slug: "arboles-avanzados",
                numero: "14",
                titulo: "Árboles Avanzados",
                pasos: [
                    { id: "14.1", titulo: "Árboles B y B+", contenido: ["Optimización para disco y bases de datos."] },
                    { id: "14.2", titulo: "Árboles Trie (Prefix Tree)", contenido: ["Búsqueda de strings y autocompletado."] },
                    { id: "14.3", titulo: "Árboles Rojo-Negro", contenido: ["Visión teórica y comparación con AVL."] }
                ]
            }
        ]
    }
];

export function getItemBySlugs(levelSlug?: string, unitSlug?: string) {
    const level = CONTENIDO_EBOOK.find(l => l.slug === levelSlug);
    if (!level) return { level: null, unit: null };

    const unit = level.unidades.find(u => u.slug === unitSlug);
    return { level, unit: unit || null };
}
