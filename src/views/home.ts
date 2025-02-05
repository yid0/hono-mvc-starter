import { Data } from "../types";
import { html } from 'hono/html'

export const footer = (props?: Data) => html`
<footer class="footer text-white py-3">
    <div class="container text-center">
        <span>Powered By ${props?.author.fullName} - ${props?.author.creationDate}</span><br/>
        <span>LinkedIn: 
            <a href="${props?.author.linkedInUrl}"
               class="text-white" 
               target="_blank" 
               rel="noopener noreferrer">
                ${props?.author.username || '@yid0'}
            </a>
        </span>
    </div>
</footer>`;

