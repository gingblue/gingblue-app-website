// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Toggle menu mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animation du burger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) {
                        span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    } else if (index === 1) {
                        span.style.opacity = '0';
                    } else {
                        span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    }
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }
    
    // Fermer le menu mobile en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Reset burger animation
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    });
    
    // Smooth scroll pour les liens d'ancrage
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Navigation active state
    function updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === '/' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    updateActiveNav();
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                newsletter: formData.get('newsletter') === 'on'
            };
            
            // Validation simple
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Envoi du formulaire via Formspree (service gratuit)
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Pour l'instant, simulation d'envoi avec mailto caché
            setTimeout(() => {
                try {
                    // Créer l'email avec les données du formulaire
                    const subject = encodeURIComponent(`[GINGBLUE-APP Contact] ${data.subject} - ${data.name}`);
                    const body = encodeURIComponent(
                        `Name: ${data.name}\n` +
                        `Email: ${data.email}\n` +
                        `Company: ${data.company || 'Not specified'}\n` +
                        `Subject: ${data.subject}\n\n` +
                        `Message:\n${data.message}\n\n` +
                        `Newsletter: ${data.newsletter ? 'Yes' : 'No'}`
                    );
                    
                    // Créer un lien mailto et l'ouvrir dans un iframe caché
                    const mailtoLink = `mailto:emoji.aichat@gmail.com?subject=${subject}&body=${body}`;
                    
                    // Ouvrir le mailto dans une nouvelle fenêtre qui se ferme automatiquement
                    const newWindow = window.open(mailtoLink, '_blank');
                    setTimeout(() => {
                        if (newWindow) newWindow.close();
                    }, 1000);
                    
                    showNotification('Your message has been prepared and your email client should open. Thank you for contacting us!', 'success');
                    contactForm.reset();
                    
                } catch (error) {
                    console.error('Error:', error);
                    showNotification('There was an error processing your message. Please try again or contact us directly.', 'error');
                }
                
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Animation au scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .app-card, .mission-card, .contact-card, .faq-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });
    }
    
    animateOnScroll();
    
    // Effet parallax léger sur les hero sections
    function initParallax() {
        const heroSections = document.querySelectorAll('.hero, .hero-about, .hero-apps, .hero-contact');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            heroSections.forEach(hero => {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    initParallax();
    
    // Loading states pour les boutons
    function addButtonLoadingStates() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Pour les liens externes ou de téléchargement
                if (this.classList.contains('btn-download')) {
                    const originalText = this.textContent;
                    this.textContent = 'Redirection...';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }
            });
        });
    }
    
    addButtonLoadingStates();
    
    // Header background au scroll
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    initHeaderScroll();
    
    // Carrousel
    initCarousel();
});

// Carousel functionality
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const items = track.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;
    
    // Create indicators
    for (let i = 0; i < totalItems; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    
    function updateCarousel() {
        // Calculate positions for 3-item view (previous, current, next)
        const itemWidth = 300; // 280px + 20px gap
        const centerOffset = -(currentIndex * itemWidth) + (track.parentElement.offsetWidth / 2) - (itemWidth / 2);
        
        track.style.transform = `translateX(${centerOffset}px)`;
        
        // Update item states
        items.forEach((item, index) => {
            item.classList.remove('active', 'side');
            
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === currentIndex - 1 || index === currentIndex + 1) {
                item.classList.add('side');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play
    setInterval(nextSlide, 5000);
    
    // Initialize
    updateCarousel();
}

// Fonction utilitaire pour valider l'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour afficher les notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Ajouter les styles de notification si ils n'existent pas
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                max-width: 400px;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-content {
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                gap: 1rem;
                border-left: 4px solid var(--primary-color);
            }
            
            .notification-success .notification-content {
                border-left-color: var(--success-color);
            }
            
            .notification-error .notification-content {
                border-left-color: var(--danger-color);
            }
            
            .notification-message {
                flex: 1;
                color: var(--text-primary);
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-secondary);
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Ajouter la notification au DOM
    document.body.appendChild(notification);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Fonction pour le smooth scroll vers une section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Fonction pour copier du texte dans le presse-papiers
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copié dans le presse-papiers !', 'success');
    }).catch(() => {
        showNotification('Erreur lors de la copie', 'error');
    });
}

// Préloader d'images (pour quand les vraies images seront ajoutées)
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Analytics simplifié (remplacer par Google Analytics plus tard)
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // Ici on pourrait envoyer à Google Analytics ou autre service
}

// Gestion des erreurs JavaScript
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    // En production, on pourrait envoyer ces erreurs à un service de monitoring
});

// Performance monitoring simple
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page chargée en ${Math.round(loadTime)}ms`);
    trackEvent('page_load', { load_time: Math.round(loadTime) });
});

// Gestion du mode hors ligne
window.addEventListener('online', function() {
    showNotification('Connexion rétablie', 'success');
});

window.addEventListener('offline', function() {
    showNotification('Connexion perdue - Mode hors ligne', 'error');
}); 