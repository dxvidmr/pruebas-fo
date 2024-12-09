document.getElementById("toggleLines").addEventListener("click", function() {
    var milestones = document.querySelectorAll('tei-milestone[unit="stanza"]');
    milestones.forEach(function(milestone) {
        milestone.classList.toggle('show-line');
    });

    // Cambia el texto del botón
    var button = document.getElementById("toggleLines");
    if (button.textContent === "Mostrar estrofas") {
        button.textContent = "Ocultar estrofas";
    } else {
        button.textContent = "Mostrar estrofas";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const teiContainer = document.getElementById("TEI");
    const noteContentDiv = document.getElementById("noteContent");

    // Observa cuando se añadan nodos al contenedor #TEI
    const observer = new MutationObserver(() => {
        const refs = teiContainer.querySelectorAll('ref[n]');
        
        if (refs.length > 0) {
            // Deja de observar una vez que los <ref> están presentes
            observer.disconnect();

            // Procesa cada <ref> para añadir el superíndice y el evento
            refs.forEach(ref => {
                const noteNumber = ref.getAttribute("n");

                const link = document.createElement("a");
                link.setAttribute("href", "javascript:void(0);");
                link.innerHTML = noteNumber;

                const sup = document.createElement("sup");
                sup.appendChild(link);

                ref.parentNode.replaceChild(sup, ref);

                // Evento de clic para mostrar la nota en el panel
                link.addEventListener("click", function() {
                    const note = document.querySelector(`note[n="${noteNumber}"]`);
                    if (note) {
                        noteContentDiv.innerHTML = `<p>${note.innerHTML}</p>`;
                    } else {
                        noteContentDiv.innerHTML = "<p>Nota no encontrada.</p>";
                    }
                });
            });
        }
    });

    // Inicia la observación en el contenedor TEI
    observer.observe(teiContainer, { childList: true, subtree: true });
});







