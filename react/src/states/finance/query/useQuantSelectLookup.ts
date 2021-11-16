import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { financeApi } from 'states/api';
import {
  QuantSelectionLookupListOutput,
  QuantSelectionLookupTypeOutput,
} from '../interface/dtos';

export const useQuantSelectLookup = ({ index }: { index?: number }) => {
  const _index = index || 1;
  const QSLookupListQuery = useQuery<
    AxiosResponse<QuantSelectionLookupListOutput>,
    AxiosError,
    QuantSelectionLookupListOutput
  >(
    'QSLookupListQuery',
    () => {
      return financeApi.GET.quantSelectionLookupList();
    },
    { select: (data) => data.data },
  );

  const QSLookupTypeQuery = useQuery<
    AxiosResponse<QuantSelectionLookupTypeOutput>,
    AxiosError,
    QuantSelectionLookupTypeOutput
  >(
    'QSLookupTypeQuery',
    () => {
      return financeApi.GET.quantSelectionLookupType({ index: _index });
    },
    {
      select: (data) => data.data,
    },
  );

  return { QSLookupListQuery, QSLookupTypeQuery };
};
