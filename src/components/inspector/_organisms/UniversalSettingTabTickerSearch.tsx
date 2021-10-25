import React from 'react';
import { TickerSearchOnSuccessResult } from 'components/common/_molecules/TickerSearch';
import { useRecoilState } from 'recoil';
import { Corporation } from 'states/finance/interface/entities';
import styled from 'styled-components';
import { RemoveMultipleElements } from 'utils/parse';
import produce from 'immer';
import WideLine from 'components/common/_atoms/WideLine';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import { Button } from 'components/common/_atoms/Buttons';
import TickerFuzzySearch from 'components/common/_molecules/TickerFuzzySearch';
import { atomUniversalSettingState } from 'states/common/recoil/dashBoard/dashBoard';

// UniversalSetting - TabTickerSearch
const UniversalSettingTabTickerSearch = () => {
  // 2. 종목관리 상태
  const [universalSettingState, setUniversalSettingState] = useRecoilState(
    atomUniversalSettingState,
  );
  // 2.1 삭제예정인 티커들
  const [willDelCorpIdxs, setWillDelCorpIdxs] = React.useState<Set<number>>(
    new Set(),
  );
  // 2.3 종목 삭제하기
  const handleWillDelTickerClick = () => {
    setUniversalSettingState((prev) => {
      const result = RemoveMultipleElements(
        prev.selected,
        Array.from(willDelCorpIdxs.values()),
      );
      // console.log(result);
      return { ...prev, selected: result };
    });
    // willDelCorpIdxs
    setWillDelCorpIdxs(new Set<number>());
  };

  // 3. 종목 검색 결과
  const [searchResultCorps, setSearchResultCorps] = React.useState<
    Corporation[]
  >([]);
  // 3.1 검색된 종목을 임시 저장
  const handleSearchedCorporations = React.useCallback(
    (e: TickerSearchOnSuccessResult) => {
      setSearchResultCorps(e.corporations);
    },
    [],
  );

  return (
    <SUniversalSettingTabTickerSearch>
      <WhiteSpace style={{ marginTop: '1rem' }} />
      <TickerFuzzySearch
        onSuccess={(e) => {
          handleSearchedCorporations(e);
        }}
        onSelect={(e) => {
          if (e) {
            setUniversalSettingState((prev) =>
              produce(prev, (draft) => {
                draft.selected.push({
                  selectedCorporations: e.corporation,
                });
                return draft;
              }),
            );
          }
        }}
        onKeyDownEnter={(e) => {
          if (searchResultCorps.length >= 1) {
            setUniversalSettingState((prev) => {
              return {
                ...prev,
                selected: [
                  ...prev.selected,
                  { selectedCorporations: searchResultCorps[0] },
                ],
              };
            });
          }
        }}
      />

      <WhiteSpace />
      <WideLine style={{ margin: '0 0 1.3rem 0' }} />
      <div className="searchedTableHeader">
        <div className="name">
          선택된 종목 {willDelCorpIdxs.size} 개 삭제하기
        </div>
        <Button className="btn" onClick={handleWillDelTickerClick}>
          종목삭제
        </Button>
      </div>
      <WhiteSpace />

      <div className="selectedUnivList">
        {universalSettingState.selected.map((data, idx) => {
          return (
            <div
              className="selectedUnivItem"
              key={`willDel-${idx}${data.selectedCorporations.ticker}`}
              style={{ display: 'flex' }}
            >
              <input
                onClick={(e) => {
                  if (e.currentTarget.checked) {
                    setWillDelCorpIdxs((prev) => new Set(prev.add(idx)));
                  } else {
                    setWillDelCorpIdxs((prev) => {
                      prev.delete(idx);
                      return new Set(prev);
                    });
                  }
                }}
                id={`willDel-${idx}${data.selectedCorporations.ticker}`}
                type="checkbox"
              ></input>
              <label
                htmlFor={`willDel-${idx}${data.selectedCorporations.ticker}`}
              >
                <span className="checkbox"></span>
                <span key={idx}>{data.selectedCorporations.corp_name}</span>
              </label>
            </div>
          );
        })}
      </div>
    </SUniversalSettingTabTickerSearch>
  );
};
const SUniversalSettingTabTickerSearch = styled.section`
  .searchedTableHeader {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .name {
      margin-right: 1rem;
    }
    .btn {
      height: 4rem;
      width: 30%;
      font-size: 1.8rem;
    }
  }
  .selectedUnivList {
    .selectedUnivItem {
      font-size: 2rem;
      line-height: 2.9rem;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      input {
        margin-right: 3rem;
      }
      label {
      }
    }
  }
`;

export default UniversalSettingTabTickerSearch;
