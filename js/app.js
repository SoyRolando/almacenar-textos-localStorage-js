//==== Variables
const formulario = document.querySelector('#formulario');
const listaTwets = document.querySelector('#lista-tweets');
let tweets = [];

//==== Event Listeners
eventListeners();

function eventListeners(){

    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet) // Se utiliza 'submit' para escuchar cuando se envia el formulario

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; // Guarga en el temporal el historico de 'tweets' 

        crearHTML(); // Cargo el HTML para que se muestre el historico de los tweets
    });
    
}


//==== Funciones
function agregarTweet(e){
    e.preventDefault();

    // texarea donde los usuarios escriben
    const tweet = document.querySelector('#tweet').value;

    // Valido que no esté vacio
    if(tweet === ''){
        mostrarError('Un mensaje No puede ir vacio Boludo');

        return; // Evita que se ejecuten mas lineas de codigo
    }

    // Objeto con los paramentros de lectura
    const tweetObj = {
        id: Date.now(),
        tweet
    }


    // Añadir al arreglo de tweet
    tweets = [...tweets, tweetObj];

    // Una vez creado el arreglo de tweet se crea el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(texto){
    const mensajeError = document.createElement('P');
    mensajeError.classList.add('error');
    mensajeError.textContent = texto;

    // Insertando en el HTML
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 2 seg
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}

// Mustra un listado de los tweets
function crearHTML(){

    if(tweets.length == 0){
        limpiarHTML();
        sincronizarStorage();
        return;
    }

    if(tweets.length > 0){

        limpiarHTML();

        tweets.forEach( tweet => {
            // Agregar Boton de Eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Añadir la fucion de eliminar
            btnEliminar.onclick = () => {
                eliminarTweet(tweet.id);
                crearHTML();

                console.log(tweets);
            };
            
            

            // Crear el HTML
            const li = document.createElement('li');

            // Añadir el texto, xq el id se le guarda automatico
            li.textContent = tweet.tweet;

            //Asignar el boton de elimiar al tweet
            li.appendChild(btnEliminar);

            // Insertando en el HTML
            listaTwets.appendChild(li);
        });
    }

    // Almacenar en Storage
    sincronizarStorage();

}

// Agrega los tweets actuales a Local Storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

// Limpir el HTML
function limpiarHTML(){
    while(listaTwets.firstChild){
        listaTwets.removeChild(listaTwets.firstChild);
    }
}

// Eliminar tweet
function eliminarTweet(id){
        tweets = tweets.filter( tweet=> tweet.id !== id);
    
}