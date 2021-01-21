import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  max-width: 88rem;
  margin: 8rem auto 5rem;
  padding: 0 2rem;

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

  @media (max-width: 880px) {
    margin-top: 5rem;
  }
`;
