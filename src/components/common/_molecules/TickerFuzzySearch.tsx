import { useClickOutside } from 'hooks/useClickOutside';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Corporation } from 'states/finance/interface/entities';
import useCorporation from 'states/finance/query/useCorporation';
import useCorporations from 'states/finance/query/useCorporations';
import styled from 'styled-components';
import { createFuzzyMatcher, debouncing } from 'utils/funcs';

/**
 * 종목을 검색하는 컴포넌트
 */

type SearchOnSuccessEvent = {
  ticker: string;
  corp_name: string;
  corporations: Corporation[];
};

interface ITickerFuzzySearch {
  // 종목 검색 성공시 콜백
  onSuccess?: (e: SearchOnSuccessEvent) => void;
  // 종목 검색 후 앤터를 눌렀을때 콜백
  onKeyDownEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TickerFuzzySearch: React.FC<ITickerFuzzySearch> = ({
  onSuccess,
  onKeyDownEnter,
}) => {
  // 기업 종목들의 리스트를 가져옵니다.
  const { GetCorporationsQuery } = useCorporations();
  // 이름만 추출
  const corps = useMemo(() => {
    return GetCorporationsQuery.data?.corporations;
  }, [GetCorporationsQuery]);
  // fuzzy search 결과 선별된 종목들
  const [filteredCorps, setFilteredCorps] = useState<Corporation[]>([]);
  // 종목에 mark 가 있는 HTML string
  const [corpsNameMarked, setCorpsNameMarked] = useState<string[]>([]);

  const { register, handleSubmit, setValue, control, formState } = useForm<{
    term: string;
  }>({ defaultValues: { term: '' } });
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

  useEffect(() => {
    const reg = createFuzzyMatcher(term);
    const result = corps?.filter((corp) => reg.test(corp.corp_name));
    setFilteredCorps(result || []);

    const markeds = corps
      ?.filter((corp) => reg.test(corp.corp_name))
      .map((corp) => {
        const tmp = corp.corp_name.replace(reg, (match, ...groups) => {
          const letters = groups.slice(0, -2);
          let lastIndex = 0;
          let highlited: string[] = [];
          for (let i = 0, l = letters.length; i < l; i++) {
            const idx = match.indexOf(letters[i], lastIndex);
            highlited.push(match.substring(lastIndex, idx));
            highlited.push(`<mark>${letters[i]}</mark>`);
            lastIndex = idx + 1;
          }
          return highlited.join('');
        });
        return tmp;
      });
    setCorpsNameMarked(markeds || []);
    return () => {};
  }, [term, corps, setFilteredCorps]);

  useEffect(() => {
    return () => {};
  }, [formState]);

  // todo : refactor : error 표시

  const searchInnerRef = useRef<HTMLDivElement>(null);
  useClickOutside<HTMLDivElement>(
    searchInnerRef,
    () => {
      console.log('click outside');
    },
    () => {
      console.log('click inside');
    },
  );

  return (
    <STickerFuzzySearch>
      <div ref={searchInnerRef}>
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
            {...register('term', { required: true })}
            onChange={debouncing((e: React.ChangeEvent<HTMLInputElement>) => {
              setValue('term', e.target.value);
            }, 100)}
            onKeyDown={debouncing(
              (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter' && onKeyDownEnter) {
                  onKeyDownEnter(e);
                  setValue('term', '');
                }
              },
              100,
            )}
          ></input>
        </form>
        {/* <div>{error && "error..."}</div> */}
        <div style={{ marginTop: '1rem' }}>
          {corporations?.length === 0 || isLoading
            ? '종목없음'
            : `검색 완료 : ${
                (corporations && corporations[0].corp_name) || ''
              }`}
        </div>
        <DropdownResult corpsNameMarked={corpsNameMarked} />
      </div>
    </STickerFuzzySearch>
  );
};

export default TickerFuzzySearch;

const STickerFuzzySearch = styled.section`
  /* margin-top: 3rem; */
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

const DropdownResult: React.FC<{
  corpsNameMarked: string[];
  onSelect?: (idx: number) => void;
}> = ({ corpsNameMarked, onSelect }) => {
  const handleSelected = (idx: number) => {
    if (onSelect) onSelect(idx);
  };
  return (
    <div>
      {corpsNameMarked.map((html, idx) => {
        return (
          <div
            onClick={() => {
              handleSelected(idx);
            }}
            key={idx}
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        );
      })}
    </div>
  );
};
