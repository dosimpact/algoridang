import TickerSearch, {
  TickerSearchOnSuccessResult,
} from "components/_atoms/TickerSearch";
import WingBlank from "components/_atoms/WingBlank";
import InspectorHeaderDetail from "components/_molecules/inspector/InspectorHeaderDetail";
import React from "react";
import { useRecoilState } from "recoil";
import { Corporation } from "states/interface/finance/entities";
import { atomInspector } from "states/recoil/strategy-create";
import styled from "styled-components";
import { IInspectorSettings } from ".";

interface IUniversalSetting extends IInspectorSettings {}

const UniversalSetting: React.FC<IUniversalSetting> = ({ headerTitle }) => {
  const [inspectorState, setInspectorState] = useRecoilState(atomInspector);
  const universalSetting = React.useMemo(() => {
    return inspectorState.inspectorState.universalSetting;
  }, [inspectorState]);

  const [tab, setTab] = React.useState(universalSetting.tab);
  const [searchedCorporations, setSearchedCorporations] = React.useState<
    Corporation[]
  >([]);

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

  const handleSearchedCorporations = React.useCallback(
    (e: TickerSearchOnSuccessResult) => {
      setSearchedCorporations(e.corporations);
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
            <TickerSearch onSuccess={handleSearchedCorporations} />
          </>
        )}
        {tab === 1 && (
          <>
            <div>hello</div>
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
