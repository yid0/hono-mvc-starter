import { Context, Hono } from 'hono';
import { RoutesMap } from '../configuration/routes';
import { FeedBackService } from '../services/feedback.service';
import { StarService } from '../services/star.service';
import { Handler } from '../types';
import { footer } from '../views/home';
import { honoLogo } from '../views/hono-logo';
import { callApi } from '../views/scripts/call-api';
import { toggleStar } from '../views/scripts/toggle-star';
import { updateFeedbacks } from '../views/scripts/update-feedback';
import { globaleStyles } from '../views/styles';
import { HtmlSanitizer } from '../utils/sanitizer';

export class HomeController implements Handler {
    private starService!: StarService
    constructor(
        private readonly app: Hono, 
        private readonly feedbackService: FeedBackService,
       
    ) {

      
    }  

    async handle() : Promise<void>{      
        await this.renderMainPage();
        await this.getFeedbacks();    
        await this.checkStatus();
        await this.handleStarRoutes();
    }

    private async handleStarRoutes() {
        // Vérifier le statut de l'étoile
        this.app.get('/star/check', async (c) => {
            const identifier = c.req.header('cf-connecting-ip') || 
                             c.req.header('x-forwarded-for') || 
                             'unknown';
            
            const hasStarred = await this.starService.hasStarred(identifier);
            return c.json({ hasStarred });
        });

        // Toggle star endpoint
        this.app.post('/star', async (c) => {
            const identifier = c.req.header('cf-connecting-ip') || 
                             c.req.header('x-forwarded-for') || 
                             'unknown';
            
            const hasStarred = await this.starService.hasStarred(identifier);
            if (hasStarred) {
                await this.starService.removeStar(identifier);
                return c.json({ starred: false });
            } else {
                await this.starService.addStar(identifier);
                return c.json({ starred: true });
            }
        });
    }

