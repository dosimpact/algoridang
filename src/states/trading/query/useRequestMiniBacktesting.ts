// import { AxiosError, AxiosResponse } from 'axios';
// import { useMutation } from 'react-query';
// import { tradingApi } from 'states/api';
// import { BaseTradingStrategy } from '../interface/entities';

// export const useRequestMiniBacktesting = () => {
//   const RequestMiniBacktestingQuery = useMutation<
//     AxiosResponse<{
//       ok: boolean;
//       result: {
//         baseTradingStrategy: BaseTradingStrategy;
//         CAGR: string;
//         MDD: string;
//       }[];
//     }>,
//     AxiosError,
//     {
//       ticker: string;
//       body?: {
//         trading_strategy_name: string;
//       };
//     }
//   >(['RequestMiniBacktesting'], ({ ticker, body }) => {
//     return tradingApi.POST.__mockRequestMiniBacktesting(ticker, body);
//   });

//   return { RequestMiniBacktestingQuery };
// };

export {};
