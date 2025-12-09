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
            
            // MODIFICA 1: Grandezza dimezzata (Era: * 6 + 6. Ora: * 3 + 3. Max 6px)
            this.radius = Math.random() * 3 + 3; 
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            // MODIFICA 2: Colore bianco sfuso (Opacità 0.5)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
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
        // MODIFICA 3: Soglia di connessione aumentata (più lunghe) a 350 pixel
        const threshold = 350; 
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < threshold) {
                    const opacity = 1 - (distance / threshold);
                    
                    // MODIFICA 4: Linee più visibili (Opacità aumentata a 0.3)
                    // Usiamo un grigio chiaro per contrastare meglio
                    ctx.strokeStyle = `rgba(180, 180, 180, ${opacity * 0.3})`; 
                    
                    // MODIFICA 5: Spessore linea più doppio (Era 3. Ora 5)
                    ctx.lineWidth = 5; 
                    
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
