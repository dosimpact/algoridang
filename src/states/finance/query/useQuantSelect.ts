import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { financeApi } from 'states/api';
import {
  QuantSelectionInput,
  QuantSelectionLookupListOutput,
} from '../interface/dtos';

export const useQuantSelect = () => {
  const QSMutation = useMutation<
    AxiosResponse<QuantSelectionLookupListOutput>,
    AxiosError,
    QuantSelectionInput
  >('useQuantSelect', (body) => {
    return financeApi.POST.quantSelection(body);
  });
  return { QSMutation };
};
