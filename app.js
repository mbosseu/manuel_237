/**
 * app.js - Logique de navigation et d'animation pour le site Manuel 237
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Intersection Observer for Scroll Animations
    // Sélecteurs : .fade-in-up, .slide-in-left, .slide-in-right
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 15% de l'élément doit être visible pour déclencher l'animation
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter la classe 'appear' qui lance l'animation CSS
                entry.target.classList.add('appear');
                // Ne plus observer l'élément une fois qu'il est apparu (animation one-shot)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // 4. Form Submission Handling (Prevent Default)
    const form = document.querySelector('.booking-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Envoi en cours...';
            btn.style.opacity = '0.7';
            
            // Simuler un appel API
            setTimeout(() => {
                btn.innerText = 'Demande envoyée !';
                btn.style.background = '#00E5FF'; // Neon blue
                btn.style.color = '#0A0B10';
                btn.style.opacity = '1';
                form.reset();
                
                // Reset boutton après 3s
                setTimeout(() => {
                    btn.innerText = originalText;
                }, 3000);
            }, 1500);
        });
    }

    // =========================================================================
    // 5. CANVAS PARTICLE BACKGROUND (Etoiles Textes "MANUEL 237")
    // =========================================================================
    function initParticleBackground() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let particlesArray = [];
        let textCoordinates = [];

        // Les couleurs "différentes"
        const colors = ['#00E5FF', '#E63946', '#6A00FF', '#FF0055', '#F0EADB'];

        // Représente la zone de la souris
        let mouse = {
            x: null,
            y: null,
            radius: 120 // Rayon d'interaction (explosion au survol)
        }

        window.addEventListener('mousemove', function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        function setupCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        window.addEventListener('resize', setupCanvas);

        class Particle {
            constructor(x, y) {
                // Initialement éparpillé en mode "étoiles"
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.destX = x;
                this.destY = y;
                this.size = Math.random() * 2 + 1;
                this.density = (Math.random() * 40) + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                // Change de couleur au survol
                this.hoverColor = '#ffffff'; 
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                // Explosion au survol
                if (distance < mouse.radius) {
                    this.color = this.hoverColor; // Change de couleur
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Refroidissement lent pour retrouver sa couleur d'origine
                    if (Math.random() < 0.05) {
                        this.color = colors[Math.floor(Math.random() * colors.length)];
                    }
                    
                    // Retourne à sa place (formant le texte)
                    if (this.x !== this.destX) {
                        let dxf = this.x - this.destX;
                        this.x -= dxf / 15; // Vitesse de retour
                    }
                    if (this.y !== this.destY) {
                        let dyf = this.y - this.destY;
                        this.y -= dyf / 15;
                    }
                }
                
                // Petit mouvement constant d'étoiles scintillantes
                this.x += (Math.random() - 0.5) * 0.5;
                this.y += (Math.random() - 0.5) * 0.5;
            }
        }

        function initText() {
            // Dessiner un gros texte hors écran (invisible) pour récupérer ses pixels
            ctx.fillStyle = "white";
            // Police énorme selon la taille de l'écran
            let fontSize = Math.min(canvas.width / 8, 150);
            ctx.font = `900 ${fontSize}px "Outfit", sans-serif`;
            ctx.textAlign = "center";
            ctx.fillText("MANUEL 237", canvas.width / 2, canvas.height / 2);
            
            let textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            textCoordinates = []; 
            
            // Scanner la matrice de l'écran (1 pixel sur 10 pour pas faire ramer)
            for (let y = 0; y < textData.height; y += 8) {
                for (let x = 0; x < textData.width; x += 8) {
                    if (textData.data[(y * 4 * textData.width) + (x * 4) + 3] > 128) {
                        // On ajoute les coordonnées cibles
                        textCoordinates.push({x: x, y: y});
                    }
                }
            }
            // Effacer la toile après le scan
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function initParticles() {
            particlesArray = [];
            initText();
            for (let i = 0; i < textCoordinates.length; i++) {
                particlesArray.push(new Particle(textCoordinates[i].x, textCoordinates[i].y));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animate);
        }

        setupCanvas(); // démarre le tout
        animate();     // démarre l'animation frame par frame
    }

    // Attendre que la police "Outfit" soit chargée pour générer les pixels du texte, sinon fallback instantané.
    if(document.fonts) {
        document.fonts.ready.then(() => {
            initParticleBackground();
        });
    } else {
        setTimeout(initParticleBackground, 500);
    }

    // =========================================================================
    // 6. COUNTDOWN TIMER - Projet en cours
    // =========================================================================
    function startCountdown() {
        function calculateTimeUntilSaturday() {
            const now = new Date();
            const currentDay = now.getDay(); // 0 = Dimanche, 6 = Samedi
            const currentHour = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentSeconds = now.getSeconds();
            
            let targetDate;
            
            // Si aujourd'hui c'est samedi et il n'est pas encore 18h
            if (currentDay === 6 && currentHour < 18) {
                targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0);
            } else {
                // Prochain samedi à 18h
                const daysUntilSaturday = (6 - currentDay + 7) % 7 || 7;
                targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilSaturday, 18, 0, 0);
            }
            
            const timeDifference = targetDate - now;
            
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            return { days, hours, minutes, seconds };
        }
        
        function updateCountdown() {
            const { days, hours, minutes, seconds } = calculateTimeUntilSaturday();
            
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }
        
        // Mettre à jour immédiatement
        updateCountdown();
        
        // Mettre à jour chaque seconde
        setInterval(updateCountdown, 1000);
    }
    
    startCountdown();
});
