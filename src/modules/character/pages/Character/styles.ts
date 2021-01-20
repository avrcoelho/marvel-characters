import styled from 'styled-components';

export const MainContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 6rem 2rem;
  background-color: var(--green-color);

  .content {
    width: 100%;
    max-width: 88rem;
    display: flex;
    justify-content: row;
    justify-content: space-between;

    img {
      width: 100%;
      max-width: 48rem;
      border-radius: 0.4rem;
    }
  }

  @media (max-width: 880px) {
    .content {
      flex-direction: column;

      img {
        margin: 4rem auto;
      }
    }
  }
`;
