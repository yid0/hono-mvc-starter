
export async function updateFeedbacks(page) {
    try {
        const response = await fetch(`/feedbacks?page=${page}`, {
            headers: {
                'Accept': 'text/html'            }
        });
        const html = await response.text();
        
        const feedbacksContainer = document.querySelector('.feedbacks .card');
        if (feedbacksContainer) {
            feedbacksContainer.outerHTML = html;
        } else {
            console.error('Feedback container not found');
        }
    } catch (error) {
        console.error(`Error updating feedbacks: ${error}`);
    }
}