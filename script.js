/* === CONFIGURAZIONE E INIZIALIZZAZIONE DI PARTICLES.JS === */

// Usiamo la funzione globale particlesJS per inizializzare lo sfondo.
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80, // AGGIORNATO: Numero di particelle ridotto (era 400)
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
            "value": 5, // AGGIORNATO: Dimensione delle particelle aumentata (era 2.5)
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 4, // AGGIORNATO: Velocità aumentata (era 1.5)
            "direction": "none",
            "random": true,
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
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
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
