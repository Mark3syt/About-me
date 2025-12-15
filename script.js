/* === AUDIO CONTROLS MANAGEMENT === */

document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');
    const toggleButton = document.getElementById('toggle-music');
    const volumeSlider = document.getElementById('volume-slider');
    const icon = toggleButton.querySelector('i');

    // Set initial volume from the range input value
    music.volume = parseFloat(volumeSlider.value);

    // Event listener to toggle music
    toggleButton.addEventListener('click', () => {
        if (music.paused) {
            // Attempt to start playback.
            music.play().then(() => {
                icon.classList.remove('fa-volume-off');
                icon.classList.add('fa-volume-up');
            }).catch(error => {
                console.log("Playback blocked: ", error);
            });
        } else {
            music.pause();
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-off');
        }
    });

    // Event listener for volume control
    volumeSlider.addEventListener('input', () => {
        music.volume = parseFloat(volumeSlider.value);
    });
});
