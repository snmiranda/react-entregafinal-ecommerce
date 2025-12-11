import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #ff6b6b; /* Vibrant Pet Shop Red/Pink */
    --secondary-color: #4ecdc4; /* Playful Teal */
    --background-color: #f7f9fc;
    --text-color: #2d3436;
    --white: #ffffff;
    --gray: #dfe6e9;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    -webkit-font-smoothing: antialiased;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;
