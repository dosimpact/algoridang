import React, { CSSProperties } from 'react';

const WideLine: React.FC<{ style?: CSSProperties; [props: string]: any }> = ({
  children,
  style,
  ...props
}) => {
  return (
    <div
      style={{
        backgroundColor: '#EDEDED',
        width: '100%',
        height: '0.3rem',
        margin: '3rem 0rem',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default WideLine;
