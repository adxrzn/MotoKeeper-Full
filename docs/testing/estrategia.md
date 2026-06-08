# Estrategia de Testing - MotoKeeper

## 1. La Pirámide de Tests
* **Unitarios (Base):** Prueban funciones lógicas puras en milisegundos. 
  * *Ejemplo:* Verificar que si quedan 2 botes de Aceite Castrol, `isLowStock` avisa de "Bajo Stock".
* **Integración (Capa Media):** Prueban la conexión entre componentes y endpoints de la API.
  * *Ejemplo:* Comprobar que el `<InventoryManager />` dibuja bien las filas al recibir las pastillas Brembo desde el servidor simulado.
* **End-to-End (Cima):** Un robot simula a un usuario real abriendo el navegador.
  * *Ejemplo:* El robot entra solo a la web, rellena el formulario de un neumático Michelin, lo guarda y comprueba que aparece en pantalla.

## 2. Ciclo de Vida (Limpieza del taller)
* **`beforeAll`:** Enciende servicios pesados globales (como el simulador de red MSW) una sola vez al principio.
* **`beforeEach`:** Limpia los filtros y estados antes de arrancar cada test individual para empezar limpios.
* **`afterEach`:** Pasa la escoba después de cada test (limpia formularios y reinicia manejadores de red).
* **`afterAll`:** Apaga los equipos globales y cierra el entorno una sola vez al final de todas las pruebas.

## 3. Simulación de Red con MSW
* Usamos **Mock Service Worker (MSW)** porque intercepta las peticiones directamente a nivel de red real en lugar de falsear el código de JavaScript. El componente se cree al 100% que habla con el servidor real, permitiendo probar respuestas verdaderas, códigos de estado (200, 400, 500) y errores sin romper los tests si cambiamos la librería de peticiones en el futuro.