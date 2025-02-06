import { html } from 'hono/html';

export const aboutPage = () => html`
  <section>
    <h2>A propos de nous</h2>
    <p>Ceci est la page à propos de nous.</p>
    <a href="/index">Retour à l'accueil</a>
  </section>
`