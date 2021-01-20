import styled from 'styled-components';

export const Container = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;

  .title-favorite {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 2.4rem;
      font-weight: bold;
      text-transform: uppercase;
      flex: 1;
      padding-right: 2rem;
    }
  }

  p {
    margin-top: 3rem;
    color: var(--text-color-secondary);
  }

  .amount-comic-movie {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 3rem;

    dl {
      display: flex;
      flex-direction: column;
      flex: 1;
      font-size: 1.2rem;

      dt {
        font-weight: bold;
      }

      dd {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 1.6rem;
        height: 3.2rem;

        svg {
          margin-right: 1rem;
        }
      }
    }
  }

  .rate-last-comic {
    width: 100%;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 1.2rem;
      margin-top: 4rem;

      & + div {
        margin-top: 3rem;
      }

      strong {
        font-weight: bold;
        margin-right: 1.4rem;
      }
    }
  }

  @media (max-width: 880px) {
    width: 100%;
  }
`;
