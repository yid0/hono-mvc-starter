import { Data } from "../types";
import { html } from 'hono/html'

export const navbar = (props: Data) => html`
<html>
    <head>
    <meta charset="UTF-8">
    <title>${props.title}</title>
    <meta name="description" content="${props.description}">
    <head prefix="og: http://ogp.me/ns#">
    <meta property="og:type" content="article">
    <!-- More elements slow down JSX, but not template literals. -->
    <meta property="og:title" content="${props.title}">
    <meta property="og:image" content="${props.image}">
    </head>

    <body>
    ${props.children}
    ${footer(props)}
    </body>

</html>`

const footer = (props: Data) => html`

<footer>
    My footer
</footer>`;

