// Navigation mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Carousel DailyCore simplifié avec animation
class SimpleCarousel {
    constructor() {
        this.currentMockup = document.getElementById('currentMockup');
        this.leftBtn = document.querySelector('.carousel-btn-left');
        this.rightBtn = document.querySelector('.carousel-btn-right');
        this.indicators = document.querySelectorAll('.indicator');
        
        if (!this.currentMockup) return;
        
        this.currentIndex = 0;
        this.isAnimating = false;
        
        // Définir les images des mockups
        this.slides = [
            '6.9%22 Display/Mokup 1.jpg',
            '6.9%22 Display/Mokup 2.jpg',
            '6.9%22 Display/Mokup 3.jpg',
            '6.9%22 Display/Mokup 4.jpg',
            '6.9%22 Display/Mokup 5.jpg',
            '6.9%22 Display/Mokup 6.jpg',
            '6.9%22 Display/Mokup 7.jpg',
            '6.9%22 Display/Mokup 8.jpg',
            '6.9%22 Display/Mokup 9.jpg',
            '6.9%22 Display/Mokup 10.jpg'
        ];
        
        this.totalSlides = this.slides.length;
        this.init();
    }
    
    init() {
        this.updateIndicators();
        this.bindEvents();
    }
    
    bindEvents() {
        if (this.leftBtn) {
            this.leftBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prev();
            });
        }
        
        if (this.rightBtn) {
            this.rightBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.next();
            });
        }
        
        // Indicateurs
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(index);
            });
        });
    }
    
    next() {
        if (this.isAnimating) return;
        
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        this.animateToSlide(nextIndex, 'right');
    }
    
    prev() {
        if (this.isAnimating) return;
        
        const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.animateToSlide(prevIndex, 'left');
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        
        const direction = index > this.currentIndex ? 'right' : 'left';
        this.animateToSlide(index, direction);
    }
    
    animateToSlide(nextIndex, direction) {
        this.isAnimating = true;
        
        // Créer une nouvelle image pour la prochaine slide
        const nextImg = document.createElement('img');
        nextImg.src = this.slides[nextIndex];
        nextImg.alt = `DailyCore Screenshot ${nextIndex + 1}`;
        nextImg.className = 'mockup-image';
        nextImg.style.position = 'absolute';
        nextImg.style.top = '0';
        nextImg.style.left = direction === 'right' ? '100%' : '-100%';
        nextImg.style.transition = 'left 0.5s ease';
        
        // Ajouter la nouvelle image au conteneur
        const container = this.currentMockup.parentElement;
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        container.appendChild(nextImg);
        
        // Animer l'image actuelle vers l'extérieur
        this.currentMockup.style.position = 'absolute';
        this.currentMockup.style.top = '0';
        this.currentMockup.style.left = '0';
        this.currentMockup.style.transition = 'left 0.5s ease';
        
        // Déclencher l'animation
        setTimeout(() => {
            this.currentMockup.style.left = direction === 'right' ? '-100%' : '100%';
            nextImg.style.left = '0';
        }, 10);
        
        // Nettoyer après animation
        setTimeout(() => {
            // Remplacer l'image actuelle
            this.currentMockup.remove();
            this.currentMockup = nextImg;
            this.currentMockup.style.position = 'static';
            this.currentMockup.style.transition = '';
            
            this.currentIndex = nextIndex;
            this.updateIndicators();
            this.isAnimating = false;
        }, 500);
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// Animations au scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.feature-card, .app-card, .mission-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scroll pour les liens d'ancrage
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Effet parallax léger pour le hero
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero-content');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// Header transparent/opaque au scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Formulaire de contact
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulation d'envoi
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé !';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 2000);
        }, 1500);
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le carrousel simplifié
    new SimpleCarousel();
    
    // Initialiser les autres fonctionnalités
    animateOnScroll();
    initSmoothScroll();
    initParallax();
    initHeaderScroll();
    initContactForm();
    
    // Ajouter les classes pour les animations CSS
    document.body.classList.add('loaded');
});

// Gestion du redimensionnement de fenêtre
window.addEventListener('resize', () => {
    // Le carrousel se recalcule automatiquement via son event listener
});

// Performance: lazy loading des images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback pour les navigateurs plus anciens
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
} 