    private async renderMainPage() {
        this.app.get(RoutesMap.home, async (c) => {

            this.starService = new StarService(
                c.configuration
             );

            const page = Number(c.req.query('page')) || 1;
            
            const [feedbacksData, starCount] = await Promise.all([
                this.feedbackService.findPaginated(page, 4),
                this.starService.getTotalStars()
            ]);

            const totalPages = Math.ceil(feedbacksData.total / 4);
            const feedbacks = feedbacksData.data;

            const html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    
                    <!-- SEO Meta Tags -->
                    <meta name="description" content="${c.configuration.appDescription}">
                    <meta name="keywords" content="Hono, MVC, TypeScript, API, Web Framework, Rate Limiting">
                    <meta name="author" content="${c.configuration.author || 'Hono MVC Team'}">
                    <meta name="robots" content="index, follow">
                    
                    <!-- Open Graph / Facebook -->
                    <meta property="og:type" content="website">
                    <meta property="og:url" content="${c.configuration.appUrl}">
                    <meta property="og:title" content="${c.configuration.appName}">
                    <meta property="og:description" content="${c.configuration.appDescription}">

                    <!-- Twitter -->
                    <meta property="twitter:card" content="summary_large_image">
                    <meta property="twitter:url" content="${c.configuration.appUrl}">
                    <meta property="twitter:title" content="${c.configuration.appName}">
                    <meta property="twitter:description" content="${c.configuration.appDescription}">

                    <!-- Canonical URL -->
                    <link rel="canonical" href="${c.configuration.appUrl}">
                    
                    <title>${c.configuration.appName} - ${c.configuration.appDescription}</title>

                    <!-- Bootstrap 5 CSS -->
                    <link href="${c.configuration.bootstrap.cssUrl}" rel="stylesheet">
                    <style>
                        ${globaleStyles}
                    </style>
                </head>
                <body class="bg-light">
                    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
                        <div class="container">
                            <div class="d-flex align-items-center">
                                ${honoLogo}
                            </div>
                            <a class="navbar-brand" href="#">${c.configuration.appName}</a>
                            <div class="d-flex align-items-center justify-content-between flex-grow-1 ms-4">
                                <button 
                                    onclick="toggleStar(this)" 
                                    class="btn btn-outline-light"
                                    id="starButton">
                                    <svg height="16" width="16" class="me-2" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
                                    </svg>
                                    Star Project
                                    <span class="badge bg-light text-dark ms-2" id="starCount">${starCount}</span>
                                </button>
                                <a href=${c.configuration.author.githubUrl}
                                   class="btn btn-dark" 
                                   target="_blank" 
                                   rel="noopener noreferrer">
                                    <svg height="20" width="20" class="me-2" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                                    </svg>
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    </nav>

                    <div class="container">
                        <div class="row mb-4">
                            <div class="col">
                                <h1 class="display-5 mb-3">Hono MVC</h1>
                                <p class="lead text-muted">${c.configuration.appDescription}</p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="card shadow-sm">
                                    <div class="card-header bg-white">
                                        <h5 class="card-title mb-0">System Health Check</h5>
                                    </div>
                                    <div class="card card-body">
                                        <button class="btn btn-outline-primary mb-3" onclick="callApi('/health')">
                                            Check Health Status
                                        </button>
                                        <pre id="response" class="response border"></pre>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 mb-4">
                                <div class="feedbacks">  <!-- Déplacer la classe feedbacks ici -->
                                    <div class="card shadow-sm">
                                        <div class="card-header bg-white d-flex justify-content-between align-items-center">
                                            <h5 class="card-title mb-0">Fake Recent Feedbacks</h5>
                                            <small class="text-muted">Page ${page} of ${totalPages}</small>
                                        </div>
                                        <div class="card-body">
                                            <ul class="list-group list-group-flush">
                                                ${feedbacks.map((feedback: any) => `
                                                    <li class="list-group-item">
                                                        <h6 class="mb-1">${feedback.name}</h6>
                                                        <p class="mb-1 text-muted">${feedback.message}</p>
                                                    </li>
                                                `).join('')}
                                            </ul>
                                            
                                            <div class="d-flex justify-content-between mt-3">
                                                ${page > 1 ? 
                                                    `<button onclick="updateFeedbacks(${page-1})" class="btn btn-outline-primary btn-sm">
                                                        Previous
                                                    </button>` : 
                                                    `<button class="btn btn-outline-primary btn-sm" disabled>Previous</button>`
                                                }
                                                ${page < totalPages ? 
                                                    `<button onclick="updateFeedbacks(${page+1})" class="btn btn-outline-primary btn-sm">
                                                        Next
                                                    </button>` : 
                                                    `<button class="btn btn-outline-primary btn-sm" disabled>Next</button>`
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ${footer({
                        author: c.configuration.author
                    })}
                    <!-- Bootstrap 5 JS Bundle -->
                    <script src="${c.configuration.bootstrap.jsUrl}"></script>
                    <script>
                        ${callApi.toString()}
                        ${toggleStar.toString()}
                        ${updateFeedbacks.toString()}
                                     
                    </script>
                </body>
            </html>`;
            return c.html(html);
        });
    }
    private async  getFeedbacks() { 
        
        this.app.get(RoutesMap.feedbacks, async (c: Context) => {
            const page = Number(c.req.query('page')) || 1;
            const feedbacksData = await this.feedbackService.findPaginated(page, 4);
            
            const acceptHeader = c.req.header('Accept');
            if (acceptHeader?.includes('application/json')) {
                return c.json(feedbacksData);
            }

            const sanitizedData = feedbacksData.data.map(feedback => 
                HtmlSanitizer.sanitizeObject(feedback)
            );
            
            const totalPages = Math.ceil(feedbacksData.total / 4);
            
            return c.html(`
                <div class="card shadow-sm">
                    <div class="card-header bg-white d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0">Fake Recent Feedbacks</h5>
                        <small class="text-muted">Page ${page} of ${totalPages}</small>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            ${sanitizedData.map(feedback => `
                                <li class="list-group-item">
                                    <h6 class="mb-1">${feedback.name}</h6>
                                    <p class="mb-1 text-muted">${feedback.message}</p>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <div class="d-flex justify-content-between mt-3">
                            ${page > 1 ? 
                                `<button onclick="updateFeedbacks(${page-1})" class="btn btn-outline-primary btn-sm">
                                    Previous
                                </button>` : 
                                `<button class="btn btn-outline-primary btn-sm" disabled>Previous</button>`
                            }
                            ${page < totalPages ? 
                                `<button onclick="updateFeedbacks(${page+1})" class="btn btn-outline-primary btn-sm">
                                    Next
                                </button>` : 
                                `<button class="btn btn-outline-primary btn-sm" disabled>Next</button>`
                            }
                        </div>
                    </div>
                </div>
            `);
        });
    

    }
    private async checkStatus() {
            // Get the version of the application /health
            this.app.get(RoutesMap.health, (c: Context) => {
                console.log('Health check request received',);
                return c.json({ 
                    session: c.req.header('cookie').split(';')[0].split('=')[1],
                    requestId: c.req.header('cookie').split(';')[1].split('=')[1],
                    status: 'UP', 
                    appName: c.configuration.appName,
                    description: c.configuration.appDescription,
                    version: c.configuration.appVersion , 
                });
            });
    }
}
