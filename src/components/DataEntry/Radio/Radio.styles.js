import { css } from 'linaria';
import { red } from '../../../constants/colors';

// eslint-disable-next-line import/prefer-default-export
export const required = css`
  color: ${red};
  position: relative;
  right: 3px;
`;

export const vertical = css`
  display: block;
  height: 30px;
  line-height: 30px;
`;
