import React from 'react';

const WingBlank: React.FC<{ [props: string]: any }> = ({
  children,
  ...props
}) => {
  return (
    <div
      style={{
        padding: '0px 1.8rem',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default WingBlank;
