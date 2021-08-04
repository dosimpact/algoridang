import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Button, List, Checkbox, Radio } from "antd-mobile";
import useTrading from "states/react-query/useTrading";
import {
  BaseTradingStrategy,
  StrategyValue,
} from "states/interface/trading/entities";
import { useRecoilState } from "recoil";
import { atomStrategyState } from "states/recoil/strategy";

const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;

type IScreateBasicInput = {
  name: string;
  description: string;
  tags: string;
  startMoney: number;
  backtestFrom: string;
  backtestTo: string;
  fees: number;
  openRange: "public" | "private";
};

// 1. 코드 기업명 검색
// 2. 기업리스트 리스트 뷰
// 3. selected 추가 및 삭제
// 4. 뷰

// todo:refactor fuse.js - 매매전략 fuzzySearch 적용
const ScreatePropterties = () => {
  const { handleSubmit } = useForm<IScreateBasicInput>();
  const [strategyState, setStrategyState] = useRecoilState(atomStrategyState);

  const { baseTradingStrategyList, baseTradingStrategyListLoading } =
    useTrading();

  const [selectedNum, setSelectedNum] = useState<number>(0);
  // 전략 프로퍼티
  const [inputs, setInputs] = useState<Record<string, string>>();

  const setting_json = useMemo(() => {
    return (
      baseTradingStrategyList &&
      baseTradingStrategyList[selectedNum].setting_json
    );
  }, [selectedNum, baseTradingStrategyList]);

  const trading_strategy_name = useMemo(() => {
    return (
      baseTradingStrategyList &&
      baseTradingStrategyList[selectedNum].trading_strategy_name
    );
  }, [selectedNum, baseTradingStrategyList]);

  // const data2 = [
  //   { value: 0, company: "골든 크로스", code: "" },
  //   { value: 1, company: "블린저 밴드", code: "" },
  // ];

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    setStrategyState((prev) => ({
      ...prev,
      formStateTradingSetting: {
        [trading_strategy_name as string]: inputs,
      },
    }));
  };

  return (
    <SScreatePropterties>
      {/* {JSON.stringify(inputs, null, 2)} */}
      <article className="articleCol searchCol">
        <form
          className="tickerSettingForm"
          style={{ display: "flex", flexFlow: "column nowrap" }}
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <input
            className="tickerInput"
            placeholder="매매 전략을 입력하시오"
          ></input>
        </form>
        <div> {baseTradingStrategyListLoading && "loading..."} </div>
        <List>
          {baseTradingStrategyList &&
            baseTradingStrategyList.map((i, idx) => (
              <RadioItem
                key={i.trading_strategy_code}
                checked={idx === selectedNum}
                onChange={(e: any) => {
                  setSelectedNum(idx);
                  setInputs({});
                }}
              >
                <span className="companyCode">{i.trading_strategy_code}</span>{" "}
                {i.trading_strategy_name}
              </RadioItem>
            ))}
        </List>
      </article>
      <article className="articleCol selectedCol">
        <Button className="finish" type="primary">
          전략 생성 및 백테스팅
        </Button>
        <div className="targetSettingName flexRow">
          {trading_strategy_name} 세부 셋팅
        </div>
        <List>
          {/* {setting_json && JSON.stringify(setting_json, null, 2)} */}
          {setting_json &&
            Object.keys(setting_json).map((keyTradingName) => {
              // keyTradingName = keyTradingName as keyof StrategyValue;
              // const res =
              //   setting_json &&
              //   keyTradingName &&
              //   (setting_json[keyTradingName] as Record<string, string>);
              const resa = setting_json?.GoldenCross;
              const resb = setting_json?.["GoldenCross"];
              const resc = setting_json?.[
                keyTradingName as keyof StrategyValue
              ] as Object;
              // console.log("Object.keys(resc)", Object.keys(resc));
              // console.log("Object.values(resc)", Object.values(resc));

              return (
                <div key="a">
                  <div>{keyTradingName}</div>
                  {Object.entries(resc).map(([key, value]) => {
                    return (
                      <List.Item>
                        <div>{key}</div>
                        <input
                          type="text"
                          placeholder={value + "" || "0"}
                          name={key}
                          onChange={handleInputs}
                        ></input>
                      </List.Item>
                    );
                  })}
                </div>
              );
            })}
          {/* <List.Item>
            <div>SMA-1</div>
            <input type="text" placeholder={"8"}></input>
          </List.Item>
          <List.Item>
            <div>SMA-2</div>
            <input type="text" placeholder={"16"}></input>
          </List.Item> */}
        </List>
      </article>
    </SScreatePropterties>
  );
};

const SScreatePropterties = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  .articleCol {
  }
  .articleCol.searchCol {
  }
  .articleCol.buttonCol {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    .wrapper {
    }
  }
  .articleCol.selectedCol {
    .targetSettingName {
      height: 6rem;
      font-weight: 700;
    }
    .finish {
    }
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

export default ScreatePropterties;
