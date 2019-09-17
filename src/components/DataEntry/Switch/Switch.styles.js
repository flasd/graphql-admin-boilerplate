import { css } from 'linaria';
import { red } from '../../../constants/colors';

export const required = css`
  color: ${red};
  position: relative;
  right: 3px;
`;

export const container = css`
  display: flex;
`;

export const flexedLabel = css`
  flex: 1;
  line-height: 26px;
`;
