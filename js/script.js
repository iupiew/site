    (() => {
            window.site = {
                prefTheme: getPrefTheme(),
                setTheme: (name) => {
                    document.body.setAttribute('data-theme', name);
                    localStorage.setItem('prefTheme', name);
                    //updateButtonIcon(name);
                },
            };

            // Get preferred theme from localStorage or system preference
            function getPrefTheme() {
                const localPrefTheme = localStorage.getItem('prefTheme');
                return ['dark', 'light'].includes(localPrefTheme)
                    ? localPrefTheme
                    : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }

            // Set initial theme
            window.site.setTheme(window.site.prefTheme);
            const button = document.getElementById('theme-button');

            // Function to update the button icon based on the current theme
            const updateButtonIcon = (theme) => {
                button.innerHTML = theme === 'dark'
                    ? '<img src="../assets/light_mode.svg" alt="Light Mode" width="24" height="24">'
                    : '<img src="../assets/dark_mode.svg" alt="Dark Mode" width="24" height="24">';
            };

            // Set the initial button icon
            updateButtonIcon(window.site.prefTheme);

            // Add click event to toggle theme
            button.addEventListener('click', () => {
                const currentTheme = window.site.prefTheme;
                const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
                window.site.prefTheme = nextTheme; // Update current theme in the site object
                updateButtonIcon(nextTheme); // Update the icon immediately
                window.site.setTheme(nextTheme); // Update the theme
            });
        })();

