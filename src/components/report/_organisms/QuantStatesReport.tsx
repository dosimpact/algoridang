import React from 'react';
import Iframe from 'react-iframe';
import Axios from 'axios';
import { useQuery } from 'react-query';
const useCheckStatus = (URL: string) => {
  const checkStatusQuery = useQuery('useCheckStatus', () => {
    console.log('checkStatusQuery', URL);

    return Axios.get(URL);
  });
  return { checkStatusQuery };
};

const QuantStatesReport: React.FC<{ strategyCode: string }> = ({
  strategyCode,
}) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URI;
  const URL = `${SERVER_URL}backtests/${strategyCode}/quantstates-report`;
  const { checkStatusQuery } = useCheckStatus(URL);
  return (
    <>
      {checkStatusQuery.isError && <div>error</div>}
      <Iframe url={URL} width="100%" height="6200px" />
    </>
  );
};

export default QuantStatesReport;
