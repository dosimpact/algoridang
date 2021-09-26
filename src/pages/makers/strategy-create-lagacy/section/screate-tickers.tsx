import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, List, Checkbox, Icon } from 'antd-mobile';
import TickerSearch from 'components/common/_molecules/TickerSearch';
import { Corporation } from 'states/interface/finance/entities';
import { useRecoilState } from 'recoil';
import { atomStrategyState } from 'states/recoil/strategy';

const CheckboxItem = Checkbox.CheckboxItem;

// const data2 = [
//   { value: 0, company: "basketball", code: "00FF12DD" },
//   { value: 1, company: "football", code: "00FF12DD" },
// ];

// 1. 코드 기업명 검색
// 2. 기업리스트 리스트 뷰
// 3. selected 추가 및 삭제
// 4. 뷰

// todo:refactor fuse.js - 종목 검색 fuzzySearch 적용
// https://medium.com/analytics-vidhya/how-to-create-a-fuzzy-search-in-react-js-using-fuse-js-859f80345657
const ScreateTickers = () => {
  const [searched, setSearched] = useState<Corporation[]>([]);
  const [selected, setSelected] = useState<Corporation[]>([]);
  const [, setStrategyState] = useRecoilState(atomStrategyState);

  useEffect(() => {
    console.log(selected);
    setStrategyState((prev) => ({
      ...prev,
      formStateTickerSelected: selected,
    }));
    return () => {};
  }, [selected, setStrategyState]);

  return (
    <SScreateTickers>
      <article className="articleCol searchCol">
        <TickerSearch
          onSuccess={(e) => {
            // console.log("e.corporations", e.corporations);
            setSearched(e && e.corporations);
          }}
        />
        <div className="flexRow">
          <Button className="btn">전체 선택</Button>
        </div>
        <List>
          {searched.map((e) => (
            <CheckboxItem
              key={'1' + e.corp_name}
              onChange={(event: any) => {
                if (event?.target?.checked) {
                  setSelected((prev) => [...prev, e]);
                } else {
                  setSelected((prev) =>
                    prev.filter((corp) => corp.corp_name !== e.corp_name),
                  );
                }
              }}
            >
              <span className="companyCode">{e.ticker}</span> {e.corp_name}
            </CheckboxItem>
          ))}
        </List>
      </article>
      <article className="articleCol buttonCol">
        <div className="wrapper">
          <div className="flexCenter" style={{ margin: '0.5rem' }}>
            <Icon size="lg" type="right" />
          </div>
          <Button type="primary">선택 추가</Button>
          <Button type="warning">선택 삭제</Button>
          <div className="flexCenter" style={{ margin: '0.5rem' }}>
            <Icon size="lg" type="left" />
          </div>
        </div>
      </article>
      <article className="articleCol selectedCol">
        <div style={{ height: '5rem' }}></div>
        <div className="flexRow">
          <Button className="btn">전체 선택</Button>
        </div>
        <div>*MVP - 가장 처음 종목 1개만 전략에 추가할 수 있습니다.</div>
        <List>
          {selected.map((e) => (
            <CheckboxItem key={'2' + e.corp_name} onChange={() => {}}>
              <span className="companyCode">{e.ticker}</span> {e.corp_name}
            </CheckboxItem>
          ))}
        </List>
      </article>
    </SScreateTickers>
  );
};

const SScreateTickers = styled.div`
  display: grid;
  grid-template-columns: 1fr 15rem 1fr;
  grid-gap: 1rem;
  .articleCol {
  }
  .articleCol.searchCol {
  }
  .articleCol.buttonCol {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    /* justify-content: center; */
    .wrapper {
    }
  }
  .articleCol.selectedCol {
  }
  .btn {
    min-width: 12rem;
    margin-bottom: 1rem;
  }
  .companyCode {
    font-size: ${(props) => props.theme.FontSizeSm};
    color: ${(props) => props.theme.ColorGray};
  }
  .tickerSettingForm {
    margin-bottom: 1rem;
    .tickerInput {
      height: 5rem;
      border: ${(props) => props.theme.Border};
      padding: 0rem 1.5rem;
    }
  }
`;

export default ScreateTickers;
