import { Data } from '../../types';

export const feedBackComponent = (props: Data) : string => {
    const { feedbacks, page, totalPages } = props;
return`
<div class="card shadow-sm">
    <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">Fake Recent Feedbacks</h5>
        <small class="text-muted">Page ${page} of ${totalPages}</small>
    </div>
    <div class="card-body">
        <ul class="list-group list-group-flush">
            ${feedbacks.map((feedback: any) => `
                <li class="list-group-item">
                    <h6 class="mb-1 text-break">${feedback.name}</h6>
                    <p class="mb-1 text-muted text-break">${feedback.message}</p>
                </li>
            `).join('')}
        </ul>
        
        <div class="d-flex justify-content-center align-items-center gap-2 mt-3">
            ${page > 1 ? 
                `<button onclick="updateFeedbacks(${page-1})" class="btn btn-outline-primary btn-sm px-3">
                    Previous
                </button>` : 
                `<button class="btn btn-outline-primary btn-sm px-3" disabled>Previous</button>`
            }
            ${page < totalPages ? 
                `<button onclick="updateFeedbacks(${page+1})" class="btn btn-outline-primary btn-sm px-3">
                    Next
                </button>` : 
                `<button class="btn btn-outline-primary btn-sm px-3" disabled>Next</button>`
            }
        </div>
    </div>
</div>`
};