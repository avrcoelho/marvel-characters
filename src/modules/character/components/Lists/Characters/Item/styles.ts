import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  flex-direction: column;

  a {
    flex: 1;

    img {
      width: 20rem;
      height: 20rem;
      object-fit: cover;
      border-bottom: 0.3rem solid var(--primary-color);
    }
  }
`;
