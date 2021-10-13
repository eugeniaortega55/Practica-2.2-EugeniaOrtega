   // MODELO DE DATOS

   let mis_peliculas_iniciales = [
    {titulo: "Superlópez",   director: "Javier Ruiz Caldera", "miniatura": "files/superlopez.png"},
    {titulo: "Jurassic Park", director: "Steven Spielberg", "miniatura": "files/jurassicpark.png"},
    {titulo: "Interstellar",  director: "Christopher Nolan", "miniatura": "files/interstellar.png"},
    {titulo: "Captain Fantastic", director: "Matt Ross", "miniatura" : "files/captain fantastic.png"},
];

localStorage.mis_peliculas = localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);

// VISTAS
const indexView = (peliculas) => {
    let i=0;
    let view = "";

    while(i < peliculas.length) {
      view += `
        <div class="movie">
           <div class="movie-img">
                <img data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
           </div>
           <div class="title">
               ${peliculas[i].titulo || "<em>Sin título</em>"}
           </div>
           <div class="actions">
                <!--Insertar aquí botones de "Show" y "Delete"-->
               <button class="edit" data-my-id="${i}">edit</button>
               <button class="show" data-my-id="${i}">show</button>
               <button class="delete" data-my-id="${i}">delete</button>
            </div>
        </div>\n`;
      i = i + 1;
    };

    view += `<div class="actions">
                <!--Insertar aquí botones de "Añadir" y "Reset"-->
                <button class="new" data-my-id="${i}">new</button>
                <button class="reset" data-my-id="${i}">reset</button>
            </div>`;

    return view;
};

const editView = (i, pelicula) => {
    return `<h2>Editar Película </h2>
        <div class="field">
        <h3>Título</h3>
        <input  type="text" id="titulo" placeholder="Título" 
                value="${pelicula.titulo}">
        </div>
        <div class="field">
        <h3>Director</h3>
        <input  type="text" id="director" placeholder="Director" 
                value="${pelicula.director}">
        </div>
        <div class="field">
        <h3>Miniatura</h3>
        <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                value="${pelicula.miniatura}">
        </div>
        <div class="actions">
            <button class="update" data-my-id="${i}">
                Actualizar
            </button>
            <button class="index">
                Volver
            </button>
       `;
}

const showView = (pelicula) => {
    
    return ` <h2>Información acerca de la Película</h2>
    <div class = "field">
    <h4>Título</h4>
    <h1> ${pelicula.titulo}</h1>
    </div>
    <div class = "field">
    <h4>Director</h4>
    <h1>${pelicula.director}</h1>
    </div>
    <div class = "field">
    <h4>Miniatura</h4>
    <h1>${pelicula.miniatura}</h1>
    </div>
     <div class="actions">
        <button class="index">Volver</button>
     </div>`;
}

const newView = () => {
   
    return `<h2>Crear Película</h2>
    <div class = "field">
    Título  <br>
    <input type = "text" id = "titulo" placeholder = "Título">
    </div>

    <div class = "field">
    Director <br>
    <input type = "text" id = "director" placeholder = "Director">
    </div>

    <div class = "field">
    Miniatura <br>
    <input type = "text" id = "miniatura" placeholder = "Miniatura">
    </div>
    <div class="actions">
        <button class="create" id = "create">Crear</button>
        <button class="index" id = "volver">Volver</button>`;
}


// CONTROLADORES 
const indexContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    document.getElementById('main').innerHTML = indexView(mis_peliculas);
};

const showContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas)[i];
    document.getElementById('main').innerHTML = showView(mis_peliculas);
};

const newContr = () => {
    document.getElementById('main').innerHTML = newView();
    
};

const createContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas)
    var pelicula_nueva = {
        titulo: document.getElementById("titulo").value,
        director: document.getElementById ("director").value,
        miniatura: document.getElementById ("miniatura").value};
    mis_peliculas.push(pelicula_nueva);
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();

    
};

const editContr = (i) => {
    let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
    document.getElementById('main').innerHTML = editView(i, pelicula);
};

const updateContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    mis_peliculas[i].titulo    = document.getElementById('titulo').value;
    mis_peliculas[i].director  = document.getElementById('director').value;
    mis_peliculas[i].miniatura = document.getElementById('miniatura').value;
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
};

const deleteContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    var r = confirm ("Deseas eliminar la película?")
    if (r == true) {
        mis_peliculas.splice(i,1);
        localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
        indexContr();
    } else {
        indexContr();
    }

};

const resetContr = () => {
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas_iniciales);
    indexContr();
    
};

// ROUTER de eventos
const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

document.addEventListener('click', ev => {
    if      (matchEvent(ev, '.index'))  indexContr  ();
    else if (matchEvent(ev, '.edit'))   editContr   (myId(ev));
    else if (matchEvent(ev, '.update')) updateContr (myId(ev));
    else if (matchEvent(ev, '.show'))   showContr   (myId(ev));
    else if (matchEvent(ev, '.new')) newContr (myId(ev));
    else if (matchEvent(ev, '.create')) createContr (myId(ev));
    else if (matchEvent(ev, '.delete')) deleteContr (myId(ev));
    else if (matchEvent(ev, '.reset')) resetContr (myId(ev));

})


// Inicialización        
document.addEventListener('DOMContentLoaded', indexContr);







