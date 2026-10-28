# Sistema de Gestión de Soporte Técnico (Certamen 2)

Sistema web full-stack para la gestión y seguimiento de tickets de soporte técnico, desarrollado con una arquitectura desacoplada que integra una API REST en Node.js/Express, persistencia en SQL Server y una interfaz dinámica en Angular 22.

---

## 🚀 Arquitectura y Tecnologías

- **Backend:** Node.js, Express.js.
- **Base de Datos:** Microsoft SQL Server (`soporte_db`) mediante conector ODBC nativo (`msnodesqlv8`).
- **Frontend:** Angular 22 (Arquitectura Standalone Components).
- **Control de Versiones:** Git & GitHub.

---

## 🛠️ Requisitos e Instalación

### 1. Base de Datos (SQL Server)
1. Asegurarse de tener ejecutando la instancia local de `SQLEXPRESS`.
2. Crear la base de datos `soporte_db` y ejecutar el script de creación de la tabla `tickets` junto a los datos iniciales de prueba.

### 2. Backend (`api-soporte`)
1. Abrir una terminal y navegar a la carpeta de la API:
   ```bash
   cd api-soporte
