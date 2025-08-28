// Code+ Website JavaScript
// Modern, responsive interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeSelector();
    initNavigation();
    initKeyboardNavigation();
    initScrollEffects();
    initContactForm();
    initScrollReveal();
    initSmoothScrolling();
    initBlogFunctionality();
    initRotatingText();
    initPopularTopics();
    initWhatsAppIntegration();
    initFooterInteractions();
    initBlogTopicSearch();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Prevent menu close when clicking inside menu
    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Active navigation highlight
    updateActiveNavigation();
    window.addEventListener('scroll', updateActiveNavigation);

    // Initialize keyboard navigation
    initKeyboardNavigation();
}

// Toggle mobile menu
function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
}

// Close mobile menu
function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Theme Selector functionality
function initThemeSelector() {
    const themeBtn = document.getElementById('theme-btn');
    const themeDropdown = document.getElementById('theme-dropdown');
    const themeIcon = document.getElementById('theme-icon');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Initialize theme with smart defaults
    initializeTheme();
    
    // Initialize keyboard shortcuts
    initThemeKeyboardShortcuts();
    
    // Toggle dropdown
    themeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        themeDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        themeDropdown.classList.remove('show');
    });
    
    // Close dropdown when scrolling
    window.addEventListener('scroll', function() {
        themeDropdown.classList.remove('show');
    });
    
    // Close dropdown when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            themeDropdown.classList.remove('show');
        }
    });
    
    // Prevent dropdown from closing when clicking inside
    themeDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Theme option selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
            localStorage.setItem('theme', theme);
            themeDropdown.classList.remove('show');
            
            // Show a subtle feedback message (optional)
            showThemeChangeNotification(theme);
        });
    });
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener(function() {
            if (localStorage.getItem('theme') === 'system') {
                updateThemeIcon();
                updateNavbarLogo();
            }
        });
    }
}

function setTheme(theme) {
    const themeBtn = document.getElementById('theme-btn');
    
    // Add loading state
    themeBtn.classList.add('theme-loading');
    
    // Apply theme with a small delay for better UX
    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon();
        updateNavbarLogo();
        updateActiveThemeOption(theme);
        
        // Remove loading state
        themeBtn.classList.remove('theme-loading');
        
        // Trigger a small animation to show the change
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
        
    }, 100);
}

function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        themeIcon.className = 'fas fa-moon';
    } else if (currentTheme === 'light') {
        themeIcon.className = 'fas fa-sun';
    } else {
        // System theme - show icon based on actual preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

function updateNavbarLogo() {
    const logoImg = document.querySelector('.logo-img');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (!logoImg) return;
    
    let isDarkTheme = false;
    
    if (currentTheme === 'dark') {
        isDarkTheme = true;
    } else if (currentTheme === 'system') {
        // Check system preference for system theme
        isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Update logo source with smooth transition
    const newSrc = isDarkTheme ? 'assets/images/logo-blanco.svg' : 'assets/images/logo.svg';
    
    // Check if we actually need to change the logo
    if (!logoImg.src.includes(newSrc)) {
        logoImg.style.opacity = '0';
        
        setTimeout(() => {
            logoImg.src = newSrc;
            logoImg.style.opacity = '1';
        }, 150);
    }
}

function updateActiveThemeOption(theme) {
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-theme') === theme) {
            option.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const aboutSection = document.getElementById('nosotros');
            if (aboutSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = aboutSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Scroll effects and animations
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Card hover effects
    const cards = document.querySelectorAll('.service-card, .about-card, .category-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Scroll reveal animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .about-card, .category-card, .contact-item');
    
    // Add reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                message: formData.get('message')
            };

            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }

            if (!isValidEmail(data.email)) {
                showNotification('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Reset form
                form.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('¡Gracias por tu mensaje! Te contactaremos pronto.', 'success');
                
                // Here you would typically send the data to your backend
                console.log('Form data:', data);
                
            }, 2000);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error styling while typing
                this.classList.remove('error');
            });
        });
    }
}

