import { css } from 'linaria';

export const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const card = css`
  min-width: 300px;
  max-width: 300px;
  animation: fadeInRight 200ms ease;

  @media (min-width: 768px) {
    min-width: 400px;
  }

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
