/**
 * Calgary Trauma Resource Help - App Logic
 * Designed for offline PWA resilience.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Accordion Logic (The "Dropdowns")
    const resourceCards = document.querySelectorAll('.card');

    resourceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Find the panel immediately following the clicked button
            const panel = card.nextElementSibling;
            
            // Check current state
            const isOpen = panel.classList.contains('active');

            // Close all other panels for a clean UI (Optional)
            document.querySelectorAll('.content-panel').forEach(p => {
                p.classList.remove('active');
            });
            document.querySelectorAll('.card').forEach(c => {
                c.setAttribute('aria-expanded', 'false');
            });

            // If the clicked panel wasn't open, open it now
            if (!isOpen) {
                panel.classList.add('active');
                card.setAttribute('aria-expanded', 'true');
                
                // Scroll to the card slightly if it's off-screen
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 2. Automated "Last Updated" Date
    const lastModElement = document.getElementById('last-mod');
    if (lastModElement) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        lastModElement.textContent = today.toLocaleDateString(undefined, options);
    }

    // 3. Image Fallback Safety (Only if you still use <img> tags)
    const images = document.querySelectorAll('img[data-fallback-icon]');
    images.forEach(img => {
        img.onerror = function() {
            const iconClass = img.getAttribute('data-fallback-icon') || 'fa-circle-info';
            const iconHTML = `<i class="fa-solid ${iconClass}"></i>`;
            const parent = img.parentElement;
            if (parent) {
                parent.innerHTML = iconHTML;
            }
        };
        // Trigger if src is empty or placeholder
        if (!img.getAttribute('src') || img.getAttribute('src').includes('future')) {
            img.dispatchEvent(new Event('error'));
        }
    });
});