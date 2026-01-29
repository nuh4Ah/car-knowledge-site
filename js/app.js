/**
 * Car Knowledge Website - Interactive Features
 * Vanilla JavaScript ES6+ | No Dependencies
 */

(function() {
    'use strict';
    
    // Mobile Navigation Toggle
    const initMobileNav = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) return;
        
        menuToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
            menuToggle.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
            }
        });
    };
    
    // Smooth Scrolling
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (!target) return;
                
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.focus();
            });
        });
    };
    
    // Progress Tracking
    const initProgressTracking = () => {
        const pages = ['anatomy', 'systems', 'maintenance', 'warnings'];
        const currentPage = getCurrentPage();
        
        if (currentPage && pages.includes(currentPage)) {
            trackPageVisit(currentPage);
        }
        
        updateProgressBadge();
    };
    
    const getCurrentPage = () => {
        const path = window.location.pathname;
        const match = path.match(/(\w+)\.html/);
        return match ? match[1] : 'home';
    };
    
    const trackPageVisit = (pageName) => {
        try {
            const visited = JSON.parse(localStorage.getItem('carKnowledge_visited') || '[]');
            if (!visited.includes(pageName)) {
                visited.push(pageName);
                localStorage.setItem('carKnowledge_visited', JSON.stringify(visited));
            }
        } catch (e) {
            console.warn('localStorage not available:', e);
        }
    };
    
    const updateProgressBadge = () => {
        const badge = document.querySelector('.progress-badge .progress-text strong');
        if (!badge) return;
        
        try {
            const visited = JSON.parse(localStorage.getItem('carKnowledge_visited') || '[]');
            const totalPages = 4;
            const progress = Math.round((visited.length / totalPages) * 100);
            
            badge.textContent = `${progress}% Complete`;
            
            if (progress === 100) {
                badge.style.color = '#27AE60';
                badge.textContent = '✓ 100% Complete!';
            }
        } catch (e) {
            console.warn('localStorage not available:', e);
        }
    };
    
    // Initialize
    const init = () => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        initMobileNav();
        initSmoothScroll();
        initProgressTracking();
        
        console.log('🚗 Car Knowledge app initialized');
    };
    
    init();
})();