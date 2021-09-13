import React from 'react';
import { Icon } from 'antd-mobile';
import { useHistory } from 'react-router';

// todo refactor : headless components
const useBackButton = () => {
  const history = useHistory();

  // (1) 부모 컴포넌트의 history tag
  // (2) forword()
  const handleClick = () => {
    history.goBack();
  };
  const ButtonFC: () => React.ReactElement = () => {
    return (
      <Icon
        type="left"
        size="lg"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
    );
  };
  return ButtonFC;
};

export default useBackButton;
