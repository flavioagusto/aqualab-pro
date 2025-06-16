// ============== THEME MANAGEMENT ============== 
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.init();
    }

    init() {
        // Aplicar tema inmediatamente
        this.applyTheme(this.theme);
        this.setupToggle();
        
        // Esperar a que se carguen los iconos
        setTimeout(() => {
            this.updateToggleIcon();
        }, 200);
    }

    applyTheme(theme) {
        this.theme = theme;
        const html = document.documentElement;
        
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        
        localStorage.setItem('theme', theme);
    }

    toggle() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.updateToggleIcon();
        
        console.log('🌓 Theme changed to:', newTheme);
    }

    setupToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
            console.log('✅ Theme toggle setup complete');
        } else {
            console.warn('⚠️ Theme toggle button not found');
        }
    }

    updateToggleIcon() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) {
            console.warn('⚠️ Theme toggle button not found for icon update');
            return;
        }

        const sunIcon = toggle.querySelector('[data-lucide="sun"]');
        const moonIcon = toggle.querySelector('[data-lucide="moon"]');
        
        if (sunIcon && moonIcon) {
            if (this.theme === 'dark') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
            console.log('🎨 Icons updated for theme:', this.theme);
        } else {
            console.warn('⚠️ Theme icons not found:', { sunIcon, moonIcon });
        }
    }
}

// ============== MOBILE NAVIGATION ============== 
class MobileNavigation {
    constructor() {
        this.toggle = document.getElementById('mobile-menu-toggle');
        this.menu = document.getElementById('mobile-menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.toggle && this.menu) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
            this.setupNavLinks();
            this.setupOutsideClick();
        }
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.menu.classList.toggle('hidden', !this.isOpen);
        this.toggle.setAttribute('aria-expanded', this.isOpen);
    }

    closeMenu() {
        this.isOpen = false;
        this.menu.classList.add('hidden');
        this.toggle.setAttribute('aria-expanded', false);
    }

    setupNavLinks() {
        const navLinks = this.menu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    setupOutsideClick() {
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.menu.contains(e.target) && 
                !this.toggle.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
}

// ============== SMOOTH SCROLLING & NAVIGATION ============== 
class SmoothScrolling {
    constructor() {
        this.headerHeight = 64;
        this.init();
    }

    init() {
        this.setupScrollLinks();
        this.setupScrollSpy();
        this.setupHeaderScroll();
    }

    setupScrollLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.scrollToElement(target);
                }
            });
        });
    }

    scrollToElement(element) {
        const targetPosition = element.offsetTop - this.headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            root: null,
            rootMargin: `-${this.headerHeight}px 0px -50% 0px`,
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavLink(id, navLinks);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink(activeId, navLinks) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('text-foreground', 'font-semibold');
                link.classList.remove('text-muted-foreground');
            } else {
                link.classList.remove('text-foreground', 'font-semibold');
                link.classList.add('text-muted-foreground');
            }
        });
    }

    setupHeaderScroll() {
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                header.classList.add('backdrop-blur-xl');
                header.style.background = 'oklch(var(--background) / 0.95)';
            } else {
                header.classList.remove('backdrop-blur-xl');
                header.style.background = 'oklch(var(--background) / 0.8)';
            }
        });
    }
}

// ============== ANIMATIONS ============== 
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupCounterAnimation();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupCounterAnimation() {
        const counters = document.querySelectorAll('[class*="text-3xl"]');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            if (counter.textContent.match(/\d+/)) {
                counterObserver.observe(counter);
            }
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const suffix = element.textContent.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / (target / increment)));

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }
}

// ============== FORM HANDLING ============== 
class FormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupRealTimeValidation();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        if (!this.validateForm(data)) {
            return;
        }

        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 mr-2 animate-spin"></i>Enviando...';
        submitBtn.disabled = true;

        try {
            await this.simulateSubmission(data);
            this.showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
            this.form.reset();
        } catch (error) {
            this.showNotification('Error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
        } finally {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    validateForm(data) {
        const requiredFields = ['nombre', 'email', 'servicio', 'mensaje'];
        
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                this.showNotification(`El campo ${field} es obligatorio.`, 'error');
                return false;
            }
        }

        if (!this.isValidEmail(data.email)) {
            this.showNotification('Por favor ingresa un email válido.', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldErrors(input);
            });
        });
    }

    validateField(input) {
        const value = input.value.trim();
        const isRequired = input.hasAttribute('required');
        
        if (isRequired && !value) {
            this.showFieldError(input, 'Este campo es obligatorio');
            return false;
        }
        
        if (input.type === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(input, 'Email inválido');
            return false;
        }
        
        this.clearFieldErrors(input);
        return true;
    }

    showFieldError(input, message) {
        this.clearFieldErrors(input);
        
        input.classList.add('border-destructive');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-destructive text-sm mt-1 field-error';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    clearFieldErrors(input) {
        input.classList.remove('border-destructive');
        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    async simulateSubmission(data) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Form submitted:', data);
        
        if (Math.random() > 0.1) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Network error'));
        }
    }

    showNotification(message, type = 'info') {
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
        
        const bgColors = {
            success: 'bg-green-500 text-white',
            error: 'bg-destructive text-destructive-foreground',
            info: 'bg-primary text-primary-foreground'
        };
        
        const icons = {
            success: 'check-circle',
            error: 'alert-circle',
            info: 'info'
        };
        
        notification.classList.add(...bgColors[type].split(' '));
        
        notification.innerHTML = `
            <div class="flex items-start space-x-3">
                <i data-lucide="${icons[type]}" class="w-5 h-5 mt-0.5 flex-shrink-0"></i>
                <div class="flex-1">
                    <p class="text-sm font-medium">${message}</p>
                </div>
                <button class="ml-2 text-current hover:opacity-70" onclick="this.parentElement.parentElement.remove()">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// ============== INITIALIZATION ============== 
class App {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Primero inicializar los iconos
            this.initializeLucideIcons();
            
            // Luego inicializar los componentes con pequeños delays
            setTimeout(() => {
                this.components.themeManager = new ThemeManager();
                console.log('✅ ThemeManager initialized');
            }, 100);
            
            setTimeout(() => {
                this.components.mobileNavigation = new MobileNavigation();
                this.components.smoothScrolling = new SmoothScrolling();
                this.components.animationManager = new AnimationManager();
                this.components.formManager = new FormManager();
                
                window.mobileNavigation = this.components.mobileNavigation;
                
                document.body.classList.add('loaded');
                
                console.log('✅ All components initialized successfully');
            }, 200);
            
        } catch (error) {
            console.error('❌ Error initializing website:', error);
        }
    }

    initializeLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        } else {
            setTimeout(() => {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 500);
        }
    }
}

// ============== START APPLICATION ============== 
const app = new App();

// ============== GLOBAL ERROR HANDLING ============== 
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
}); 