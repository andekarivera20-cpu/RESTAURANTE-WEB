/* ==========================================================
   BRASA — JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================================
       ELEMENTOS PRINCIPALES
    ====================================================== */

    const header = document.getElementById("header");

    const botonMenu = document.getElementById("menu-hamburguesa");
    const nav = document.getElementById("nav");
    const enlacesNav = document.querySelectorAll(".nav-link");

    const botonesCategorias = document.querySelectorAll(".categoria");
    const listaPlatos = document.getElementById("lista-platos");

    const formularioReserva = document.getElementById("form-reserva");
    const mensajeReserva = document.getElementById("mensaje-reserva");

    const campoFecha = document.getElementById("fecha");

    const modalReserva = document.getElementById("modal-reserva");
    const cerrarModal = document.getElementById("cerrar-modal");
    const aceptarModal = document.getElementById("aceptar-modal");



    /* ======================================================
       HEADER AL HACER SCROLL
    ====================================================== */

    function controlarHeader() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    controlarHeader();

    window.addEventListener("scroll", controlarHeader);



    /* ======================================================
       MENÚ MÓVIL
    ====================================================== */

    function abrirMenu() {

        nav.classList.add("activo");
        botonMenu.classList.add("activo");

        botonMenu.setAttribute("aria-expanded", "true");

        document.body.classList.add("menu-abierto-body");

    }


    function cerrarMenuMovil() {

        nav.classList.remove("activo");
        botonMenu.classList.remove("activo");

        botonMenu.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-abierto-body");

    }


    botonMenu.addEventListener("click", function () {

        const estaAbierto = nav.classList.contains("activo");

        if (estaAbierto) {
            cerrarMenuMovil();
        } else {
            abrirMenu();
        }

    });


    enlacesNav.forEach(function (enlace) {

        enlace.addEventListener("click", function () {
            cerrarMenuMovil();
        });

    });


    window.addEventListener("resize", function () {

        if (window.innerWidth > 800) {
            cerrarMenuMovil();
        }

    });



    /* ======================================================
       CARTA DEL RESTAURANTE
    ====================================================== */

    const carta = {

        entrantes: [

            {
                nombre: "Croquetas de jamón ibérico",
                descripcion: "Cremosas, crujientes y elaboradas en casa.",
                precio: "12 €"
            },

            {
                nombre: "Verduras a la brasa",
                descripcion: "Verduras de temporada cocinadas lentamente al carbón.",
                precio: "14 €"
            },

            {
                nombre: "Pulpo a la brasa",
                descripcion: "Pulpo, patata asada y aceite de pimentón.",
                precio: "19 €"
            },

            {
                nombre: "Provolone al fuego",
                descripcion: "Queso provolone fundido con tomate y hierbas aromáticas.",
                precio: "13 €"
            }

        ],


        carnes: [

            {
                nombre: "Chuletón de vaca madurada",
                descripcion: "Selección de vaca madurada cocinada directamente sobre las brasas.",
                precio: "32 €"
            },

            {
                nombre: "Entrecot de vaca",
                descripcion: "Entrecot a la parrilla acompañado de patatas asadas.",
                precio: "26 €"
            },

            {
                nombre: "Costilla a baja temperatura",
                descripcion: "Cocinada lentamente y terminada al fuego para conseguir una capa caramelizada.",
                precio: "24 €"
            },

            {
                nombre: "Pollo de corral",
                descripcion: "Marinado con hierbas aromáticas, limón y cocinado al carbón.",
                precio: "19 €"
            }

        ],


        pescados: [

            {
                nombre: "Rodaballo a la brasa",
                descripcion: "Rodaballo asado al carbón con refrito tradicional.",
                precio: "29 €"
            },

            {
                nombre: "Lubina a la parrilla",
                descripcion: "Lubina acompañada de verduras asadas y aceite de hierbas.",
                precio: "25 €"
            },

            {
                nombre: "Merluza al fuego",
                descripcion: "Merluza con patata panadera, ajo tostado y aceite de oliva.",
                precio: "24 €"
            },

            {
                nombre: "Bacalao sobre brasas",
                descripcion: "Bacalao confitado terminado sobre carbón y acompañado de pil-pil.",
                precio: "25 €"
            }

        ],


        postres: [

            {
                nombre: "Tarta de queso",
                descripcion: "Tarta de queso horneada, cremosa en el interior.",
                precio: "8 €"
            },

            {
                nombre: "Torrija caramelizada",
                descripcion: "Torrija casera caramelizada con helado de vainilla.",
                precio: "8 €"
            },

            {
                nombre: "Chocolate y brasa",
                descripcion: "Chocolate intenso, cacao y un ligero toque ahumado.",
                precio: "9 €"
            },

            {
                nombre: "Helado de vainilla tostada",
                descripcion: "Helado artesanal de vainilla con frutos secos tostados.",
                precio: "7 €"
            }

        ]

    };



    /* ======================================================
       GENERAR LOS PLATOS
    ====================================================== */

    function mostrarCategoria(nombreCategoria) {

        const platos = carta[nombreCategoria];

        if (!platos) {
            return;
        }


        listaPlatos.innerHTML = "";


        platos.forEach(function (plato, indice) {

            const numero = String(indice + 1).padStart(2, "0");


            const articulo = document.createElement("article");

            articulo.classList.add("plato");


            articulo.innerHTML = `

                <div class="numero-plato">
                    ${numero}
                </div>

                <div class="info-plato">

                    <div class="titulo-plato">

                        <h3>
                            ${plato.nombre}
                        </h3>

                        <span class="precio">
                            ${plato.precio}
                        </span>

                    </div>

                    <p>
                        ${plato.descripcion}
                    </p>

                </div>

            `;


            listaPlatos.appendChild(articulo);

        });


        /* Pequeña animación al cambiar de categoría */

        listaPlatos.animate(

            [
                {
                    opacity: 0,
                    transform: "translateY(10px)"
                },

                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],

            {
                duration: 350,
                easing: "ease"
            }

        );

    }



    /* ======================================================
       BOTONES DE LA CARTA
    ====================================================== */

    botonesCategorias.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const categoriaSeleccionada = boton.dataset.categoria;


            botonesCategorias.forEach(function (otroBoton) {
                otroBoton.classList.remove("activa");
            });


            boton.classList.add("activa");


            mostrarCategoria(categoriaSeleccionada);

        });

    });



    /* ======================================================
       FECHA MÍNIMA PARA RESERVAR
    ====================================================== */

    function obtenerFechaLocal() {

        const hoy = new Date();

        const año = hoy.getFullYear();

        const mes = String(
            hoy.getMonth() + 1
        ).padStart(2, "0");

        const dia = String(
            hoy.getDate()
        ).padStart(2, "0");


        return `${año}-${mes}-${dia}`;

    }


    campoFecha.min = obtenerFechaLocal();



    /* ======================================================
       FORMATEAR FECHA
    ====================================================== */

    function formatearFecha(fecha) {

        const partes = fecha.split("-");

        if (partes.length !== 3) {
            return fecha;
        }


        const año = partes[0];
        const mes = partes[1];
        const dia = partes[2];


        return `${dia}/${mes}/${año}`;

    }



    /* ======================================================
       VALIDACIÓN DEL FORMULARIO
    ====================================================== */

    function validarReserva() {

        const nombre =
            document.getElementById("nombre").value.trim();

        const telefono =
            document.getElementById("telefono").value.trim();

        const fecha =
            document.getElementById("fecha").value;

        const hora =
            document.getElementById("hora").value;

        const personas =
            document.getElementById("personas").value;


        if (
            nombre === "" ||
            telefono === "" ||
            fecha === "" ||
            hora === "" ||
            personas === ""
        ) {

            mensajeReserva.textContent =
                "Completa todos los campos obligatorios.";

            return false;

        }


        if (nombre.length < 2) {

            mensajeReserva.textContent =
                "Introduce un nombre válido.";

            return false;

        }


        const telefonoLimpio =
            telefono.replace(/\s/g, "");


        if (
            telefonoLimpio.length < 9 ||
            !/^[+0-9]+$/.test(telefonoLimpio)
        ) {

            mensajeReserva.textContent =
                "Introduce un teléfono válido.";

            return false;

        }


        if (fecha < obtenerFechaLocal()) {

            mensajeReserva.textContent =
                "No puedes seleccionar una fecha pasada.";

            return false;

        }


        mensajeReserva.textContent = "";

        return true;

    }



    /* ======================================================
       ENVIAR FORMULARIO
    ====================================================== */

    formularioReserva.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            if (!validarReserva()) {
                return;
            }


            const nombre =
                document.getElementById("nombre").value.trim();

            const fecha =
                document.getElementById("fecha").value;

            const hora =
                document.getElementById("hora").value;

            const personas =
                document.getElementById("personas").value;


            /* Rellenamos el modal */

            document.getElementById(
                "nombre-confirmacion"
            ).textContent = nombre;


            document.getElementById(
                "fecha-confirmacion"
            ).textContent = formatearFecha(fecha);


            document.getElementById(
                "hora-confirmacion"
            ).textContent = hora;


            document.getElementById(
                "personas-confirmacion"
            ).textContent =
                personas === "1"
                    ? "1 persona"
                    : `${personas} personas`;


            abrirModal();


            /*
               IMPORTANTE:
               No hacemos formularioReserva.reset()
               todavía.

               Así el usuario sigue viendo los datos
               que había introducido.
            */

        }
    );



    /* ======================================================
       MODAL DE CONFIRMACIÓN
    ====================================================== */

    function abrirModal() {

        modalReserva.classList.add("activo");

        modalReserva.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    function cerrarModalReserva() {

        modalReserva.classList.remove("activo");

        modalReserva.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    cerrarModal.addEventListener(
        "click",
        cerrarModalReserva
    );


    aceptarModal.addEventListener(
        "click",
        cerrarModalReserva
    );


    const overlayModal =
        modalReserva.querySelector(".modal-overlay");


    overlayModal.addEventListener(
        "click",
        cerrarModalReserva
    );


    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key === "Escape" &&
                modalReserva.classList.contains("activo")
            ) {

                cerrarModalReserva();

            }

        }
    );



    /* ======================================================
       ANIMACIONES AL HACER SCROLL
    ====================================================== */

    const elementosRevelar =
        document.querySelectorAll(".revelar");


    const observador =
        new IntersectionObserver(

            function (entradas, observer) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("visible");

                        observer.unobserve(
                            entrada.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    elementosRevelar.forEach(function (elemento) {
        observador.observe(elemento);
    });



    /* ======================================================
       CONTADORES ANIMADOS
    ====================================================== */

    const contadores =
        document.querySelectorAll(".contador");


    function animarContador(contador) {

        const objetivo =
            Number(contador.dataset.objetivo);


        let valorActual = 0;


        const duracion = 1200;

        const intervalo = 30;

        const pasos =
            duracion / intervalo;


        const incremento =
            objetivo / pasos;


        const animacion =
            setInterval(function () {

                valorActual += incremento;


                if (valorActual >= objetivo) {

                    contador.textContent = objetivo;

                    clearInterval(animacion);

                    return;

                }


                contador.textContent =
                    Math.floor(valorActual);

            }, intervalo);

    }



    const observadorContadores =
        new IntersectionObserver(

            function (entradas, observer) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        animarContador(
                            entrada.target
                        );

                        observer.unobserve(
                            entrada.target
                        );

                    }

                });

            },

            {
                threshold: 0.7
            }

        );


    contadores.forEach(function (contador) {
        observadorContadores.observe(contador);
    });



    /* ======================================================
       MARCAR SECCIÓN ACTIVA EN EL MENÚ
    ====================================================== */

    const secciones =
        document.querySelectorAll(
            "main section[id]"
        );


    function actualizarMenuActivo() {

        let seccionActual = "";


        secciones.forEach(function (seccion) {

            const parteSuperior =
                seccion.offsetTop - 150;


            const altura =
                seccion.offsetHeight;


            if (
                window.scrollY >= parteSuperior &&
                window.scrollY <
                    parteSuperior + altura
            ) {

                seccionActual =
                    seccion.getAttribute("id");

            }

        });


        enlacesNav.forEach(function (enlace) {

            enlace.classList.remove("activo");


            const destino =
                enlace.getAttribute("href");


            if (
                destino === `#${seccionActual}`
            ) {

                enlace.classList.add("activo");

            }

        });

    }


    window.addEventListener(
        "scroll",
        actualizarMenuActivo
    );


    actualizarMenuActivo();



    /* ======================================================
       ENLACES DE DEMOSTRACIÓN
    ====================================================== */

    const enlacesDemo =
        document.querySelectorAll(".enlace-demo");


    enlacesDemo.forEach(function (enlace) {

        enlace.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

            }
        );

    });



    const enlaceMapa =
        document.getElementById("enlace-mapa");


    if (enlaceMapa) {

        enlaceMapa.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                alert(
                    "Proyecto demostrativo: aquí conectaríamos la ubicación real del restaurante."
                );

            }
        );

    }



    /* ======================================================
       AÑO AUTOMÁTICO DEL FOOTER
    ====================================================== */

    const elementoAnio =
        document.getElementById("anio");


    if (elementoAnio) {

        elementoAnio.textContent =
            new Date().getFullYear();

    }



    /* ======================================================
       EVITAR ERROR SI EL NAVEGADOR NO SOPORTA
       ALGUNA ANIMACIÓN MODERNA
    ====================================================== */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elementosRevelar.forEach(
            function (elemento) {

                elemento.classList.add("visible");

            }
        );

    }

});