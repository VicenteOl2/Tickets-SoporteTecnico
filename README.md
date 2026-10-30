# Sistema de Gestión de Soporte Técnico (Certamen 2)

### 1. Descripción del proyecto
Sistema web full-stack enfocado en la gestión, registro y seguimiento interactivo de solicitudes de soporte técnico. Permite visualizar el estado de las solicitudes en tiempo real, ingresar nuevos requerimientos y actualizar su ciclo de vida mediante una arquitectura desacoplada.

### 2. Autor
- **Estudiante:** Vicente Olmos
- **Institución:** Instituto Profesional Virginio Gómez (Sede Chillán)
- **Carrera:** Ingeniería en Informática

### 3. Tecnologías utilizadas
- **Backend:** Node.js, Express.js.
- **Base de Datos:** Microsoft SQL Server (`soporte_db`) con conector nativo `msnodesqlv8`.
- **Frontend:** Angular 22 (Arquitectura Standalone Components).
- **Control de Versiones:** Git & GitHub.

---


---

### 4. Funcionalidades implementadas
- **Lectura/Consulta (`GET`):** Obtención dinámica del listado completo de tickets almacenados en SQL Server y consulta individual por identificador (`id`).
- **Creación (`POST`):** Registro de nuevos tickets con validación de campos obligatorios (`asunto`, `solicitante`, `descripción`).
- **Edición/Actualización (`PUT`):** Modificación del estado del ticket (`Abierto`, `En Proceso`, `Cerrado`), prioridad y datos descriptivos con persistencia directa en la base de datos.
- **Interfaz Interactiva:** Uso de enrutamiento dinámico (`RouterLink`, `ActivatedRoute`), detección de cambios asíncrona (`ChangeDetectorRef`) y formularios reactivos de captura de datos.

---

### 5. Instrucciones de instalación
1. Clonar el repositorio:
   git clone https://github.com/VicenteOl2/Tickets-SoporteTecnico.git
   cd certamen2-soporte
2. Base de Datos:
   - Iniciar la instancia local de `SQLEXPRESS`.
   - Ejecutar el script SQL para crear la base de datos `soporte_db` y la tabla `tickets`.

---

### 6. Instrucciones de ejecución
1. Iniciar Backend (`api-soporte`):
   cd api-soporte
   npm install
   node server.js
   (Servidor escuchando en http://localhost:3000)

2. Iniciar Frontend (`frontend-soporte`):
   cd ../frontend-soporte
   npm install
   ng serve
   (Acceder mediante el navegador a http://localhost:4200)

---

### 7. Pruebas realizadas
- **Prueba de API REST (Postman / Browser):** Verificación de respuestas JSON y códigos de estado HTTP en `/api/tickets`.
- **Prueba de Integración End-to-End:** Creación y modificación exitosa de registros desde el cliente Angular con verificación instantánea de persistencia en SQL Server Management Studio (SSMS).
- **Prueba de Navegación:** Validación de rutas dinámicas entre la vista de listado, formulario de nuevo ticket y formulario de edición.

---

### 8. Declaración del uso de Inteligencia Artificial (IA)

En cumplimiento con la normativa académica del certamen, se detalla el uso de herramientas de Inteligencia Artificial (Gemini / Copilot) como asistente de desarrollo:

1. **Herramientas de IA utilizadas:** Gemini 1.5 Pro / Copilot.
2. **Actividades para las que fueron utilizadas:**
   - Asistencia en el diagnóstico y solución de errores de conexión TCP/IP en SQL Server Express.
   - Generación de estructura base (Scaffolding) para componentes Standalone de Angular 22.
3. **Soporte específico recibido:**
   - Apoyo en la configuración del driver `msnodesqlv8` para autenticación integrada de Windows.
   - Asistencia en la implementación de `ChangeDetectorRef` para forzar la actualización de vistas en suscripciones asíncronas de RxJS.
4. **Modificaciones, verificaciones y adaptaciones del estudiante:**
   - Ajuste manual de la estructura de componentes para nombres de archivo simplificados (`.ts`, `.html`, `.css`).
   - Modificación e integración del diseño de estilos CSS para botones, tarjetas y badges de prioridad/estado.
   - Verificación de la integridad de las consultas T-SQL y defensa técnica oral de cada bloque de código.
