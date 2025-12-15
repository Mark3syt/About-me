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
