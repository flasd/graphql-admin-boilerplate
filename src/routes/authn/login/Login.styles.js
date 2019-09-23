import { css } from 'linaria';
import { lighten } from 'polished';
import { white, facebookBlue, googleBlue } from '../../../constants/colors';

export const subheader = css`
  font-weight: 500;
  position: relative;
  bottom: 14px;
  margin-bottom: 8px;
  display: block;
`;

export const buttonContainer = css`
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 100%;
  top: 5px;
  left: 0;
  padding-left: 12px;
`;

export const buttonText = css`
  flex: 1;
  text-align: center;
`;

export const googleButton = css`
  background-color: ${googleBlue};
  color: ${white};
  border-color: transparent;
  position: relative;
  text-align: right;

  &:hover, &:focus {
    background-color: ${lighten(0.1, googleBlue)};
    color: ${white};
    border-color: transparent;
  }
`;

export const facebookButton = css`
  background-color: ${facebookBlue};
  color: ${white};
  border-color: transparent;
  position: relative;
  text-align: right;

  &:hover, &:focus {
    background-color: ${lighten(0.1, facebookBlue)};
    color: ${white};
    border-color: transparent;
  }
`;

export const forgotPassword = css`
  margin-top: 18px;
  text-align: right;
`;

export const divider = css`
  margin: 16px 0 16px!important;
`;

export const dividerText = css`
  font-weight: 400;
  font-size: 14px;
  display: block;
`;
