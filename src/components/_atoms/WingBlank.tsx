import React from "react";

const WingBlank: React.FC = ({ children }) => {
  return (
    <div
      style={{
        padding: "0px 2.8rem",
      }}
    >
      {children}
    </div>
  );
};

export default WingBlank;
