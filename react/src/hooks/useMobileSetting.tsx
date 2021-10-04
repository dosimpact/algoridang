import React from 'react';

const useMobileSetting = () => {
  React.useEffect(() => {
    window.document.oncontextmenu = () => false;
    window.document.onselectstart = () => false;
    window.document.ondragstart = () => false;
    return () => {};
  }, []);

  return;
};

export default useMobileSetting;
