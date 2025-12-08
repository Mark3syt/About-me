document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // 1. LOGICA DEL BACKGROUND (NETWORK)
    // ------------------------------------
    const canvas = document.getElementById('network');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // Numero di particelle (600)
    const maxParticles = 600;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            
            // Velocità media (0.4)
            this.vx = (Math.random() - 0.5) * 0.4; 
            this.vy = (Math.random() - 0.5) * 0.4;
            
            // MODIFICA 1: Grandezza quadruplicata (Rispetto al triplo precedente, usiamo un moltiplicatore maggiore)
            // Era: Math.random() * 4.5 + 4.5 (Max 9px). Ora: Math.random() * 6 + 6 (Max 12px)
            this.radius = Math.random() * 6 + 6; 
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            // Colore dei puntini
            ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        // MODIFICA 2: Soglia di connessione aumentata a 300 pixel
        const threshold = 300; 
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < threshold) {
                    const opacity = 1 - (distance / threshold);
                    
                    // MODIFICA 3: Colore delle linee più scuro (RGB 50, 50, 50, era 100, 100, 100)
                    ctx.strokeStyle = `rgba(50, 50, 50, ${opacity * 0.15})`; 
                    
                    // Spessore linea triplicato (3)
                    ctx.lineWidth = 3; 
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        drawLines();
        particles.forEach(p => {
            p.update();
            p.draw();
        });
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    animate();


    // ------------------------------------
    // 2. LOGICA CONTROLLI MUSICA
    // ------------------------------------
    const music = document.getElementById('background-music');
    const toggleButton = document.getElementById('toggle-music');
    const volumeSlider = document.getElementById('volume-slider');

    // Imposta il volume iniziale basso
    music.volume = parseFloat(volumeSlider.value);

    // Gestisce play/pause
    toggleButton.addEventListener('click', () => {
        if (music.paused) {
            music.play().catch(e => console.log("User interaction required to play audio."));
            toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            toggleButton.classList.remove('paused');
        } else {
            music.pause();
            toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            toggleButton.classList.add('paused');
        }
    });

    // Gestisce il cambio di volume
    volumeSlider.addEventListener('input', (e) => {
        music.volume = parseFloat(e.target.value);
    });

    // Aggiusta il pulsante se la musica parte automaticamente
    music.addEventListener('play', () => {
        toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        toggleButton.classList.remove('paused');
    });

    // Aggiusta il pulsante se la musica non parte automaticamente (per restrizioni browser)
    music.addEventListener('pause', () => {
        // Controlla se è stata l'azione di pausa dell'utente o una restrizione del browser
        if (!toggleButton.classList.contains('paused')) {
             toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
});
