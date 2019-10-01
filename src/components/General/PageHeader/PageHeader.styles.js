import { css } from 'linaria';
import { white } from '../../../constants/colors';

export const container = css`
  min-height: 60px;
  padding: 12px 24px;
  background-color: ${white};
`;

export const title = css`
  margin-bottom: 4px!important;
`;

export const children = css`
  position: relative;
`;

export const flexer = css`
  display: flex;
`;

export const mainContent = css`
  flex: 1;
`;
