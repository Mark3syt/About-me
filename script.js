/* === CONFIGURAZIONE E INIZIALIZZAZIONE DI PARTICLES.JS === */

// La libreria particles.js è stata caricata prima di questo script.
// Usiamo la funzione globale particlesJS per inizializzare lo sfondo.
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 400, // Il tuo valore predefinito
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#fff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#ff0000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 1,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 2,
                "opacity_min": 0,
                "sync": false
            }
        },
        "size": {
            "value": 2.5, // Ridotto un po' per un effetto "network" più fine
            "random": true, // Reso randomico
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150, // Aumentato per un effetto connessione più visibile
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1.5, // Velocità ridotta
            "direction": "none",
            "random": true, // Reso randomico
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        },
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab" // Modalità "grab" per l'interattività al passaggio del mouse
            },
            "onclick": {
                "enable": true,
                "mode": "push" // Modalità "push" al click
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 200,
                "size": 80,
                "duration": 0.4
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});


/* === GESTIONE CONTROLLI AUDIO === */

document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');
    const toggleButton = document.getElementById('toggle-music');
    const volumeSlider = document.getElementById('volume-slider');
    const icon = toggleButton.querySelector('i');

    // Imposta il volume iniziale dall'attributo value del range input
    music.volume = parseFloat(volumeSlider.value);

    // Evento per attivare/disattivare la musica
    toggleButton.addEventListener('click', () => {
        if (music.paused) {
            // Tenta di avviare la riproduzione.
            // Nota: molti browser bloccano l'autoplay se non c'è stata interazione
            // dell'utente. Qui l'utente sta cliccando, quindi dovrebbe funzionare.
            music.play().then(() => {
                icon.classList.remove('fa-volume-off');
                icon.classList.add('fa-volume-up');
            }).catch(error => {
                console.log("Riproduzione bloccata: ", error);
            });
        } else {
            music.pause();
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-off');
        }
    });

    // Evento per la gestione del volume
    volumeSlider.addEventListener('input', () => {
        music.volume = parseFloat(volumeSlider.value);
    });
});