// Form validation helpers
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Remove previous error styling
    field.classList.remove('error');

    // Check required fields
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
    }

    // Add error styling if invalid
    if (!isValid) {
        field.classList.add('error');
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
    `;

    // Add notification to page
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Show subtle notification when theme changes
function showThemeChangeNotification(theme) {
    const themeNames = {
        'light': 'Tema Claro',
        'dark': 'Tema Oscuro',
        'system': 'Tema del Sistema'
    };
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.textContent = `${themeNames[theme]} activado`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--bg-primary);
        color: var(--text-dark);
        padding: 0.75rem 1rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--border-color);
        font-size: 0.9rem;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Add notification animations to CSS (inserted dynamically)
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
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
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Terminal simulation for Hero Section - Realistic large terminal
function initRotatingText() {
    const terminalCommand = document.querySelector('.terminal-command');
    const terminalOutput = document.querySelector('.terminal-output');
    const cursor = document.querySelector('.terminal-cursor');
    
    if (!terminalCommand || !terminalOutput || !cursor) return;
    
    // Terminal sessions with commands and realistic outputs
    const terminalSessions = [
        {
            command: 'aws ec2 describe-instances --query "Reservations[].Instances[]"',
            output: [
                { type: 'info', text: '┌─────────────────────────────────────────────────────┐' },
                { type: 'info', text: '│ InstanceId        │ State     │ Type      │ Uptime  │' },
                { type: 'info', text: '├─────────────────────────────────────────────────────┤' },
                { type: 'success', text: '│ i-0a1b2c3d4e5f6g7  │ running   │ t3.large  │ 45 days │' },
                { type: 'success', text: '│ i-0b2c3d4e5f6g7h8  │ running   │ t3.medium │ 45 days │' },
                { type: 'success', text: '│ i-0c3d4e5f6g7h8i9  │ running   │ t3.small  │ 45 days │' },
                { type: 'info', text: '└─────────────────────────────────────────────────────┘' },
                { type: 'success', text: '✅ Infrastructure Health: 99.9% uptime achieved' }
            ]
        },
        {
            command: 'terraform plan -out=production.tfplan',
            output: [
                { type: 'info', text: 'Refreshing Terraform state in-memory prior to plan...' },
                { type: 'info', text: 'Plan: 15 to add, 3 to change, 0 to destroy.' },
                { type: 'success', text: '+ aws_instance.web_server' },
                { type: 'success', text: '+ aws_security_group.app_sg' },
                { type: 'success', text: '+ aws_load_balancer.main_lb' },
                { type: 'warning', text: '~ aws_autoscaling_group.web_asg (update in-place)' },
                { type: 'success', text: '💰 Estimated cost reduction: 35% monthly savings' }
            ]
        },
        {
            command: 'kubectl get pods -o wide --all-namespaces',
            output: [
                { type: 'info', text: 'NAMESPACE     NAME                           STATUS    AGE' },
                { type: 'success', text: 'production    api-deployment-7c8d9f5b2-xyz   Running   12d' },
                { type: 'success', text: 'production    web-frontend-5f6g7h8i9-abc    Running   12d' },
                { type: 'success', text: 'production    database-primary-1a2b3c4d      Running   45d' },
                { type: 'success', text: 'monitoring    prometheus-server-9x8y7z6w     Running   30d' },
                { type: 'success', text: '🚀 Zero-downtime deployments: 100% success rate' }
            ]
        },
        {
            command: 'docker compose ps --format "table {{.Service}}\\t{{.Status}}\\t{{.Ports}}"',
            output: [
                { type: 'info', text: 'SERVICE        STATUS          PORTS' },
                { type: 'success', text: 'web-app        Up 45 days      0.0.0.0:80->8080/tcp' },
                { type: 'success', text: 'api-server     Up 45 days      0.0.0.0:3000->3000/tcp' },
                { type: 'success', text: 'database       Up 45 days      5432/tcp' },
                { type: 'success', text: 'redis-cache    Up 45 days      6379/tcp' },
                { type: 'success', text: 'nginx-proxy    Up 45 days      0.0.0.0:443->443/tcp' },
                { type: 'success', text: '⚡ Performance boost: 300% faster than previous setup' }
            ]
        },
        {
            command: 'ansible-playbook site.yml --limit production --check --diff',
            output: [
                { type: 'info', text: 'PLAY [Configure production servers] ***************' },
                { type: 'success', text: 'TASK [Update system packages] ************** ok: [web-01]' },
                { type: 'success', text: 'TASK [Deploy application] *************** changed: [web-01]' },
                { type: 'success', text: 'TASK [Restart services] ***************** ok: [web-01]' },
                { type: 'success', text: 'TASK [Verify application health] ******* ok: [web-01]' },
                { type: 'info', text: 'PLAY RECAP ************************************' },
                { type: 'success', text: '🔧 Automation success: 100% reliable deployments' }
            ]
        },
        {
            command: 'git log --oneline --graph --decorate -n 8',
            output: [
                { type: 'info', text: '* 2f8a9b1 (HEAD -> main, origin/main) feat: implement advanced monitoring' },
                { type: 'info', text: '* 1e7c8d4 fix: optimize database connection pooling' },
                { type: 'info', text: '* 9f3b2a6 feat: add microservices architecture' },
                { type: 'success', text: '* 7d1e4f8 perf: improve API response time by 60%' },
                { type: 'success', text: '* 5b9c3a2 feat: implement CI/CD pipeline automation' },
                { type: 'success', text: '* 3a7f1d9 fix: resolve critical security vulnerabilities' },
                { type: 'info', text: '* 8e4b6c1 docs: update deployment procedures' },
                { type: 'success', text: '👨‍💻 15+ years of enterprise-grade solutions delivered' }
            ]
        }
    ];
    
    let currentSessionIndex = 0;
    let currentCharIndex = 0;
    let isTypingCommand = true;
    let isDisplayingOutput = false;
    let currentOutputIndex = 0;
    let isPaused = false;
    
    function typeEffect() {
        if (isPaused) return;
        
        const currentSession = terminalSessions[currentSessionIndex];
        
        if (isTypingCommand) {
            // Typing command
            const command = currentSession.command;
            currentCharIndex++;
            const textToShow = command.substring(0, currentCharIndex);
            updateCommand(textToShow);
            
            if (currentCharIndex >= command.length) {
                // Finished typing command, start displaying output
                isTypingCommand = false;
                isDisplayingOutput = true;
                currentOutputIndex = 0;
                
                // Pause before showing output
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    displayOutput();
                }, 800);
                return;
            }
        }
        
        // Calculate typing speed with natural variation
        let baseSpeed = 60;
        
        // Add realistic delays for special characters
        const currentChar = currentSession.command[currentCharIndex - 1];
        if (currentChar === ' ') baseSpeed += 30;
        if (['.', ',', ':', ';', '!', '?', '|', '#', '-', '_'].includes(currentChar)) baseSpeed += 50;
        if (currentChar === '"' || currentChar === "'") baseSpeed += 100;
        
        // Add natural randomness
        const randomDelay = Math.random() * 30;
        
        setTimeout(typeEffect, baseSpeed + randomDelay);
    }
    
    function displayOutput() {
        if (isPaused) return;
        
        const currentSession = terminalSessions[currentSessionIndex];
        
        if (currentOutputIndex < currentSession.output.length) {
            const outputLine = currentSession.output[currentOutputIndex];
            addOutputLine(outputLine.text, outputLine.type);
            
            currentOutputIndex++;
            
            // Pause between output lines
            setTimeout(() => {
                displayOutput();
            }, 500);
        } else {
            // Finished displaying output, move to next session
            isPaused = true;
            setTimeout(() => {
                nextSession();
            }, 4000); // Display result for 4 seconds
        }
    }
    
    function nextSession() {
        // Clear terminal
        clearTerminal();
        
        // Move to next session
        currentSessionIndex = (currentSessionIndex + 1) % terminalSessions.length;
        currentCharIndex = 0;
        isTypingCommand = true;
        isDisplayingOutput = false;
        currentOutputIndex = 0;
        isPaused = false;
        
        // Start typing new command
        setTimeout(() => {
            typeEffect();
        }, 1000);
    }
    
    function updateCommand(text) {
        terminalCommand.textContent = text;
    }
    
    function addOutputLine(text, type = 'info') {
        const outputLine = document.createElement('div');
        outputLine.className = `terminal-output-line ${type}`;
        outputLine.textContent = text;
        terminalOutput.appendChild(outputLine);
        
        // Scroll to bottom
        const terminalBody = document.querySelector('.terminal-body');
        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }
    
    function clearTerminal() {
        terminalCommand.textContent = '';
        terminalOutput.innerHTML = '';
    }
    
    // Initialize terminal
    clearTerminal();
    
    // Start the terminal simulation
    setTimeout(() => {
        typeEffect();
    }, 2000); // Start after 2 seconds
    
    console.log('Terminal simulation for Hero Section initialized');
}

// Funcionalidad para los tags de temas populares del blog
function initPopularTopics() {
    const topicTags = document.querySelectorAll('.topic-tag');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    topicTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tags
            topicTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Filter blog posts based on category
            filterBlogPosts(category, blogPosts);
            
            // Show notification
            showNotification(`Mostrando artículos de: ${this.querySelector('span').textContent}`, 'info');
        });
    });
}

// Filter blog posts by category
function filterBlogPosts(category, blogPosts) {
    blogPosts.forEach(post => {
        const postCategory = post.querySelector('.post-category').textContent.toLowerCase();
        const categoryMapping = {
            'cloud': ['cloud computing', 'aws', 'azure', 'gcp'],
            'devops': ['devops education', 'devops', 'ci/cd'],
            'automation': ['infrastructure as code', 'automation', 'terraform'],
            'monitoring': ['monitoring', 'observability'],
            'security': ['security', 'seguridad'],
            'education': ['education', 'students', 'educación'],
            'troubleshooting': ['troubleshooting', 'debugging'],
            'performance': ['performance', 'optimization']
        };
        
        if (category === 'all' || categoryMapping[category]?.some(cat => 
            postCategory.includes(cat.toLowerCase()))) {
            post.style.display = 'block';
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        } else {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            setTimeout(() => {
                post.style.display = 'none';
            }, 300);
        }
    });
}

// Enhanced WhatsApp functionality
function initWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .whatsapp-float');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track WhatsApp click for analytics (placeholder)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'contact',
                    'event_label': 'whatsapp_button'
                });
            }
            
            // Add a small delay and animation for better UX
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add floating WhatsApp button show/hide on scroll
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 300) {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.visibility = 'visible';
        
            } else {
                whatsappFloat.style.opacity = '0';
                whatsappFloat.style.visibility = 'hidden';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Enhanced footer interactions
function initFooterInteractions() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
        
        // Track social media clicks
        link.addEventListener('click', function() {
            const platform = this.getAttribute('aria-label').toLowerCase();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'event_category': 'social_media',
                    'event_label': platform
                });
            }
        });
    });
}

// =====================================================
// Footer Animation y Mejoras - NUEVO
// =====================================================

// Initialize footer animations and interactions
function initFooterAnimations() {
    const footer = document.querySelector('.footer');
    
    // Footer scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    if (footer) {
        footerObserver.observe(footer);
    }
    
    // Enhanced social links interactions
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        // Add ripple effect on click
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size/2}px;
                top: ${e.clientY - rect.top - size/2}px;
                background: rgba(37, 99, 235, 0.3);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
            
            // Track social media clicks with enhanced analytics
            const platform = this.getAttribute('aria-label').toLowerCase();
            console.log(`Social click tracked: ${platform}`);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_interaction', {
                    'event_category': 'social_media',
                    'event_label': platform,
                    'social_network': platform.split(' ')[0],
                    'social_action': 'click',
                    'social_target': this.href
                });
            }
        });
        
        // Enhanced hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    // Footer stats counter animation
    const footerStats = document.querySelectorAll('.footer-stats span');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'statsFloat 2s ease-in-out infinite';
                entry.target.style.animationDelay = Math.random() * 2 + 's';
            }
        });
    }, { threshold: 0.5 });
    
    footerStats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Add CSS animation for ripple effect
function addRippleAnimation() {
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            @keyframes statsFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced footer quick links functionality
function initFooterQuickLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Enhanced smooth scroll with offset for navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 70;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                if (typeof window.CodePlusWebsite !== 'undefined' && 
                    window.CodePlusWebsite.updateActiveNavigation) {
                    window.CodePlusWebsite.updateActiveNavigation(targetId);
                }
                
                // Track internal navigation
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'internal_navigation', {
                        'event_category': 'footer_navigation',
                        'event_label': targetId
                    });
                }
            }
        });
    });
}

// Initialize all footer functionality
document.addEventListener('DOMContentLoaded', function() {
    addRippleAnimation();
    initFooterAnimations();
    initFooterQuickLinks();
});

// Export footer functions
if (typeof window.CodePlusWebsite !== 'undefined') {
    window.CodePlusWebsite.initFooterAnimations = initFooterAnimations;
    window.CodePlusWebsite.initFooterQuickLinks = initFooterQuickLinks;
}

// Initialize theme with smart defaults
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // First time visitor - use system preference or auto-detect
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('system');
        } else {
            setTheme('system'); // Default to system preference
        }
    }
}

// Add keyboard shortcuts for theme switching (accessibility)
function initThemeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Shift + T to toggle theme
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(nextTheme);
            localStorage.setItem('theme', nextTheme);
        }
    });
}

// Call initializeTheme on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initThemeKeyboardShortcuts();
});

// Blog functionality
function initBlogFunctionality() {
    // Initialize blog post interactions
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        // Add hover effects and interactions
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Click to expand/preview functionality
        const readMoreBtn = post.querySelector('.btn-read-more');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const postId = post.getAttribute('data-post');
                openBlogPost(postId);
            });
        }
    });
    
    // Initialize blog modal
    initBlogModal();
}

// Blog modal functionality
function initBlogModal() {
    const modal = document.getElementById('blog-modal');
    const modalBody = document.getElementById('blog-modal-body');
    
    // Close modal functionality
    window.closeBlogModal = function() {
        const modal = document.getElementById('blog-modal');
        const loader = document.getElementById('blog-modal-loader');
        
        // Remove content loaded state first
        modal.classList.remove('content-loaded');
        
        // Then hide modal
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset loader
            if (loader) {
                loader.style.display = 'none';
                loader.classList.remove('hide');
            }
        }, 200);
    };
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeBlogModal();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeBlogModal();
        }
    });
}

// Open blog post in modal
function openBlogPost(postId) {
    const modal = document.getElementById('blog-modal');
    const modalBody = document.getElementById('blog-modal-body');
    const loader = document.getElementById('blog-modal-loader');
    
    // Reset states
    modal.classList.remove('content-loaded');
    modalBody.innerHTML = '';
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show loader
    if (loader) {
        loader.style.display = 'block';
        loader.classList.remove('hide');
    }
    
    // Simulate loading time
    setTimeout(() => {
        loadBlogContent(postId, modal, modalBody, loader);
    }, 1000);
}

function loadBlogContent(postId, modal, modalBody, loader) {
    
    // Sample blog content - in a real implementation, this would fetch from a CMS or markdown files
    const blogContent = {
        'post-1': {
            title: 'Guía Completa: Migración a AWS sin Dolor de Cabeza',
            date: '15 Jun 2025',
            category: 'Cloud Computing',
            readTime: '15 min',
            content: `
                <div class="blog-article">
                    <h1>Guía Completa: Migración a AWS sin Dolor de Cabeza</h1>
                    <div class="article-meta">
                        <span class="article-date">15 de Junio, 2025</span>
                        <span class="article-category">Cloud Computing</span>
                        <span class="article-read-time">15 minutos de lectura</span>
                    </div>
                    
                    <div class="article-content">
                        <p>La migración a AWS es uno de los proyectos más importantes que puede emprender una empresa moderna. En esta guía, compartimos la metodología probada que hemos utilizado en más de 50 empresas chilenas.</p>
                        
                        <h2>¿Por qué migrar a AWS?</h2>
                        <p>Las empresas que migran correctamente a AWS experimentan:</p>
                        <ul>
                            <li><strong>Reducción de costos del 35-48%</strong> en el primer año</li>
                            <li><strong>Mejora en disponibilidad</strong> del 99.9% promedio</li>
                            <li><strong>Escalabilidad automática</strong> sin intervención manual</li>
                            <li><strong>Seguridad mejorada</strong> con compliance automático</li>
                        </ul>
                        
                        <h2>Metodología de Migración</h2>
                        <p>Nuestra metodología se basa en el framework AWS Well-Architected y nuestra experiencia práctica:</p>
                        
                        <h3>1. Evaluación y Planificación (2-3 semanas)</h3>
                        <p>Realizamos un assessment completo de la infraestructura actual, identificando:</p>
                        <ul>
                            <li>Dependencias entre aplicaciones</li>
                            <li>Requisitos de compliance y seguridad</li>
                            <li>Métricas de performance actuales</li>
                            <li>Costos operativos existentes</li>
                        </ul>
                        
                        <h3>2. Diseño de Arquitectura (1-2 semanas)</h3>
                        <p>Diseñamos la arquitectura target considerando:</p>
                        <ul>
                            <li>Patrón de migración óptimo (Rehost, Replatform, Refactor)</li>
                            <li>Servicios AWS más adecuados</li>
                            <li>Estrategia de red y seguridad</li>
                            <li>Plan de rollback</li>
                        </ul>
                        
                        <div class="code-block">
                            <h4>Ejemplo de configuración Terraform:</h4>
                            <pre><code># VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "main-vpc"
    Environment = var.environment
  }
}

