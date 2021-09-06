import React from "react";

const WhiteSpace: React.FC<{ marginV?: string }> = ({ children, marginV }) => {
  marginV = marginV || "1.4";
  return (
    <div
      style={{
        margin: `${marginV}rem 0rem`,
        width: "100%",
        height: "0.1rem",
      }}
    >
      {children}
    </div>
  );
};

export default WhiteSpace;
