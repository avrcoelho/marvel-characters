import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 88rem;
  margin: 10rem auto;

  h2 {
    font-weight: bold;
    font-size: 2rem;
  }

  ul {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4rem;
    margin: 4rem 0;
  }
`;
