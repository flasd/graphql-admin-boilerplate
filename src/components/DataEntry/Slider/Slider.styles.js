import { css } from 'linaria';
import { red } from '../../../constants/colors';

export const container = css`
  overflow: hidden;
`;

export const required = css`
  color: ${red};
  position: relative;
  right: 3px;
`;
