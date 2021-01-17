import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  max-width: 96rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.8rem auto 0;
  padding: 0 2rem;

  .title {
    color: var(--title-color);
    text-transform: uppercase;
    font-size: 2.8rem;
    font-weight: bold;
    text-align: center;
  }

  .text {
    width: 100%;
    max-width: 500px;
    font-size: 1.6rem;
    margin-top: 1.2rem;
    line-height: 1.7;
    text-align: center;
  }

  @media (max-width: 720px) {
    .title {
      font-size: 2.4rem;
    }
  }
`;
