import React from 'react';
import { useHistory } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil';
import Page404 from '../../../components/error-page/Page404';
import Page403 from '../../../components/error-page/Page403';
import Page400 from '../../../components/error-page/Page400';
import Page500 from '../../../components/error-page/Page500';

// 애러 state를 가지고 있는 atom
interface IErrorStatus {
  isError: boolean;
  errorCode: '400' | '403' | '404' | '500' | 'unknown' | null;
}

const atomErrorStatus = atom<IErrorStatus>({
  key: 'ErrorStatus',
  default: {
    isError: false,
    errorCode: null,
  },
});
// atom 애러 state에 의해 error페이지를
// 랜더링하는 render props
const ErrorHandler: React.FC<{}> = ({ children }) => {
  const history = useHistory();
  const [errorStatus, setErrorStatus] = useRecoilState(atomErrorStatus);

  React.useEffect(() => {
    const unlisten = history.listen(() =>
      setErrorStatus(() => ({ errorCode: null, isError: false })),
    );
    return unlisten;
  }, [history, setErrorStatus]);

  const renderContent = () => {
    if (errorStatus.errorCode === '400') return <Page400 />;
    if (errorStatus.errorCode === '403') return <Page403 />;
    if (errorStatus.errorCode === '404') return <Page404 />;
    if (errorStatus.errorCode === '500') return <Page500 />;
    if (errorStatus.isError) return <Page400 />;
    return children;
  };

  return <div>{renderContent()}</div>;
};

export { ErrorHandler, atomErrorStatus };
