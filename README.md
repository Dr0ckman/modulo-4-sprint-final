# Requerimientos

1. Obtener data desde PokeAPI.
2. Mostrar data en tarjetas de Bootstrap.
    - Al clickear la tarjeta, se debe abrir un modal que muestre sus estadísticas en un gráfico ~~de torta~~ de radar.
3. Generar 2 filtros: uno para buscar por ID y otro para buscar masivamente. En los requerimientos dice que hay que generar 2 HTML, pero se puede hacer en uno.
    - Usar botones dentro de un input group para seleccionar tipo de filtro.
    - El filtro por ID debe ser exacto. Puedo hacer el query directamente a la API.
    - El filtro masivo debe incluir el término.
4. Mostrar 20 pokemon por página. En la parte inferior, debe haber un botón llamado "Mostrar más" que agregue 20 más.
    - Realizar un fetch de la data completa y filtrar en el lado del cliente, porque la API no permite busquedas inexactas.
5. Agregar un botón de "Borrar filtro" que limpie el input y muestre los 20 primeros pokemon nuevamente.

### Referencias

- [PokeAPI](https://pokeapi.co/)
- [ChartJS](https://www.chartjs.org/docs/latest/charts/radar.html)
- [Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