# Auto Scaling Group
resource "aws_autoscaling_group" "app" {
  name                = "app-asg"
  vpc_zone_identifier = aws_subnet.private[*].id
  target_group_arns   = [aws_lb_target_group.app.arn]
  health_check_type   = "ELB"
  
  min_size         = 2
  max_size         = 10
  desired_capacity = 3
  
  tag {
    key                 = "Name"
    value               = "app-instance"
    propagate_at_launch = true
  }
}</code></pre>
                        </div>
                        
                        <h2>Casos de Éxito</h2>
                        <div class="case-study">
                            <h3>Fintech Chilena - Reducción 48% en costos</h3>
                            <p><strong>Situación inicial:</strong> Infraestructura on-premise con altos costos de mantenimiento y problemas de escalabilidad.</p>
                            <p><strong>Solución:</strong> Migración completa a AWS con arquitectura serverless y contenedores.</p>
                            <p><strong>Resultados:</strong></p>
                            <ul>
                                <li>48% reducción en costos operativos</li>
                                <li>99.99% uptime logrado</li>
                                <li>Deploy time reducido de 4 horas a 15 minutos</li>
                                <li>Compliance PCI-DSS automático</li>
                            </ul>
                        </div>
                        
                        <h2>Scripts y Herramientas</h2>
                        <p>Descarga nuestros scripts de migración probados en producción:</p>
                        <ul>
                            <li><a href="#">Migration Assessment Tool</a> - Evalúa tu infraestructura actual</li>
                            <li><a href="#">Cost Calculator</a> - Estima costos en AWS</li>
                            <li><a href="#">Terraform Templates</a> - Arquitecturas pre-configuradas</li>
                        </ul>
                        
                        <div class="cta-section">
                            <h3>¿Necesitas ayuda con tu migración?</h3>
                            <p>Nuestro equipo tiene experiencia comprobada en migraciones complejas. Conversemos sobre tu proyecto.</p>
                            <a href="#contacto" class="btn-primary">Solicitar Consultoría</a>
                        </div>
                    </div>
                </div>
            `
        },
        'post-2': {
            title: 'CI/CD para Estudiantes: De Cero a Héroe en 30 Días',
            date: '22 Jun 2025',
            category: 'DevOps Education',
            readTime: '25 min',
            content: `
                <div class="blog-article">
                    <h1>CI/CD para Estudiantes: De Cero a Héroe en 30 Días</h1>
                    <div class="article-meta">
                        <span class="article-date">22 de Junio, 2025</span>
                        <span class="article-category">DevOps Education</span>
                        <span class="article-read-time">25 minutos de lectura</span>
                    </div>
                    
                    <div class="article-content">
                        <p>Como estudiante de ingeniería o profesional junior, dominar CI/CD te dará una ventaja competitiva significativa en el mercado laboral. En este tutorial práctico, construiremos un pipeline completo desde cero.</p>
                        
                        <h2>¿Por qué CI/CD es tu diferenciador?</h2>
                        <p>Las empresas buscan profesionales que puedan:</p>
                        <ul>
                            <li><strong>Automatizar deployments</strong> - Reducir errores humanos</li>
                            <li><strong>Implementar testing automatizado</strong> - Garantizar calidad</li>
                            <li><strong>Gestionar infraestructura como código</strong> - Escalabilidad</li>
                            <li><strong>Monitorear aplicaciones</strong> - Detectar problemas proactivamente</li>
                        </ul>
                        
                        <h2>Proyecto Práctico: E-commerce con CI/CD</h2>
                        <p>Construiremos un e-commerce completo con:</p>
                        
                        <h3>Stack Tecnológico</h3>
                        <ul>
                            <li><strong>Frontend:</strong> React + TypeScript</li>
                            <li><strong>Backend:</strong> Node.js + Express</li>
                            <li><strong>Base de datos:</strong> PostgreSQL</li>
                            <li><strong>CI/CD:</strong> GitHub Actions</li>
                            <li><strong>Deployment:</strong> AWS (ECS + RDS)</li>
                            <li><strong>Monitoring:</strong> CloudWatch + Grafana</li>
                        </ul>
                        
                        <div class="week-plan">
                            <h3>Plan de 30 días</h3>
                            
                            <h4>Semana 1: Fundamentos</h4>
                            <ul>
                                <li>Día 1-2: Setup del proyecto y Git workflow</li>
                                <li>Día 3-4: Desarrollo del MVP backend</li>
                                <li>Día 5-7: Frontend básico y conexión API</li>
                            </ul>
                            
                            <h4>Semana 2: Testing y Automatización</h4>
                            <ul>
                                <li>Día 8-10: Unit tests y integration tests</li>
                                <li>Día 11-12: Setup de GitHub Actions</li>
                                <li>Día 13-14: Pipeline básico de CI</li>
                            </ul>
                            
                            <h4>Semana 3: Deployment y Infraestructura</h4>
                            <ul>
                                <li>Día 15-17: Containerización con Docker</li>
                                <li>Día 18-19: Setup de AWS infrastructure</li>
                                <li>Día 20-21: Pipeline de CD completo</li>
                            </ul>
                            
                            <h4>Semana 4: Monitoring y Optimización</h4>
                            <ul>
                                <li>Día 22-24: Implementar logging y monitoring</li>
                                <li>Día 25-26: Alertas y notificaciones</li>
                                <li>Día 27-30: Optimización y documentación</li>
                            </ul>
                        </div>
                        
                        <div class="code-block">
                            <h4>GitHub Actions Workflow ejemplo:</h4>
                            <pre><code>name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Build application
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Deploy to ECS
      run: |
        aws ecs update-service --cluster production --service ecommerce-app --force-new-deployment</code></pre>
                        </div>
                        
                        <h2>Recursos Gratuitos</h2>
                        <ul>
                            <li><a href="#">Repository Template</a> - Código base para empezar</li>
                            <li><a href="#">AWS Free Tier Guide</a> - Setup sin costos</li>
                            <li><a href="#">Testing Checklist</a> - Lista de verificación</li>
                            <li><a href="#">Deployment Playbook</a> - Guía paso a paso</li>
                        </ul>
                        
                        <div class="student-tip">
                            <h3>💡 Tip para Estudiantes</h3>
                            <p>Documenta todo tu proceso en un blog personal o LinkedIn. Los reclutadores valoran mucho ver el journey de aprendizaje y la capacidad de explicar conceptos técnicos.</p>
                        </div>
                        
                        <div class="cta-section">
                            <h3>¿Quieres mentoría personalizada?</h3>
                            <p>Ofrecemos sesiones de mentoría 1:1 para estudiantes. Revisamos tu código, optimizamos tu pipeline y te preparamos para entrevistas técnicas.</p>
                            <a href="#contacto" class="btn-primary">Solicitar Mentoría</a>
                        </div>
                    </div>
                </div>
            `
        },
        'post-3': {
            title: 'Terraform desde Cero: Infrastructure as Code para Empresas Chilenas',
            date: '28 Jun 2025',
            category: 'Infrastructure as Code',
            readTime: '20 min',
            content: `
                <div class="blog-article">
                    <h1>Terraform desde Cero: Infrastructure as Code para Empresas Chilenas</h1>
                    <div class="article-meta">
                        <span class="article-date">28 de Junio, 2025</span>
                        <span class="article-category">Infrastructure as Code</span>
                        <span class="article-read-time">20 minutos de lectura</span>
                    </div>
                    
                    <div class="article-content">
                        <p>Infrastructure as Code (IaC) con Terraform ha revolucionado cómo las empresas gestionan su infraestructura. En este case study real, mostramos cómo una fintech chilena logró un ROI del 340% en el primer año.</p>
                        
                        <h2>El Problema: Infraestructura Caótica</h2>
                        <p>Nuestra cliente, una fintech con 50+ empleados, enfrentaba:</p>
                        <ul>
                            <li><strong>4 horas promedio</strong> para provisionar un nuevo ambiente</li>
                            <li><strong>Inconsistencias</strong> entre desarrollo, staging y producción</li>
                            <li><strong>Errores manuales</strong> en configuraciones críticas</li>
                            <li><strong>Falta de auditoría</strong> en cambios de infraestructura</li>
                            <li><strong>Escalamiento lento</strong> durante picos de demanda</li>
                        </ul>
                        
                        <h2>La Solución: Terraform + GitOps</h2>
                        <p>Implementamos una solución completa basada en:</p>
                        
                        <h3>Arquitectura de la Solución</h3>
                        <ul>
                            <li><strong>Terraform Cloud</strong> para state management</li>
                            <li><strong>GitHub Actions</strong> para CI/CD de infraestructura</li>
                            <li><strong>Módulos reutilizables</strong> para diferentes ambientes</li>
                            <li><strong>Policy as Code</strong> con Sentinel</li>
                            <li><strong>Monitoreo automático</strong> de drift detection</li>
                        </ul>
                        
                        <div class="code-block">
                            <h4>Estructura del proyecto:</h4>
                            <pre><code>terraform-infrastructure/
