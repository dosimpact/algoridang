import { IconFind } from 'assets/icons';
import { useClickOutside } from 'hooks/useClickOutside';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Corporation } from 'states/finance/interface/entities';
import useCorporations from 'states/finance/query/useCorporations';
import styled from 'styled-components';
import { createFuzzyMatcher, debouncing } from 'utils/funcs';

/**
 * 종목을 검색하는 컴포넌트
 */

type SearchOnSuccessEvent = {
  ticker: string;
  corp_name: string;
  corporation: Corporation;
  corporations: Corporation[];
};

interface ITickerFuzzySearch {
  // 종목 검색 성공시 콜백
  onSuccess?: (e: SearchOnSuccessEvent) => void;
  // 종목 검색 결과 클릭시 콜백
  onSelect?: (e: SearchOnSuccessEvent) => void;
  // 종목 검색 후 앤터를 눌렀을때 콜백
  onKeyDownEnter?: (
    e: React.KeyboardEvent<HTMLInputElement>,
    data?: SearchOnSuccessEvent,
  ) => void;
}

const TickerFuzzySearch: React.FC<ITickerFuzzySearch> = ({
  onSuccess,
  onSelect,
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

  const { register, setValue, control, formState } = useForm<{
    term: string;
  }>({ defaultValues: { term: '' } });
  const term = useWatch({ control, name: 'term' });

  useEffect(() => {
    if (filteredCorps && filteredCorps?.length >= 1 && onSuccess) {
      onSuccess({
        corp_name: filteredCorps[0].corp_name,
        ticker: filteredCorps[0].ticker,
        corporation: filteredCorps[0],
        corporations: filteredCorps,
      });
    }
    return () => {};
  }, [filteredCorps, onSuccess]);

  useEffect(() => {
    const sliceEnd = 6;
    const reg = createFuzzyMatcher(term);
    const result = corps
      ?.filter((corp) => reg.test(corp.corp_name))
      .slice(0, sliceEnd);

    setFilteredCorps(result || []);

    const markeds = corps
      ?.filter((corp) => reg.test(corp.corp_name))
      .slice(0, sliceEnd)
      .map((corp) => {
        const tmp = corp.corp_name.replace(reg, (match, ...groups) => {
          const letters = groups.slice(0, -2);
          let lastIndex = 0;
          let highlited: string[] = [];
          for (let i = 0, l = letters.length; i < l; i++) {
            const idx = match.indexOf(letters[i], lastIndex);
            highlited.push(match.substring(lastIndex, idx));
            highlited.push(`<strong>${letters[i]}</strong>`);
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

  // 현재 컴포넌트의 안과 밖
  const searchInnerRef = useRef<HTMLDivElement>(null);
  // 드랍 다운 메뉴 보이는 것 유무
  const [isShowDropdown, setIsShowDropdown] = useState(true);
  //
  useClickOutside<HTMLDivElement>(searchInnerRef, () => {
    setIsShowDropdown(false);
  });

  return (
    <STickerFuzzySearch>
      <div ref={searchInnerRef}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="tickerInput"
            type="text"
            placeholder="기업명을 입력해주세요"
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
            onClick={() => {
              setIsShowDropdown(true);
            }}
          ></input>
        </form>
        <div className="dropdownWrapper">
          <DropdownResult
            filteredCorps={filteredCorps}
            corpsNameMarked={corpsNameMarked}
            onSelect={(corp) => {
              if (corp && filteredCorps && filteredCorps?.length >= 1) {
                setIsShowDropdown((prev) => !prev);
                if (onSuccess)
                  onSuccess({
                    corp_name: corp.corp_name,
                    ticker: corp.ticker,
                    corporation: filteredCorps[0],
                    corporations: filteredCorps,
                  });
                if (onSelect)
                  onSelect({
                    corp_name: corp.corp_name,
                    ticker: corp.ticker,
                    corporation: corp,
                    corporations: filteredCorps,
                  });
              }
            }}
            isShow={isShowDropdown}
          />
        </div>
      </div>
    </STickerFuzzySearch>
  );
};

export default TickerFuzzySearch;

const STickerFuzzySearch = styled.section`
  /* margin-top: 3rem; */
  width: 100%;
  .tickerInput {
    border-radius: 9px;
    width: 100%;
    height: 4.6rem;
    /* border: ${(props) => props.theme.Border}; */
    padding: 1.5rem 2.8rem;
    background: rgba(255, 255, 255, 0.53);
    border-radius: 9px;
    font-size: 1.3rem;
    ${(props) => props.theme.shadowLine1};
  }
  input::placeholder {
    color: rgba(122, 122, 122, 0.67);
  }
  .dropdownWrapper {
    position: relative;
  }
`;

const DropdownResult: React.FC<{
  filteredCorps: Corporation[];
  corpsNameMarked: string[];
  onSelect?: (corp: Corporation) => void;
  isShow: boolean;
}> = ({ filteredCorps, corpsNameMarked, onSelect, isShow }) => {
  const handleSelected = (corp: Corporation) => {
    if (onSelect) onSelect(corp);
  };
  return (
    <SDropdownResult isShow={isShow}>
      <div className="dropdownContainer">
        {corpsNameMarked.map((html, idx) => {
          return (
            <div
              key={idx}
              className="row"
              onClick={() => {
                handleSelected(filteredCorps[idx]);
              }}
            >
              <div className="icon">
                <IconFind />
              </div>
              <div className="content">
                <div
                  className="corpName"
                  dangerouslySetInnerHTML={{ __html: html }}
                ></div>
                <div className="corpCode">{filteredCorps[idx]?.ticker}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SDropdownResult>
  );
};
const SDropdownResult = styled.section<{ isShow: boolean }>`
  display: ${(props) => (props.isShow ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  z-index: 100;
  .dropdownContainer {
    z-index: 1000;
    background-color: white;
    cursor: pointer;
  }
  strong {
    color: ${(props) => props.theme.ColorMainRed};
  }
  .row {
    width: 100%;
    min-height: 4rem;
    display: flex;
    padding: 0.8rem 0rem;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.ColorMainLightGray};
    }
    .icon {
      margin: 0 1.5rem;
      svg {
        fill: #898989;
        width: 2rem;
      }
    }
    .content {
      .corpName {
        font-size: 1.5rem;
      }
      .corpCode {
        font-size: 1.2rem;
        line-height: 1.2rem;
        color: #717171;
      }
    }
  }
`;
