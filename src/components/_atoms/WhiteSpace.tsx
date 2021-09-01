import React from "react";

const WhiteSpace: React.FC<{ marginV?: string }> = ({ children, marginV }) => {
  marginV = marginV || "2.8";
  return (
    <div
      style={{
        margin: `${marginV}rem 0rem`,
      }}
    >
      {children}
    </div>
  );
};

export default WhiteSpace;
