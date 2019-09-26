import { css } from 'linaria';
import { white, primaryColor, errorColor } from '../../../constants/colors';

export const container = css`
  height: 60px;
  background-color: ${white};
  padding: 0;
  display: flex;
  justify-content: space-between;
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

export const logoutTrigger = css`
 font-size: 20px;
  line-height: 64px;
  padding: 0 24px;
  padding-left: 0;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${errorColor};
  }
`;

export const logoutTooltip = css`
  & .ant-popover-message-title {
    padding-left: 0;
  }
`;
