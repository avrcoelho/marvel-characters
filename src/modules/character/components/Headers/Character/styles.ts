import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 0 2rem;
  background-color: var(--green-color);

  .content {
    width: 100%;
    max-width: 96rem;

    .logo-container {
      width: 100%;
      max-width: 22.7rem;
    }
  }
`;
