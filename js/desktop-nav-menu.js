/* ========================================
   DESKTOP NAVIGATION MENU - JavaScript
   ======================================== */

(function() {
    'use strict';
    
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDesktopNav);
    } else {
        initDesktopNav();
    }
    
    function initDesktopNav() {
        const dropdowns = document.querySelectorAll('.desktop-nav-dropdown');
        const dropdownToggles = document.querySelectorAll('.desktop-dropdown-toggle');
        
        if (!dropdownToggles.length) {
            return;
        }
        
        // Toggle dropdown on click
        dropdownToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const parent = this.closest('.desktop-nav-dropdown');
                const isActive = parent.classList.contains('active');
                
                // Close all dropdowns
                closeAllDropdowns();
                
                // Toggle current dropdown
                if (!isActive) {
                    parent.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.desktop-nav-dropdown')) {
                closeAllDropdowns();
            }
        });
        
        // Close dropdowns on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllDropdowns();
            }
        });
        
        // Close dropdowns when clicking dropdown items
        const dropdownItems = document.querySelectorAll('.desktop-dropdown-item');
        dropdownItems.forEach(function(item) {
            item.addEventListener('click', function() {
                closeAllDropdowns();
            });
        });
        
        // Close dropdowns on window resize (mobile)
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth <= 768) {
                    closeAllDropdowns();
                }
            }, 250);
        });
        
        // Close all dropdowns function
        function closeAllDropdowns() {
            dropdowns.forEach(function(dropdown) {
                dropdown.classList.remove('active');
                const toggle = dropdown.querySelector('.desktop-dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
})();
