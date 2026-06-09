Reflexión Final — MotoKeeper

1. ¿Cuál fue la parte del proyecto que más te costó y cómo la resolviste?
La gestión de los estados de React dentro de los `useEffect` al cargar datos del almacenamiento local y la sincronización con el inventario. Lo resolví aplicando ejecuciones diferidas mediante `setTimeout` para evitar renders síncronos en cascada y estructurando los mocks de pruebas de manera limpia.

2. Si tuvieras que rehacer el proyecto desde cero mañana, ¿qué decisión técnica cambiarías?
Centralizaría el almacenamiento del Garaje directamente en la base de datos relacional (PostgreSQL) desde el primer día en lugar de usar `localStorage`. Esto daría más consistencia al historial técnico de las motos y facilitaría la persistencia real.

3. Describe cómo explicarías la arquitectura de este sistema en una entrevista técnica.
"MotoKeeper es una plataforma Full-Stack que utiliza Next.js 15 en Vercel, con una base de datos PostgreSQL en Neon a través de Prisma ORM. Para resolver la actualización del inventario en tiempo real en un entorno Serverless, implementamos un flujo híbrido donde el servidor procesa la petición y dispara un evento a Pusher Channels, distribuyendo los cambios por WebSockets hacia los clientes conectados."