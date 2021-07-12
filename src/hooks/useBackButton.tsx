import React from "react";
import { Icon } from "antd-mobile";
import { useHistory } from "react-router";

const useBackButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };
  const ButtonFC: () => React.ReactElement = () => {
    return (
      <Icon
        type="left"
        size="lg"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
    );
  };
  return ButtonFC;
};

export default useBackButton;
