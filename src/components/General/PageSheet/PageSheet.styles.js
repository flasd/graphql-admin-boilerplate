import { css } from 'linaria';
import { white } from '../../../constants/colors';

export const container = css`
  padding: 24px;
  overflow: hidden;
`;

export const content = css`
  overflow-y: scroll;
  height: 100%;
  background-color: ${white};
  border-radius: 6px;
  padding: 24px;
`;
