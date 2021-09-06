const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const idInput = document.querySelectorAll(".idLista");
const dni = document.querySelector(".dni");
const isVisible = "is-visible";

let idPresionado;
let idListaSeleccionada;
for (const el of openEls) {
    el.addEventListener("click", function () {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
        idPresionado = this.id;
        console.log("El id del alumno es: " + idPresionado);
    });
}

for (const el of closeEls) {
    el.addEventListener("click", function () {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
        let modalS = document.getElementsByClassName("mymodal")[0].id;
        if (modalS === "mymodal2") {
            let myHeaders = new Headers();
            const options = {
                method: 'POST',
                headers: myHeaders,
                body: new URLSearchParams({
                    'idListaSeleccionada': idListaSeleccionada,
                    'dni': dni.id
                }),

            }
            let myReq = new Request('http://localhost:9000/voto/votar/', options);
            fetch(myReq, { credentials: 'include' })
                .then((res) => {
                    if (res.ok) {
                        console.log('Ok');
                        return res.json(); // <- parseamos el response y lo devolvemos a nuestra función
                    }
                })
                .then((resParsed) => {
                    console.log(resParsed); // <- mostramos los datos recibidos, luego de ser parseados
                    alert("Tu voto ha sido registrado! Muchas gracias por participar");
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.log(error);
                    alert('Se ha producido un error.');
                    window.location.href = "/";
                });
        } else {
            let comboCursos = document.getElementById("curso");
            let selectedCurso = comboCursos.options[comboCursos.selectedIndex].value;
            let idCursoSeleccionado = document.getElementById('identificadorCurso').value;
            console.log("idCursoSeleccionado: " + idCursoSeleccionado);
            console.log("El curso seleccionado es: ", selectedCurso);
            console.log("El Alumno Seleccionado es: " + idPresionado);
            window.location.href = "/curso/actualizarCurso/" + idPresionado + "/" + selectedCurso + "/" + idCursoSeleccionado;
        }
        //console.log("Valor de closeEls: "+closeEls);
    });
}
document.addEventListener("click", e => {
    if (e.target == document.querySelector(".mymodal.is-visible")) {
        document.querySelector(".mymodal.is-visible").classList.remove(isVisible);
    }
});

document.addEventListener("keyup", e => {
    // if we press the ESC
    //console.log("tecla "+ e.key);
    if (e.key == "Escape" && document.querySelector(".mymodal.is-visible")) {
        document.querySelector(".mymodal.is-visible").classList.remove(isVisible);
    }
});
const cuandoHaceClick = function (evento) {
    //console.log("El input es: " + this.id);
    idListaSeleccionada = this.id;
}
idInput.forEach(input => {
    input.addEventListener("click", cuandoHaceClick);
});