import { html } from 'hono/html';

export const header = (props) => html`
  <header>
    <h1>${props.title} </h1>
    <p>${props.description}</p> 
  </header>
` 