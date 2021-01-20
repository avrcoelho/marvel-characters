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

  .character-name-and-favorite {
    width: 20rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 1.6rem;
    margin-top: 1.8rem;
    font-weight: bold;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    button {
      margin-left: 2rem;
    }
  }
`;