├── environments/
│   ├── development/
│   ├── staging/
│   └── production/
├── modules/
│   ├── vpc/
│   ├── eks/
│   ├── rds/
│   └── monitoring/
├── policies/
│   └── security.sentinel
└── shared/
    ├── variables.tf
    └── outputs.tf</code></pre>
                        </div>
                        
                        <h3>Módulo VPC Ejemplo</h3>
                        <div class="code-block">
                            <pre><code># modules/vpc/main.tf
variable "environment" {
  description = "Environment name"
  type        = string
}

variable "cidr_block" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

resource "aws_vpc" "main" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "\${var.environment}-vpc"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# Public subnets
resource "aws_subnet" "public" {
  count = length(data.aws_availability_zones.available.names)

  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.cidr_block, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.environment}-public-\${count.index + 1}"
    Type = "public"
  }
}

# Private subnets
resource "aws_subnet" "private" {
  count = length(data.aws_availability_zones.available.names)

  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.cidr_block, 8, count.index + 10)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "\${var.environment}-private-\${count.index + 1}"
    Type = "private"
  }
}</code></pre>
                        </div>
                        
                        <h2>Resultados Impresionantes</h2>
                        <div class="results-grid">
                            <div class="result-card">
                                <h3>⚡ Velocidad</h3>
                                <p><strong>99% reducción</strong> en tiempo de provisioning</p>
                                <p>De 4 horas a 4 minutos</p>
                            </div>
                            
                            <div class="result-card">
                                <h3>💰 Costos</h3>
                                <p><strong>340% ROI</strong> en el primer año</p>
                                <p>Ahorro de $240k USD anuales</p>
                            </div>
                            
                            <div class="result-card">
                                <h3>🛡️ Seguridad</h3>
                                <p><strong>100% compliance</strong> automático</p>
                                <p>Zero configuraciones manuales</p>
                            </div>
                            
                            <div class="result-card">
                                <h3>📈 Escalabilidad</h3>
                                <p><strong>Auto-scaling</strong> inteligente</p>
                                <p>Sin intervención manual</p>
                            </div>
                        </div>
                        
                        <h2>Plan de Implementación</h2>
                        
                        <h3>Fase 1: Foundation (2 semanas)</h3>
                        <ul>
                            <li>Setup de Terraform Cloud</li>
                            <li>Creación de módulos base</li>
                            <li>Implementación en ambiente de desarrollo</li>
                        </ul>
                        
                        <h3>Fase 2: Automation (2 semanas)</h3>
                        <ul>
                            <li>GitOps workflow con GitHub Actions</li>
                            <li>Policy as Code con Sentinel</li>
                            <li>Testing automatizado de infraestructura</li>
                        </ul>
                        
                        <h3>Fase 3: Production (1 semana)</h3>
                        <ul>
                            <li>Migración de staging y producción</li>
                            <li>Monitoring y alertas</li>
                            <li>Training del equipo</li>
                        </ul>
                        
                        <div class="best-practices">
                            <h3>🏆 Mejores Prácticas Aprendidas</h3>
                            <ul>
                                <li><strong>Modularización:</strong> Crea módulos pequeños y reutilizables</li>
                                <li><strong>State Management:</strong> Nunca uses local state en producción</li>
                                <li><strong>Versionado:</strong> Pin versions de providers y módulos</li>
                                <li><strong>Testing:</strong> Implementa Terratest para validaciones</li>
                                <li><strong>Security:</strong> Usa Sentinel para policies automáticas</li>
                                <li><strong>Documentation:</strong> Documenta cada módulo y variable</li>
                            </ul>
                        </div>
                        
                        <div class="code-block">
                            <h4>GitHub Actions Workflow para Terraform:</h4>
                            <pre><code>name: Terraform CI/CD

