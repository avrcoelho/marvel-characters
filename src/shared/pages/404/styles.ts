import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  padding: 10rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo-container {
    width: 100%;
    max-width: 30rem;
  }

  h1 {
    font-size: 5rem;
    text-align: center;
    margin-top: 2rem;
    font-weight: bold;
  }
`;
