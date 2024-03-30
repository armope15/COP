// saveModule.js
const SaveModule = (() => {
    function getFilename() {
    // Obtiene la ruta relativa del archivo actual
    const path = document.location.pathname;

    // Divide la ruta en segmentos utilizando el carácter '/'
    const segments = path.split('/');

    // Obtiene el último segmento que sería el nombre del archivo
    let filename = segments.pop();
            if (filename === ''){filename='index.html';}
    return filename;
    }

    function readHTML() {
        // Retorna el HTML actual del documento
        return document.documentElement.outerHTML;
    }

    function saveData() {
        const filename = getFilename();
        const textareas = document.querySelectorAll('textarea');
                // Iterar sobre cada textarea
                textareas.forEach(textarea => {
                // Asignar el valor de innerHTML al atributo value
                textarea.value = textarea.innerHTML;});
      
        const content = readHTML();

        alert(filename);
        alert(content);
        

        // Enviar los datos al servidor utilizando fetch con el método POST
        fetch('save.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `filename=${filename}&content=${encodeURIComponent(content)}`
        })
        .then(response => response.text())
        .then(data => console.log(data)) // Manejar la respuesta del servidor
        .catch(error => console.error('Error:', error));
    }

    function init() {
        document.addEventListener('keydown', function(event) {
            if (event.key === 'F8') {
                saveData();
            }
        });
    }

    return {
        init: init
    };
})();

export default SaveModule;
