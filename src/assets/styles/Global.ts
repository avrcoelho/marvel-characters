import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary-color: #FF1510;
    --secondary-color: #FDECEC;
    --green-color: #E7F6E7;
    --title-color: #404040;
    --text-color-primary: #404040;
    --text-color-secondary: #B9B9B9;

    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #fff;
    color: var(--text-color-primary);
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-family: sans-serif;
    font-size: 1.6rem;
  }
  h1,h2,h3,h4,h5,h5, strong{
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }
`;
