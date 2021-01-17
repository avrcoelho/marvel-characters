import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 80rem;
  height: 6rem;
  border-radius: 3rem;
  background-color: var(--secondary-color);
  padding-left: 2.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  input {
    height: 100%;
    flex: 1;
    border: 0;
    color: var(--primary-color);
    font-size: 1.6rem;
    background-color: transparent;
    padding: 0 2rem;

    &::placeholder {
      color: var(--primary-color);
    }
  }
`;
