import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { financeApi } from 'states/api';
import {
  QuantSelectionInput,
  QuantSelectionLookupListOutput,
} from '../interface/dtos';

export const useQuantSelect = (body: QuantSelectionInput) => {
  const QSQuery = useQuery<
    AxiosResponse<QuantSelectionLookupListOutput>,
    AxiosError,
    QuantSelectionLookupListOutput
  >(
    'QSLookupListQuery',
    () => {
      return financeApi.POST.quantSelection(body);
    },
    { select: (data) => data.data },
  );

  return { QSQuery };
};
