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
    z-index: 2;

    img {
      width: 100%;
      max-width: 40rem;
      height: auto;
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

export const CharacterNameBg = styled.span`
  width: 100%;
  color: white;
  opacity: 0.6;
  font-weight: bold;
  font-size: 25rem;
  text-transform: uppercase;
  position: absolute;
  top: 9.3rem;
  padding-left: 38rem;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding-left: 20rem;
  }

  @media (max-width: 620px) {
    top: 12.5rem;

    padding-left: 11rem;
    font-size: 15rem;
  }

  @media (max-width: 400px) {
    top: 13.5rem;

    padding-left: 11rem;
    font-size: 10rem;
  }
`;
