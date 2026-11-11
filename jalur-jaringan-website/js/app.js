/**
 * JalurJaringan - Accessible & Secure ES6 Interactive Logic
 * Compliant with WAI-ARIA Tab Panel Standards & OWASP Client Security Guidelines
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle Logic
    initMobileNav();

    // 2. Interactive Tabs Logic (Profesi Jaringan)
    initProfesiTabs();

    // 3. Smooth Scroll Navigation
    initSmoothScroll();
});

/**
 * Mobile Navigation Handler
 */
function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            toggleBtn.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        }
    });
}

/**
 * Accessible Tab Handler for Profesi Section
 */
function initProfesiTabs() {
    const tabList = document.querySelector('[role="tablist"]');
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

    // Handle Click Event
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            activateTab(tab, tabs, panels);
        });
    });

    // Handle Keyboard Navigation (Arrow Right / Arrow Left / Home / End)
    tabList.addEventListener('keydown', (e) => {
        const currentIndex = tabs.indexOf(document.activeElement);
        if (currentIndex === -1) return;

        let targetIndex = null;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            targetIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
            targetIndex = 0;
        } else if (e.key === 'End') {
            targetIndex = tabs.length - 1;
        }

        if (targetIndex !== null) {
            e.preventDefault();
            tabs[targetIndex].focus();
            activateTab(tabs[targetIndex], tabs, panels);
        }
    });
}

/**
 * Activate selected tab and show matching panel
 */
function activateTab(selectedTab, tabs, panels) {
    const targetRole = selectedTab.getAttribute('data-role');

    // Update Tabs State
    tabs.forEach(tab => {
        const isSelected = tab === selectedTab;
        tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    // Update Panels Visibility
    panels.forEach(panel => {
        const isTarget = panel.id === `panel-${targetRole}`;
        if (isTarget) {
            panel.classList.remove('hidden');
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
            panel.classList.add('hidden');
        }
    });
}

/**
 * Smooth Scroll Setup with Active Header Link Highlight
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * XSS Security Helper Utility (Prevent Reflected XSS)
 */
function sanitizeText(str) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = str;
    return tempDiv.innerHTML;
}
