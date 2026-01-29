// ========================================
// CAR KNOWLEDGE SITE - INTERACTIVE JS
// All bugs fixed - Production Ready
// ========================================

// PAGE DETECTION FOR ACTIVE STATES (Fixed for Vercel clean URLs)
const setActiveNavigation = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const cleanPath = window.location.pathname.replace(/^\//g, '');
    
    const pageMapping = {
        'index.html': 'home',
        '': 'home',
        'index': 'home',
        'anatomy.html': 'anatomy',
        'anatomy': 'anatomy',
        'systems.html': 'systems',
        'systems': 'systems',
        'maintenance.html': 'maintenance',
        'maintenance': 'maintenance',
        'warnings.html': 'warnings',
        'warnings': 'warnings',
        'emergency.html': 'emergency',
        'emergency': 'emergency'
    };
    
    const activePage = pageMapping[currentPage] || pageMapping[cleanPath];
    
    document.querySelectorAll('.nav-menu a, .desktop-nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes(currentPage) || href.includes(cleanPath) || (activePage === 'home' && (href === '/' || href === 'index.html')))) {
            link.classList.add('active');
        }
    });
};

setActiveNavigation();

// 🔍 ENHANCED SEARCH SYSTEM WITH SMART KEYWORD MATCHING
const searchDatabase = [
    {
        title: 'Car Anatomy',
        url: 'anatomy.html',
        keywords: ['anatomy', 'parts', 'components', 'engine', 'battery', 'alternator', 'radiator', 'transmission', 'suspension', 'brakes', 'exhaust', 'fuel', 'air filter', 'spark plug', 'oil filter', 'belts', 'hoses', 'what is', 'where is', 'car parts'],
        icon: '🔧'
    },
    {
        title: 'How Systems Work',
        url: 'systems.html',
        keywords: ['systems', 'work', 'works', 'how', 'engine system', 'brake system', 'cooling system', 'electrical system', 'fuel system', 'transmission system', 'exhaust system', 'suspension system', 'steering', 'function', 'operation'],
        icon: '⚙️'
    },
    {
        title: 'Basic Maintenance',
        url: 'maintenance.html',
        keywords: ['maintenance', 'service', 'diy', 'oil change', 'tire', 'pressure', 'fluid', 'check', 'replace', 'routine', 'schedule', 'when to', 'how to change', 'inspection', 'care', 'upkeep'],
        icon: '🛞'
    },
    {
        title: 'Dashboard Warnings',
        url: 'warnings.html',
        keywords: ['warning', 'warnings', 'dashboard', 'light', 'lights', 'indicator', 'check engine', 'oil light', 'battery light', 'brake light', 'abs', 'airbag', 'temperature', 'what does', 'mean', 'symbols'],
        icon: '⚠️'
    },
    {
        title: 'Emergency Guide',
        url: 'emergency.html',
        keywords: ['emergency', 'help', 'flat tire', 'dead battery', 'overheating', 'breakdown', 'roadside', 'accident', 'stuck', 'won\'t start', 'tow', 'jump start', 'emergency kit', 'safety'],
        icon: '🚨'
    }
];

const performSearch = (query) => {
    if (!query || query.trim().length < 2) return [];
    
    const searchTerms = query.toLowerCase().trim().split(/\s+/);
    const results = [];
    
    searchDatabase.forEach(page => {
        let score = 0;
        let matchedKeywords = [];
        
        if (page.title.toLowerCase().includes(query.toLowerCase())) {
            score += 100;
            matchedKeywords.push(page.title);
        }
        
        searchTerms.forEach(term => {
            page.keywords.forEach(keyword => {
                if (keyword.includes(term)) {
                    score += 10;
                    if (!matchedKeywords.includes(keyword)) {
                        matchedKeywords.push(keyword);
                    }
                }
            });
        });
        
        if (score > 0) {
            results.push({
                ...page,
                score,
                matchedKeywords: matchedKeywords.slice(0, 3)
            });
        }
    });
    
    return results.sort((a, b) => b.score - a.score);
};

