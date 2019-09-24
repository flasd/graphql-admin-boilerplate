import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import * as styles from './SocialButton.styles';

export default function SocialButton(props) {
  const {
    loading,
    onClick,
    disabled,
    provider,
  } = props;

  return (
    <Button
      block
      className={styles[provider]}
      loading={loading}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.buttonContainer}>
        <div>
          <Icon
            type={provider}
            theme={provider === 'facebook' ? 'filled' : ''}
          />
        </div>
        <div className={styles.buttonText}>Entrar com o Google</div>
      </div>
    </Button>
  );
}

SocialButton.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  provider: PropTypes.oneOf(['google', 'facebook']).isRequired,
};

SocialButton.defaultProps = {
  loading: false,
  disabled: false,
};
