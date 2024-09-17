document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.sidebar-dropdown');
    const mainContentDiv = document.querySelector('.maincontent');

    // Toggle dropdowns
    dropdowns.forEach(dropdown => {
        const header = dropdown.querySelector('.section-title');
        const subsections = dropdown.querySelectorAll('.dropdown-subsection');

        header.addEventListener('click', function() {
            // Close all other dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });

            // Toggle the clicked dropdown
            dropdown.classList.toggle('active');
        });

        subsections.forEach(subsection => {
            subsection.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent this click from closing the dropdown
                const sectionId = this.getAttribute('data-section');
                const contentName = dropdown.getAttribute('data-content');
                loadContent(contentName, sectionId);
            });
        });
    });

    function loadContent(contentName, sectionId) {
        fetch(`./content/${contentName}.html`)
            .then(response => response.text())
            .then(htmlContent => {
                mainContentDiv.innerHTML = htmlContent;
                if (sectionId) {
                    scrollToSection(sectionId);
                }
            })
            .catch(error => {
                console.error('Error loading content:', error);
            });
    }

    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight; // Height of the header
            const offset = 45; // Adjust this value as needed
            const targetPosition = targetSection.offsetTop - headerHeight - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});
