tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#475569", /* Slate-600 (Dark Gray for contrast on light) */
                "background-light": "#f8fafc", /* Slate-50 */
                "background-dark": "#e2e8f0", /* Slate-200 (The requested Gray) */
                "surface-dark": "#ffffff", /* White cards */
                "border-dark": "#cbd5e1", /* Slate-300 */
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
}

// Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Optional: Change icon
            const icon = mobileMenuBtn.querySelector('span');
            if (mobileMenu.classList.contains('hidden')) {
                icon.textContent = 'menu';
            } else {
                icon.textContent = 'close';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('span');
                icon.textContent = 'menu';
            });
        });
    }

    // Scroll Reveal Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            } else {
                entry.target.classList.remove('reveal-visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('initial-loader');
    const progressBar = document.getElementById('loader-progress');
    const loadingText = document.getElementById('loading-text');
    const welcomeText = document.getElementById('welcome-text');
    const body = document.body;

    // Typewriter Logic
    const typewriterElement = document.getElementById('typewriter-text');
    const phrases = [
        "Hola mundo soy Jose",
        "Explora mis proyectos abajo",
        "¿Tienes un desafío? Tengo una solución.",
        "while(true) { aprender(); crear(); }"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typeSpeed);
    }

    // Scroll Spy Logic
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.glass-nav a');

    const observerSpy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href').substring(1); // remove #
                        // Reset all
                        link.classList.remove('text-slate-900', 'bg-slate-200/50'); 
                        link.classList.add('text-slate-600');
                        
                        // Set active
                        if (href === id) {
                            link.classList.remove('text-slate-600');
                            link.classList.add('text-slate-900', 'bg-slate-200/50', 'rounded-full', 'px-3', 'py-1');
                        }
                    });
                }
            }
        });
    }, { threshold: 0.5 }); // 50% visible

    sections.forEach(section => observerSpy.observe(section));

    if (loader) {
        // Start from 0
        progressBar.style.width = '0%';
        
        let progress = 0;
        const totalDuration = 2000;
        const intervalTime = 50;
        const increment = 100 / (totalDuration / intervalTime);

        const interval = setInterval(() => {
            progress += increment;
            
            // Add randomness
            if (Math.random() > 0.5) progress += Math.random() * 5;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                progressBar.style.width = '100%';
                
                // Show Welcome Text after bar fills
                setTimeout(() => {
                    loadingText.style.opacity = '0';
                    loadingText.style.transform = 'translateY(-10px)';
                    
                    welcomeText.classList.remove('opacity-0', 'translate-y-10');
                    welcomeText.classList.add('animate-wipe');
                }, 500);

                // Hide Loader
                setTimeout(() => {
                    loader.classList.add('loader-hidden');
                    body.classList.add('loaded');
                    body.classList.remove('overflow-hidden');
                    
                    // Start Typewriter after loader
                    setTimeout(() => {
                        type();
                    }, 500);

                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 1000);
                }, 2500);
            } else {
                progressBar.style.width = `${progress}%`;
            }
        }, intervalTime);
    }
});

