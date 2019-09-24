import { css } from 'linaria';

export const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const POP = css`
  animation: fadeInLeft 200ms ease;

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(-20px, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

export const PUSH = css`
  animation: fadeInRight 200ms ease;

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translate3d(20px, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

export const card = css`
  min-width: 300px;
  max-height: 548px;
  overflow: scroll;
  max-width: 300px;

  @media (min-height: 570px) {
    overflow: hidden;
    max-height: unset;
  }

  @media (min-width: 340px) {
    min-width: 320px;
  }

  @media (min-width: 375px) {
    min-width: 355px;
  }

  @media (min-width: 400px) {
    min-width: 380px;
  }

  @media (min-width: 425px) {
    min-width: 420px;
  }
`;
