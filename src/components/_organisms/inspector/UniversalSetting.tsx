import TickerSearch, {
  TickerSearchOnSuccessResult,
} from "components/_atoms/TickerSearch";
import WingBlank from "components/_atoms/WingBlank";
import InspectorHeaderDetail from "components/_molecules/inspector/InspectorHeaderDetail";
import React from "react";
import { useRecoilState } from "recoil";
import { Corporation } from "states/interface/finance/entities";
import {
  atomInspector,
  atomUniversalSettingState,
} from "states/recoil/strategy-create";
import styled from "styled-components";
import { IInspectorSettings } from ".";

interface IUniversalSetting extends IInspectorSettings {}

const UniversalSetting: React.FC<IUniversalSetting> = ({ headerTitle }) => {
  // 인스펙터 상태
  const [inspectorState, setInspectorState] = useRecoilState(atomInspector);
  // 종목관리 상태
  const [universalStateSetting, setUniversalStateSetting] = useRecoilState(
    atomUniversalSettingState
  );
  // 현재 인스팩터 상태
  const inspectorUniversalSetting = React.useMemo(() => {
    return inspectorState.inspectorState.universalSetting;
  }, [inspectorState]);

  // TODO 탭 상태 - 중간 임시변수 없시, 바로 Recoil과 바인딩 하도록
  const [tab, setTab] = React.useState(inspectorUniversalSetting.tab);

  // 탭 상태 관리
  const handleTabIdx = (tabIdx: number) => {
    setTab(tabIdx);
    // TODO Recoild Setter ( depth level = 4) (using like immer.js)
    setInspectorState((prev) => {
      return {
        ...prev,
        inspectorState: {
          ...prev.inspectorState,
          universalSetting: {
            ...prev.inspectorState.universalSetting,
            tab: tabIdx,
          },
        },
      };
    });
  };

  const [searchResultCorps, setSearchResultCorps] = React.useState<
    Corporation[]
  >([]);
  // 검색된 종목을 임시 저장
  const handleSearchedCorporations = React.useCallback(
    (e: TickerSearchOnSuccessResult) => {
      setSearchResultCorps(e.corporations);
    },
    []
  );

  return (
    <SUniversalSetting>
      <WingBlank>
        <InspectorHeaderDetail
          headerTitle={headerTitle || "UniversalSetting"}
        />
        <article className="tabContainer">
          <div onClick={() => handleTabIdx(0)} className="tabItem">
            종목 검색
          </div>
          <div onClick={() => handleTabIdx(1)} className="tabItem">
            퀀트 발굴
          </div>
        </article>
        {tab === 0 && (
          <>
            <TickerSearch
              onSuccess={handleSearchedCorporations}
              onKeyDownEnter={(e) => {
                console.log(searchResultCorps);
                if (searchResultCorps.length >= 1) {
                  setUniversalStateSetting((prev) => {
                    return {
                      ...prev,
                      selectedCorporations: [
                        ...prev.selectedCorporations,
                        searchResultCorps[0],
                      ],
                    };
                  });
                }
              }}
            />
            <div>
              {universalStateSetting.selectedCorporations.map((corp, idx) => {
                return <div key={idx}>{corp.corp_name}</div>;
              })}
            </div>
          </>
        )}
        {tab === 1 && (
          <>
            <div>퀀트 발굴</div>
          </>
        )}
      </WingBlank>
    </SUniversalSetting>
  );
};

export default UniversalSetting;

const SUniversalSetting = styled.section`
  .tabContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    cursor: pointer;
    .tabItem {
      min-height: 4rem;
      background-color: bisque;
      text-align: center;
    }
  }
`;
