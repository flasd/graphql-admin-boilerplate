import { css } from 'linaria';
import { white, primaryColor } from '../../../constants/colors';

export const container = css`
  height: 60px;
  background-color: ${white};
  padding: 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1px;
`;

export const trigger = css`
  font-size: 20px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${primaryColor};
  }
`;

export const user = css`
  padding: 0 24px;
  cursor: pointer;
`;

export const userName = css`
  display: inline-block;
  padding-left: 8px;
`;
