import { Data } from '../../types';
import { globaleStyles } from '../css/styles';
import { honoLogo } from '../images/hono-logo';
import { callApi } from '../scripts/call-api';
import { toggleStar } from '../scripts/toggle-star';
import { updateFeedbacks } from '../scripts/update-feedback';
import { feedBackComponent } from './feedback';
import { footer } from './footer';
import { healthComponent } from './health';
import { navbar } from './navbar';
export const layout = (data: Data) => {
  
  const {configuration, feedbacks, totalPages, page, starCount } = data;

return`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="${configuration.appDescription}">
    <meta name="keywords" content="Hon MVC example, TypeScript, API, Web Framework, Rate Limiting">
    <meta name="author" content="${configuration.author.fullName}">
    <meta name="creator" content="${configuration.author.fullName}">
    <meta name="publisher" content="${configuration.author.fullName}">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${configuration.appUrl}">
    <meta property="og:title" content="${configuration.appName}">
    <meta property="og:description" content="${configuration.appDescription}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${configuration.appUrl}">
    <meta property="twitter:title" content="${configuration.appName}">
    <meta property="twitter:description" content="${configuration.appDescription}">

    <!-- Canonical URL -->
    <link rel="canonical" href="${configuration.appUrl}">
    
    <title>${configuration.appName} - ${configuration.appDescription}</title>

    <!-- Bootstrap 5 CSS -->
    <link href="${configuration.bootstrap.cssUrl}" rel="stylesheet">
    <style>${globaleStyles}</style>
</head>
<body class="bg-light">
       ${navbar({
        configuration,
        starCount,
        honoLogo
       })}

    <div class="container mb-12">
        <div class="row mb-4">
            <div class="col">
                <h1 class="display-5 mb-3">Hono MVC</h1>
                <p class="lead text-muted">${configuration.appDescription}</p>
            </div>
        </div>

        <div class="row"> 
            <div class="col-md-6 mb-4">
                ${healthComponent({
                    healthUrl: '/health'
                })}
            </div>
            <div class="col-md-6 mb-4 feedbacks">
                ${feedBackComponent({
                    feedbacks,
                    totalPages,
                    page
                })}
            </div>
        </div>
    </div>
    
    ${footer({
        author: configuration.author
    })}

    <!-- Bootstrap 5 JS Bundle -->
    <script src="${configuration.bootstrap.jsUrl}"></script>
    <script>
        ${callApi.toString()}
        ${toggleStar.toString()}
        ${updateFeedbacks.toString()}                                     
    </script>
</body>
</html>`
}