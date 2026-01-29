/* ========================================
   MOBILE MENU FIX - Enhanced with search integration
   ======================================== */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;
        const searchOverlay = document.querySelector('.search-overlay');
        
        if (!menuToggle || !navMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }
        
        // CRITICAL: Force menu closed on page load
        forceCloseMenu();
        
        // Close menu when search opens
        if (searchOverlay) {
            const searchObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'class') {
                        if (searchOverlay.classList.contains('active')) {
                            forceCloseMenu();
                        }
                    }
                });
            });
            
            searchObserver.observe(searchOverlay, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
        
        // Toggle menu on button click
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking backdrop (body)
        body.addEventListener('click', function(e) {
            if (body.classList.contains('menu-open')) {
                // Check if click is outside menu and toggle button
                if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    closeMenu();
                }
            }
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && body.classList.contains('menu-open')) {
                closeMenu();
            }
        });
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(closeMenu, 200);
            });
        });
        
        // Close menu on window resize if it becomes desktop size
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768) {
                    forceCloseMenu();
                }
            }, 250);
        });
        
        // Force close on orientation change
        window.addEventListener('orientationchange', function() {
            setTimeout(forceCloseMenu, 100);
        });
        
        function toggleMenu() {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        function openMenu() {
            navMenu.classList.add('active');
            menuToggle.classList.add('active');
            body.classList.add('menu-open');
            menuToggle.setAttribute('aria-expanded', 'true');
            
            // Focus first menu item for accessibility
            const firstLink = navMenu.querySelector('a, button');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 300);
            }
        }
        
        function closeMenu() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
        
        function forceCloseMenu() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Extra force with inline styles
            if (window.innerWidth <= 768) {
                navMenu.style.right = '-100%';
                navMenu.style.visibility = 'hidden';
                navMenu.style.opacity = '0';
                
                // Remove inline styles after transition
                setTimeout(function() {
                    navMenu.style.right = '';
                    navMenu.style.visibility = '';
                    navMenu.style.opacity = '';
                }, 500);
            }
        }
    }
})();
