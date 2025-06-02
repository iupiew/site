// Theme management module
(() => {
    // Theme utility functions
    const ThemeManager = {
        // Get preferred theme from localStorage or system preference
        getPreferredTheme: () => {
            const storedTheme = localStorage.getItem('prefTheme');
            if (storedTheme && ['dark', 'light'].includes(storedTheme)) {
                return storedTheme;
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? 'dark' 
                : 'light';
        },

        // Set theme and save preference
        setTheme: (theme) => {
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('prefTheme', theme);
            ThemeManager.updateButtonIcon(theme);
        },

        // Create SVG elements safely
        createButtonIcons: () => {
            const lightIcon = new Image();
            lightIcon.src = '/assets/light_mode.svg';
            lightIcon.alt = 'Light Mode';
            lightIcon.width = 24;
            lightIcon.height = 24;
            lightIcon.classList.add('theme-icon');

            const darkIcon = new Image();
            darkIcon.src = '/assets/dark_mode.svg';
            darkIcon.alt = 'Dark Mode';
            darkIcon.width = 24;
            darkIcon.height = 24;
            darkIcon.classList.add('theme-icon');

            return { lightIcon, darkIcon };
        },

        // Update button icon
        updateButtonIcon: (theme) => {
            const button = document.getElementById('theme-button');
            if (!button) return;

            button.innerHTML = '';
            button.appendChild(
                theme === 'dark' 
                    ? ThemeManager.icons.lightIcon 
                    : ThemeManager.icons.darkIcon
            );
        },

        // Initialize theme manager
        init: () => {
            ThemeManager.icons = ThemeManager.createButtonIcons();
            const initialTheme = ThemeManager.getPreferredTheme();
            ThemeManager.setTheme(initialTheme);

            const button = document.getElementById('theme-button');
            if (button) {
                button.addEventListener('click', () => {
                    const currentTheme = document.body.getAttribute('data-theme');
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    ThemeManager.setTheme(newTheme);
                });
            }
        }
    };

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', ThemeManager.init);

    // Make available globally if needed
    window.ThemeManager = ThemeManager;
})();

