import React from 'react';
import styles from './Button.module.css';
import LoadingSpinner from '../spinner/LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  enabled?: boolean;
  loading?: boolean;
  buttonText?: string;
  loadingText?: string;
  children?: React.ReactNode;
}

function Button({
  enabled = true,
  loading = false,
  buttonText,
  loadingText,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = loading || !enabled;

  let buttonClassName;
  if (isDisabled) {
    buttonClassName = styles.buttonDisabled;
  } else {
    buttonClassName = styles.buttonEnabled;
  } 

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', justifyContent: 'center' }}>

          <LoadingSpinner />

          {loadingText && <span>{loadingText}</span>}
        </div>
      );
    }

    return buttonText || children;
  };

  return (
    <button
      className={buttonClassName}
      disabled={isDisabled}
      {...rest}
    >
      {renderContent()}
    </button>
  );
}

export default Button;

