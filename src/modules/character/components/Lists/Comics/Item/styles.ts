import styled from 'styled-components';

export const Container = styled.li`
  width: 8rem;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 10rem;
    object-fit: cover;
  }

  span {
    font-size: 1.2rem;
    margin-top: 1.8rem;
    font-weight: bold;
  }
`;
