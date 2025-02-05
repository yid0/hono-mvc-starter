
export async function updateFeedbacks(page) {
    try {
        const response = await fetch(`/feedbacks?page=${page}`, {
            headers: {
                'Accept': 'text/html'  // Demander explicitement du HTML
            }
        });
        const html = await response.text();
        
        // Cibler spécifiquement le contenu à mettre à jour
        const feedbacksContainer = document.querySelector('.feedbacks .card');
        if (feedbacksContainer) {
            feedbacksContainer.innerHTML = html;
        } else {
            console.error('Feedback container not found');
        }
    } catch (error) {
        console.error('Error updating feedbacks:', error);
    }
}