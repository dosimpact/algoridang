import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Corporation } from "states/interface/finance/entities";
import useCorporation from "states/react-query/finance/useCorporation";
import styled from "styled-components";

interface ITickerSearchInput {
  term: string;
}

interface ITickerSearch {
  onSuccess?: (e: {
    ticker: string;
    corp_name: string;
    corporations: Corporation[];
  }) => void;
}

// todo : refactor : 뒤로가기 누르면 왜 검색이 되느지?..
const TickerSearch: React.FC<ITickerSearch> = ({ onSuccess }) => {
  const { register, handleSubmit, getValues } = useForm<ITickerSearchInput>();

  const { corporations, isLoading, refetch } = useCorporation({
    term: getValues("term") || "삼성전자",
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
    <STickerSearch>
      <form
        onSubmit={handleSubmit((data) => {
          refetch();
        })}
      >
        <input
          className="tickerInput"
          type="text"
          placeholder="코드,기업명을 입력해주세요"
          autoComplete="off"
          {...register("term", { required: true })}
        ></input>
      </form>
      <div>{isLoading && "loading..."}</div>
      {/* <div>{error && "error..."}</div> */}
      <div>
        {corporations?.length === 0
          ? "종목없음"
          : `검색 완료 : ${corporations && corporations[0].corp_name}`}
      </div>
      {/* {JSON.stringify(corporations, null, 2)} */}
    </STickerSearch>
  );
};

export default TickerSearch;

const STickerSearch = styled.section`
  margin: 1rem;
  .tickerInput {
    width: 100%;
    height: 4rem;
    border: ${(props) => props.theme.Border};
  }
`;
