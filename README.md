** Evaluacion Final Frontend

Portal Web LicitaSeguro
Autor: Charol Carrasco
Evaluación Final – Desarrollo Frontend

** Descripción del Proyecto
LicitaSeguro es un portal web desarrollado como solución frontend para facilitar la consulta de información pública proveniente de la API oficial de Mercado Público de Chile.

El sistema permite:

Consultar licitaciones por fecha y estado.
Visualizar el detalle completo de una licitación.
Buscar proveedores mediante RUT.
Navegar en una interfaz responsiva, accesible y dinámica.
El desarrollo fue realizado utilizando exclusivamente tecnologías frontend, cumpliendo con los requerimientos establecidos en la evaluación.

** Tecnologías Utilizadas
HTML5 (estructura semántica)
CSS3 (estilos personalizados y variables CSS)
Bootstrap 5 (componentes reutilizables y diseño responsivo)
JavaScript ES6 (módulos y Fetch API)
API Oficial Mercado Público

** Arquitectura del Proyecto
El sistema está organizado bajo el principio de separación de responsabilidades, utilizando módulos ES6 para mantener un código limpio, escalable y mantenible.

** Estructura Modular
config.js -> Configuración global (BASE_URL, TICKET, paginación).
api.js -> Centralización del consumo de endpoints.
utils.js -> Funciones reutilizables (loader, errores, paginación, limpieza).
licitaciones.js -> Lógica del listado y paginación.
detalle.js -> Lógica del detalle de licitación.
proveedores.js -> Lógica de búsqueda y validación de RUT.
Esta arquitectura permite:

Mejor mantenimiento del código.
Reutilización de funciones.
Escalabilidad futura.
Cumplimiento de buenas prácticas frontend.
** Funcionalidades Implementadas
    --> Consulta de licitaciones por fecha y estado
    --> Formateo automático de fecha al formato requerido por la API (ddmmaaaa)
    --> Paginación automática (10 resultados por página)
    --> Loader durante el consumo de API
    --> Validación de campos obligatorios
    --> Validación completa del RUT chileno
    --> Manejo de errores del servidor
    --> Visualización de detalle de licitación
    --> Diseño completamente responsivo
    --> Implementación de buenas prácticas de accesibilidad
    -->
** Accesibilidad y Usabilidad
Se aplicaron principios de accesibilidad:

Uso correcto de etiquetas <label>
role="alert" para mensajes dinámicos
Navegación por teclado (tabindex)
Estados de enfoque visibles (focus)
Contraste adecuado de colores
Estructura semántica en HTML
** Manejo de Errores
El sistema contempla:

Validación de formularios antes de consumir la API.
Control de respuestas vacías.
Manejo de errores de red.
Mensajes claros y comprensibles para el usuario.
** Consumo de API
Se utilizan los siguientes endpoints de la API Mercado Público:

Listado de Licitaciones
Detalle de Licitación
Búsqueda de Proveedor
El consumo se realiza mediante fetch() encapsulado en un módulo independiente (api.js), lo que permite centralizar la comunicación con el servidor.

** Despliegue en Servidor (GitHub Pages)
El proyecto fue desplegado como aplicación estática utilizando GitHub Pages, lo que permite publicar el sitio de manera gratuita y accesible públicamente.

** Proceso de Despliegue
Creación de repositorio en GitHub.
Subida del código fuente al repositorio.
Activación de GitHub Pages desde la rama principal (main).
Generación de URL pública del proyecto.
Este método es ideal para aplicaciones frontend puras, ya que:

Permite versionado del código.
Facilita la distribución pública.
Soporta módulos ES6.
No requiere backend ni configuración adicional de servidor.
--> Cómo Ejecutar Localmente
Clonar o descargar el proyecto.
Configurar un TICKET válido en config.js.
Ejecutar el proyecto mediante un servidor local (ejemplo: Live Server en VS Code).
Acceder desde http://localhost.
** No se recomienda abrir los archivos directamente con doble clic (file://), ya que el proyecto utiliza módulos ES6.

    --> Diseño UI/UX
    --> Responsive Design
    --> Interactividad mediante eventos
    --> Validaciones de formularios
    --> Consumo de endpoints
    --> Manejo de errores
    --> Accesibilidad
    --> Arquitectura modular
    --> Despliegue en servidor

** Conclusión
LicitaSeguro cumple con los requerimientos técnicos y funcionales establecidos en la evaluación, implementando una solución frontend estructurada, accesible y alineada con buenas prácticas modernas de desarrollo web.

Si quieres, ahora puedo prepararte un pequeño guion de defensa oral para explicar:

Arquitectura
Consumo de API
Despliegue en GitHub Pages
Decisiones de diseño
Eso te puede ayudar bastante al momento de presentar.