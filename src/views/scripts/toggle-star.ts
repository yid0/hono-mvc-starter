  export async function toggleStar(button) {
        try {
            button.disabled = true;
            const response = await fetch('/star', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            
            const starCount = document.getElementById('starCount');
            const currentCount = parseInt(starCount.textContent);
            
            if (data.starred) {
                button.classList.remove('btn-outline-light');
                button.classList.add('btn-light');
                starCount.textContent = currentCount + 1;
            } else {
                button.classList.remove('btn-light');
                button.classList.add('btn-outline-light');
                starCount.textContent = Math.max(0, currentCount - 1);
            }
        } catch (error) {
            console.error('Error toggling star:', error);
        } finally {
            button.disabled = false;
        }
    }