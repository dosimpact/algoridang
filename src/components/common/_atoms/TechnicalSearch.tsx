import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Corporation } from 'states/finance/interface/entities';
import useCorporation from 'states/finance/query/useCorporation';
import styled from 'styled-components';
import { debouncing } from 'utils/funcs';

interface ITechnicalSearchInput {
  term: string;
}
export type TechnicalSearchOnSuccessResult = {
  ticker: string;
  corp_name: string;
  corporations: Corporation[];
};
interface ITechnicalSearch {
  onSuccess?: (e: TechnicalSearchOnSuccessResult) => void;
  onKeyDownEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TechnicalSearch: React.FC<ITechnicalSearch> = ({
  onSuccess,
  onKeyDownEnter,
}) => {
  const { register, handleSubmit, setValue, control } =
    useForm<ITechnicalSearchInput>();
  const term = useWatch({ control, name: 'term' });
  const { corporations, isLoading, refetch } = useCorporation({
    term,
  });

  useEffect(() => {
    if (corporations && corporations?.length >= 1 && onSuccess) {
      onSuccess({
        corp_name: corporations[0].corp_name,
        ticker: corporations[0].ticker,
        corporations,
      });
    }
    return () => {};
  }, [corporations, onSuccess]);

  // todo : refactor : error 표시
  return (
    <STechnicalSearch>
      <form
        onSubmit={handleSubmit((data) => {
          refetch();
        })}
      >
        <input
          className="tickerInput"
          type="text"
          placeholder="매매전략 입력해주세요"
          autoComplete="off"
          {...register('term', { required: true })}
          onChange={debouncing((e: React.ChangeEvent<HTMLInputElement>) => {
            setValue('term', e.target.value);
          }, 100)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onKeyDownEnter) {
              onKeyDownEnter(e);
            }
          }}
        ></input>
      </form>
      {/* <div>{error && "error..."}</div> */}
      <div style={{ marginTop: '1rem' }}>
        {corporations?.length === 0 || isLoading
          ? '종목없음'
          : `검색 완료 : ${(corporations && corporations[0].corp_name) || ''}`}
      </div>
      {/* {JSON.stringify(corporations, null, 2)} */}
    </STechnicalSearch>
  );
};

export default TechnicalSearch;

const STechnicalSearch = styled.section`
  margin-top: 3.7rem;
  width: 100%;
  .tickerInput {
    background: rgba(255, 255, 255, 0.53);
    /* box-shadow: 0px 0.3px 2px rgba(0, 0, 0, 0.25); */
    border-radius: 9px;
    width: 100%;
    height: 4.6rem;
    border: ${(props) => props.theme.Border};
    padding: 1.5rem 2.8rem;

    background: rgba(255, 255, 255, 0.53);
    box-shadow: 0px 0.3px 2px rgba(0, 0, 0, 0.25);
    border-radius: 9px;
    font-size: 1.3rem;
  }
  input::placeholder {
    color: rgba(122, 122, 122, 0.67);
  }
`;