on:
  push:
    branches: [main]
    paths: ['environments/**']
  pull_request:
    paths: ['environments/**']

jobs:
  terraform:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        environment: [development, staging, production]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
      with:
        terraform_version: 1.5.0
        cli_config_credentials_token: \${{ secrets.TF_API_TOKEN }}
    
    - name: Terraform Init
      run: terraform init
      working-directory: environments/\${{ matrix.environment }}
    
    - name: Terraform Plan
      run: terraform plan -no-color
      working-directory: environments/\${{ matrix.environment }}
    
    - name: Terraform Apply
      if: github.ref == 'refs/heads/main' && matrix.environment != 'production'
      run: terraform apply -auto-approve
      working-directory: environments/\${{ matrix.environment }}
    
    - name: Production Approval
      if: github.ref == 'refs/heads/main' && matrix.environment == 'production'
      uses: trstringer/manual-approval@v1
      with:
        secret: \${{ github.TOKEN }}
        approvers: devops-team
        minimum-approvals: 2</code></pre>
                        </div>
                        
                        <h2>Recursos para Empezar</h2>
                        <ul>
                            <li><a href="#">Terraform Starter Kit</a> - Módulos base para Chile</li>
                            <li><a href="#">Cost Calculator</a> - Calcula el ROI de tu implementación</li>
                            <li><a href="#">Migration Checklist</a> - Lista paso a paso</li>
                            <li><a href="#">Video Tutorial</a> - Implementación en vivo</li>
                        </ul>
                        
                        <div class="cta-section">
                            <h3>¿Listo para transformar tu infraestructura?</h3>
                            <p>Ayudamos a empresas chilenas a implementar Infrastructure as Code con resultados garantizados. Conversemos sobre tu proyecto.</p>
                            <a href="#contacto" class="btn-primary">Solicitar Consultoría Gratuita</a>
                        </div>
                    </div>
                </div>
            `
        }
    };
    
    const content = blogContent[postId];
    if (content) {
        // Hide loader with animation
        if (loader) {
            loader.classList.add('hide');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 400);
        }
        
        // Load content
        modalBody.innerHTML = content.content;
        
        // Trigger content loaded animation
        setTimeout(() => {
            modal.classList.add('content-loaded');
        }, 200);
        
        // Track blog post view (placeholder for analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'blog_post_view', {
                'event_category': 'Blog',
                'event_label': postId
            });
        }
    } else {
        // Handle error case
        if (loader) {
            loader.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #ef4444; margin-bottom: 1rem;"></i>
                    <p style="color: var(--text-gray);">No se pudo cargar el artículo</p>
                    <button onclick="closeBlogModal()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-blue); color: white; border: none; border-radius: 8px; cursor: pointer;">Cerrar</button>
                </div>
            `;
        }
    }
}