const displaySearchResults = (results, query) => {
    const resultsContainer = document.querySelector('.search-results');
    if (!resultsContainer) return;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results" style="padding: 20px; text-align: center;">
                <p style="font-size: 18px; margin-bottom: 10px;">😕 No results found for "<strong>${query}</strong>"</p>
                <p class="suggestion" style="color: var(--text-light);">Try: engine, brake, oil, warning lights, maintenance</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = results.map(result => `
        <a href="${result.url}" class="search-result-item" style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; text-decoration: none; color: inherit; transition: all 0.3s ease; margin-bottom: 8px;">
            <span class="result-icon" style="font-size: 24px;">${result.icon}</span>
            <div class="result-content" style="flex: 1;">
                <h4 style="color: var(--primary); font-size: 16px; margin-bottom: 4px;">${result.title}</h4>
                <p class="result-keywords" style="font-size: 13px; color: var(--text-light);">${result.matchedKeywords.join(', ')}</p>
            </div>
            <span class="result-arrow" style="color: var(--secondary); font-size: 20px; font-weight: bold;">→</span>
        </a>
    `).join('');
    
    document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.background = 'var(--bg-light)';
            item.style.transform = 'translateX(4px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
            item.style.transform = 'translateX(0)';
        });
    });
};

const createSearchOverlay = () => {
    if (document.querySelector('.search-overlay')) {
        return;
    }
    
    try {
        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';
        overlay.innerHTML = `
            <div class="search-container">
                <div class="search-header">
                    <h2>🔍 Search Car Topics</h2>
                    <button class="search-close" aria-label="Close search">✕</button>
                </div>
                <input 
                    type="search" 
                    class="search-overlay-input" 
                    placeholder="Type anything: engine, brake, oil, warning lights..." 
                    autofocus
                    autocomplete="off"
                >
                <div class="search-results" style="margin-top: 20px; max-height: 300px; overflow-y: auto;"></div>
                <div class="search-tips" style="margin-top: 20px; padding: 12px; background: var(--bg-light); border-radius: 8px;">
                    <p style="font-size: 14px; color: var(--text-light);"><strong>💡 Tips:</strong> Try keywords like "oil change", "check engine light", "flat tire", or "brake system"</p>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        setTimeout(() => overlay.classList.add('active'), 10);
        
        const searchInput = overlay.querySelector('.search-overlay-input');
        const closeBtn = overlay.querySelector('.search-close');
        
        const closeSearch = () => {
            overlay.classList.remove('active');
            setTimeout(() => {
                if (overlay && overlay.parentNode) {
                    overlay.remove();
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeSearch);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeSearch();
        });
        
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeSearch();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                const resultsContainer = overlay.querySelector('.search-results');
                resultsContainer.innerHTML = '';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                const results = performSearch(query);
                displaySearchResults(results, query);
            }, 300);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    const results = performSearch(query);
                    if (results.length > 0) {
                        window.location.href = results[0].url;
                    }
                }
            }
        });
    } catch (error) {
        console.error('Search overlay error:', error);
    }
};

const mobileSearchBtn = document.querySelector('.mobile-search-btn');
if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', createSearchOverlay);
}

const desktopSearch = document.querySelector('.nav-search input');
if (desktopSearch) {
    desktopSearch.addEventListener('focus', () => {
        desktopSearch.blur();
        createSearchOverlay();
    });
    
    desktopSearch.addEventListener('click', createSearchOverlay);
}

// FIXED: DROPDOWN MENUS - Removed duplicate touch listeners
const initDropdowns = () => {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle, .desktop-dropdown-toggle');
    
    if (dropdownToggles.length === 0) return;
    
    dropdownToggles.forEach((toggle) => {
        const parent = toggle.closest('li');
        if (!parent) return;
        
        const handleToggleClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            document.querySelectorAll('.nav-menu > li.dropdown-open, .desktop-nav-dropdown.dropdown-open').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('dropdown-open');
                    const otherToggle = item.querySelector('.dropdown-toggle, .desktop-dropdown-toggle');
                    if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                }
            });
            
            const isOpen = parent.classList.contains('dropdown-open');
            if (isOpen) {
                parent.classList.remove('dropdown-open');
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                parent.classList.add('dropdown-open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        };
        
        toggle.addEventListener('click', handleToggleClick);
        
        const isMobile = () => window.innerWidth <= 768;
        
        if (!isMobile()) {
            let hoverTimeout;
            
            parent.addEventListener('mouseenter', () => {
                if (!isMobile()) {
                    clearTimeout(hoverTimeout);
                    parent.classList.add('dropdown-open');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });
            
            parent.addEventListener('mouseleave', () => {
                if (!isMobile()) {
                    hoverTimeout = setTimeout(() => {
                        parent.classList.remove('dropdown-open');
                        toggle.setAttribute('aria-expanded', 'false');
                    }, 200);
                }
            });
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-menu > li, .desktop-nav-dropdown')) {
            document.querySelectorAll('.nav-menu > li.dropdown-open, .desktop-nav-dropdown.dropdown-open').forEach(item => {
                item.classList.remove('dropdown-open');
                const toggle = item.querySelector('.dropdown-toggle, .desktop-dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.nav-menu > li.dropdown-open, .desktop-nav-dropdown.dropdown-open').forEach(item => {
                item.classList.remove('dropdown-open');
                const toggle = item.querySelector('.dropdown-toggle, .desktop-dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });
        }
    });
};

initDropdowns();

// FIXED: 3D CAROUSEL - Removed unnecessary setTimeout
const init3DCarousel = () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));
    
    if (!track || slides.length === 0 || window.innerWidth <= 768) {
        return;
    }
    
    let currentIndex = 0;
    let autoPlayInterval;
    const totalSlides = slides.length;
    
    const updateCarousel = (index) => {
        currentIndex = index;
        const radius = 600;
        const angleStep = 360 / totalSlides;
        
        slides.forEach((slide, i) => {
            const offset = i - currentIndex;
            const absOffset = Math.abs(offset);
            
            const angle = offset * angleStep;
            const radian = (angle * Math.PI) / 180;
            
            const translateX = Math.sin(radian) * radius;
            const translateZ = offset === 0 ? 200 : (Math.cos(radian) * radius) - radius;
            const scale = offset === 0 ? 1 : 0.65;
            
            let opacity;
            if (absOffset === 0) opacity = 1;
            else if (absOffset === 1) opacity = 0.8;
            else if (absOffset === 2) opacity = 0.5;
            else opacity = 0.2;
            
            const zIndex = offset === 0 ? 100 : 50 - absOffset;
            
            slide.style.transform = `
                translate(-50%, -50%)
                translateX(${translateX}px)
                rotateY(${angle}deg)
                translateZ(${translateZ}px)
                scale(${scale})
            `;
            
            slide.style.opacity = opacity;
            slide.style.zIndex = zIndex;
            slide.style.pointerEvents = offset === 0 ? 'auto' : 'none';
            
            if (offset === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-selected', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.setAttribute('aria-selected', 'false');
            }
        });
    };
    
    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(newIndex);
    };
    
    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel(newIndex);
    };
    
    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            resetAutoPlay();
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            resetAutoPlay();
        });
    }
    
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(indicator.dataset.index);
            updateCarousel(index);
            resetAutoPlay();
        });
    });
    
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    };
    
    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };
    
    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };
    
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
        carouselWrapper.addEventListener('mouseleave', startAutoPlay);
    }
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });
        
        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            resetAutoPlay();
        }, { passive: true });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        }
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        }
    });
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768) {
                updateCarousel(currentIndex);
            }
        }, 250);
    });
    
    updateCarousel(0);
    startAutoPlay();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DCarousel);
} else {
    init3DCarousel();
}

const menuToggle = document.querySelector('.menu-toggle, .modern-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const body = document.body;

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        if (isExpanded) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
            document.querySelectorAll('.nav-menu > li.dropdown-open').forEach(item => {
                item.classList.remove('dropdown-open');
                const toggle = item.querySelector('.dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && !link.classList.contains('dropdown-toggle')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
            menuToggle.focus();
        }
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('card-animated')) {
            entry.target.classList.add('card-animated');
            entry.target.style.animation = 'cardSlideIn 0.6s ease-out forwards';
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/' && window.location.pathname !== '') {
    const cards = document.querySelectorAll(
        '.info-card, .system-card, .task-card, .warning-card, .part-card'
    );
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        scrollObserver.observe(card);
    });
}

const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 10) {
        nav?.classList.add('scrolled');
    } else {
        nav?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, { passive: true });

const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, { passive: true });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

const buttons = document.querySelectorAll('.cta-button');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = nav?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');

if (hero && heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px) scale(1.05)`;
        }
    }, { passive: true });
}

if (window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.benefit');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
    
    if (img.complete) {
        img.classList.add('loaded');
    }
});
