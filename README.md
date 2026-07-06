
La aplicación muestra una galería de Pokémon con información relevante como nombre, tipo, tamaño, edad y una breve descripción. El usuario puede buscar criaturas por nombre, tipo o especie, personalizar su experiencia con su nombre y cambiar el tema visual entre claro y oscuro. Todo esto se integra con persistencia de datos para que la experiencia se mantenga al recargar la página.

- Exploración de Pokémon desde la PokéAPI oficial. https://pokeapi.co/
- Búsqueda en tiempo real por nombre, tipo o especie.
- Visualización de tarjetas individuales con información detallada.
- Persistencia del nombre del usuario en localStorage.
- Persistencia del tema visual en cookies nativas del navegador.
- Diseño responsive y preparado para una experiencia moderna.

La aplicación está organizada de forma modular mediante componentes separados:

- Welcome: componente principal que se encarga de gestionar la carga de datos, búsqueda y estado general de la interfaz.
- PetCard: componente usado para renderizar cada tarjeta de Pokémon con su información visual.
- UserPreferences: componente que se usa para administrar el nombre del usuario y el cambio de tema claro/oscuro.

React con React Router y TypeScript

La aplicación está construida con React y TypeScript, utilizando una estructura compatible con React Router para renderizar la vista principal. 

- El componente principal se encarga de la lógica de negocio y del estado de la app.
- Cada Pokémon se renderiza en un componente independiente.
- La personalización del usuario y el manejo del tema se separan en otro componente específico.

Consumo asíncrono de la API de PokéAPI

La información de los Pokémon se obtiene mediante fetch, utilizando async/await para procesar la respuesta de la API.
- solicitud inicial a la PokéAPI para obtener la lista de Pokémon,
- solicitud adicional por cada Pokémon para recuperar sus datos detallados,
- transformación de la respuesta en objetos listos para mostrar en la interfaz.

Uso de hooks de React
La aplicación hace uso correcto de los hooks principales de React:

- useState: para manejar estados como la lista de Pokémon, el término de búsqueda, el estado de carga, el mensaje de error y el nombre del usuario.
- useEffect: para disparar la carga inicial de la API al montar el componente y para controlar la limpieza de efectos cuando el componente deja de estar activo.
- useMemo: para optimizar el filtro de búsqueda en tiempo real, evitando recalcular la lista innecesariamente en cada interacción.

Persistencia de datos
- localStorage: guarda el nombre del usuario para conservarlo entre recargas.
- Cookies nativas: guardan la preferencia del tema visual claro u oscuro con tiempo de expiración.

## Tecnologías utilizadas

- React
- TypeScript
- React Router
- Vite
- PokéAPI
- CSS personalizado para estilos y diseño visual


