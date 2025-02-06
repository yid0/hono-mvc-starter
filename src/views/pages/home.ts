import { html } from 'hono/html'

export const homePage = () => html`
  <section>
    <h2>Bienvenue sur notre site</h2>
    <p>Ceci est la page d'accueil.</p>
    <a href="/about">En savoir plus</a>
  </section>
`