// Blog topic search functionality
function initBlogTopicSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar artículos...';
    searchInput.className = 'blog-search';
    
    // Add search input to blog section
    const blogHeader = document.querySelector('#blog .section-header');
    if (blogHeader) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'blog-search-container';
        searchContainer.appendChild(searchInput);
        blogHeader.appendChild(searchContainer);
    }
    
    // Search functionality
    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const blogPosts = document.querySelectorAll('.blog-post');
        const topicTags = document.querySelectorAll('.topic-tag');
        
        if (searchTerm === '') {
            // Show all posts and tags
            blogPosts.forEach(post => {
                post.style.display = 'block';
                post.style.opacity = '1';
            });
            topicTags.forEach(tag => {
                tag.style.display = 'flex';
                tag.style.opacity = '1';
            });
            return;
        }
        
        // Filter posts
        blogPosts.forEach(post => {
            const title = post.querySelector('.post-title').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            const category = post.querySelector('.post-category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                post.style.display = 'block';
                post.style.opacity = '1';
            } else {
                post.style.opacity = '0.3';
                post.style.transform = 'scale(0.95)';
            }
        });
        
        // Filter topic tags
        topicTags.forEach(tag => {
            const tagText = tag.querySelector('span').textContent.toLowerCase();
            
            if (tagText.includes(searchTerm)) {
                tag.style.display = 'flex';
                tag.style.opacity = '1';
            } else {
                tag.style.opacity = '0.3';
                tag.style.transform = 'scale(0.95)';
            }
        });
    }, 300));
}

// Keyboard navigation support
function initKeyboardNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // ESC key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
            hamburger.focus();
        }
    });

    // Tab trap in mobile menu
    const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });

    // Focus first link when menu opens
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (navMenu.classList.contains('active')) {
                    setTimeout(() => {
                        if (firstFocusable) firstFocusable.focus();
                    }, 300); // Wait for animation
                }
            }
        });
    });

    observer.observe(navMenu, {
        attributes: true,
        attributeFilter: ['class']
    });
}

// Enhanced debounce utility
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
