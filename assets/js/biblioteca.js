// biblioteca.js

// Función para cargar la bibliografía
function fetchBibliography() {
    const apiKey = '8kOlHeIzEteFCR5wQi49GiUZ';
    const userOrGroupID = '6612636';
    const collectionID = '65ZVGMRV';

    // Solicitud a la API para obtener los ítems de la colección
    fetch(`https://api.zotero.org/users/${userOrGroupID}/collections/${collectionID}/items?key=${apiKey}`)
      .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }
        return response.json();  // Parsear la respuesta como JSON
      })
      .then(data => displayBibliography(data))
      .catch(error => console.error('Error al cargar la bibliografía:', error));
}

// Función para mostrar la bibliografía en el sitio web
function displayBibliography(data) {
    const bibliographyElement = document.getElementById('bibliography');
    if (!bibliographyElement) {
        console.error('Elemento para mostrar la bibliografía no encontrado en el documento.');
        return;
    }

    const bibliography = document.createElement('ul');
    data.forEach(item => {
        const listItem = document.createElement('li');
        // Extraer el título, autores y fecha del ítem
        const title = item.data.title || 'Título no disponible';
        const authors = item.data.creators ? item.data.creators.map(creator => `${creator.lastName}, ${creator.firstName}`).join('; ') : 'Autor(es) no disponible(s)';
        const date = item.data.date || 'Fecha no disponible';
        
        listItem.textContent = `${title} - ${authors} - ${date}`;
        bibliography.appendChild(listItem);
    });
    bibliographyElement.appendChild(bibliography);
}

// Llamada inicial para cargar la bibliografía cuando la página esté lista
document.addEventListener('DOMContentLoaded', fetchBibliography);
