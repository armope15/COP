// editor.js
const Editor = (() => {
    let selectedElement;
    var md = window.markdownit();
    
    
    function handleKeyPress(event) {
      if (event.key === 'F9') {
        alert('Capturaste la tecla F9');
        event.stopPropagation();
      }
      if (event.key === 'Insert' && event.ctrlKey) {
        if (selectedElement) {
          const newDiv = document.createElement('div');
          newDiv.className = 'normal-div';
           // Agregar textarea y div con clases show y hide
          newDiv.innerHTML = `
          <textarea class="edit hide">...</textarea>
          <div class="code show">...</div>
          `;
          selectedElement.appendChild(newDiv);
          selectedElement.classList.remove('selected');
          newDiv.classList.add('selected');
          selectedElement = newDiv;
        }
      }
      if (event.key === 'Insert' && !event.ctrlKey) {
        if (selectedElement) {
            const newDiv = document.createElement('div');
            newDiv.className = 'normal-div';
            
            // Agregar textarea y div con clases show y hide
            newDiv.innerHTML = `<textarea class="edit hide">...</textarea><div class="code show">...</div>`;
            
            // Insertar el nuevo elemento después del elemento seleccionado
            selectedElement.insertAdjacentElement('afterend', newDiv);
            
            // Quitar la clase 'selected' del elemento actualmente seleccionado
            selectedElement.classList.remove('selected');
            
            // Asignar la clase 'selected' al nuevo elemento
            newDiv.classList.add('selected');
            
            // Actualizar el elemento seleccionado
            selectedElement = newDiv;
        }
    }
    

      if (event.key === 'Delete' && event.ctrlKey) {
        if (selectedElement && selectedElement.id != 'editor-container') {
          const confirmDelete = confirm('¿Estás seguro de que deseas borrar el contenido?');
          if (confirmDelete) {
            selectedElement.remove();
            selectedElement = null;
          }
        }
      }

      if (event.key === 'Tab') {
        if (selectedElement) {
          const textarea = selectedElement.querySelector('textarea');
          textarea.classList.toggle('hide');
        }
      }
    }

    function handleKeyUp(event)
    {
      if (event.target.tagName === 'TEXTAREA') {
        const codeElement = event.target.nextElementSibling;
        const codeContent = event.target.value;
          event.target.innerHTML = event.target.value;      
        // Aplica la función render al elemento code
        render(codeElement , codeContent);
      }
    }


      


    function render(codeElement , value){
        var result = md.render(value);
        codeElement.innerHTML = result;
        hljs.highlightAll();
        //hljs.highlightElement(codeElement);
    }

    function handleElementClick(event) {
        let clickedElement = event.target;
        event.stopPropagation();
        
        if (clickedElement.classList.contains('hljs-keyword')){
            handleKeywordClick(clickedElement)
            return;
        }

        if (clickedElement.tagName === 'TEXTAREA') {
            clickedElement = clickedElement.parentElement;
          }
        if(!clickedElement.classList.contains('normal-div')){
          if (clickedElement.parentElement.classList.contains('normal-div')) {
            clickedElement = clickedElement.parentElement;
          }
          if (clickedElement.parentElement.parentElement.classList.contains('normal-div')) {
            clickedElement = clickedElement.parentElement.parentElement;
          }
        }

        // Verifica si el elemento clickeado no es el mismo que ya está seleccionado
        if (clickedElement !== selectedElement && clickedElement.classList.contains('normal-div')) {
            // Quita la clase 'selected' del elemento actualmente seleccionado (si existe)
            if (selectedElement) {
                selectedElement.classList.remove('selected');
            }
    
            // Asigna la clase 'selected' al elemento clickeado
            clickedElement.classList.add('selected');
            
            // Actualiza el elemento seleccionado
            selectedElement = clickedElement;
        }
      }


      function handleKeywordClick(clickedElement) {
        
        const keywordText = clickedElement.textContent;
        const helpBar = document.querySelector('#help-bar');
        // Muestra el texto del elemento en la barra de ayuda
        if(helpBar){helpBar.textContent = keywordText;}
      }


  
    function init() {
      const selectedElement = document.querySelector('.selected');
      document.body.addEventListener('keydown', handleKeyPress);
      document.body.addEventListener('keyup', handleKeyUp);
      document.body.addEventListener('click', handleElementClick);


    }
  
    return {
      init: init
    };
  })();
  
  export default Editor;
  