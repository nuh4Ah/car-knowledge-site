/* ========================================
   MODERN MOBILE MENU - JavaScript
   ======================================== */

(function() {
    'use strict';
    
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModernMenu);
    } else {
        initModernMenu();
    }
    
    function initModernMenu() {
        // Elements
        const menuToggle = document.querySelector('.modern-menu-toggle');
        const menuClose = document.querySelector('.menu-close');
        const menu = document.querySelector('.modern-mobile-menu');
        const backdrop = document.querySelector('.menu-backdrop');
        const dropdownToggles = document.querySelectorAll('.menu-dropdown-toggle');
        const menuLinks = document.querySelectorAll('.menu-subitem');
        
        if (!menuToggle || !menu || !backdrop) {
            console.warn('Modern menu elements not found');
            return;
        }
        
        // Toggle menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close button
        if (menuClose) {
            menuClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeMenu();
            });
        }
        
        // Backdrop click
        backdrop.addEventListener('click', function() {
            closeMenu();
        });
        
        // Dropdown toggles
        dropdownToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleDropdown(this);
            });
        });
        
        // Close menu when clicking links
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                setTimeout(closeMenu, 200);
            });
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close on window resize (desktop)
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768) {
                    closeMenu();
                    closeAllDropdowns();
                }
            }, 250);
        });
        
        // Close on orientation change
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                closeMenu();
                closeAllDropdowns();
            }, 100);
        });
        
        // Functions
        function toggleMenu() {
            const isOpen = menu.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        function openMenu() {
            menu.classList.add('active');
            backdrop.classList.add('active');
            menuToggle.classList.add('active');
            document.body.classList.add('menu-open');
            menuToggle.setAttribute('aria-expanded', 'true');
            
            // Focus first menu item
            setTimeout(function() {
                const firstItem = menu.querySelector('.menu-item');
                if (firstItem) {
                    firstItem.focus();
                }
            }, 400);
        }
        
        function closeMenu() {
            menu.classList.remove('active');
            backdrop.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Close all dropdowns when menu closes
            setTimeout(closeAllDropdowns, 400);
        }
        
        function toggleDropdown(toggle) {
            const parent = toggle.closest('.menu-item-with-dropdown');
            const isOpen = parent.classList.contains('active');
            const wasExpanded = toggle.getAttribute('aria-expanded') === 'true';
            
            // Close other dropdowns
            document.querySelectorAll('.menu-item-with-dropdown').forEach(function(item) {
                if (item !== parent) {
                    item.classList.remove('active');
                    const otherToggle = item.querySelector('.menu-dropdown-toggle');
                    if (otherToggle) {
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
            
            // Toggle current dropdown
            if (isOpen) {
                parent.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                parent.classList.add('active');
                toggle.setAttribute('aria-expanded', 'true');
                
                // Focus first subitem
                setTimeout(function() {
                    const firstSubitem = parent.querySelector('.menu-subitem');
                    if (firstSubitem) {
                        firstSubitem.focus();
                    }
                }, 400);
            }
        }
        
        function closeAllDropdowns() {
            document.querySelectorAll('.menu-item-with-dropdown').forEach(function(item) {
                item.classList.remove('active');
                const toggle = item.querySelector('.menu-dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
})();
