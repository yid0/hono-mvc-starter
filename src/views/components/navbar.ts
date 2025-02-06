import { html } from 'hono/html';
import { Data } from "../../types";

export const navbar = (props: Data) =>  {
    const { configuration, starCount, honoLogo } = props;
    
return`
<nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
    <div class="container">
        <div class="d-flex align-items-center">
            ${honoLogo}
        </div>
        <a class="navbar-brand" href="#">${configuration.appName}</a>
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
            <a href=${configuration.author.githubUrl}
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
`
}
