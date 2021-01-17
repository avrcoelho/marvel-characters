import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .amount {
    font-size: 1.6rem;
    color: var(--text-color-secondary);
  }

  .toggle-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.4rem;
    color: var(--primary-color);

    .option {
      display: flex;
      flex-direction: row;
      align-items: center;

      svg {
        margin-right: 1rem;
      }
    }

    button {
      width: 5rem;
      height: 2.7rem;
      border: none;
      background: transparent;
      outline: none;
      margin: 0 2rem;
      padding: 0;
    }
  }

  @media (max-width: 680px) {
    .hidden-mobile {
      display: none;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    align-items: flex-start;

    .toggle-container {
      margin-left: auto;
      margin-bottom: 1.8rem;
    }
  }
`;
