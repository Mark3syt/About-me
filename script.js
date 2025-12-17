document.addEventListener('DOMContentLoaded', () => {
    // 1. Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5 },
                "size": { "value": 3 },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2 }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" } }
            }
        });
    }

    // 2. Typing Effect
    const text = "Full Stack Developer";
    const typewriterElement = document.getElementById('typewriter');
    let i = 0;

    function typeWriter() {
        if (typewriterElement && i < text.length) {
            typewriterElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    typeWriter();

    // 3. Audio Logic
    const music = document.getElementById('background-music');
    const toggleBtn = document.getElementById('toggle-music');
    const volumeSlider = document.getElementById('volume-slider');

    if (music && toggleBtn && volumeSlider) {
        music.volume = 0.05;
        toggleBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                music.pause();
                toggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
        volumeSlider.addEventListener('input', (e) => {
            music.volume = e.target.value;
        });
    }

    // 4. Smooth Scroll Fix per tutti i link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
