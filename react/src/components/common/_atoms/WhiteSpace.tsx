import React from 'react';

const WhiteSpace: React.FC<{ marginV?: string; style?: React.CSSProperties }> =
  ({ children, marginV, style }) => {
    marginV = marginV || '1.4';
    return (
      <div
        style={{
          margin: `${marginV}rem 0rem`,
          width: '100%',
          height: '0.1rem',
          ...style,
        }}
      >
        {children}
      </div>
    );
  };

export default WhiteSpace;
