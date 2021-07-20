import React, { useMemo } from "react";
import styled from "styled-components";
import { useForm, UseFormRegister } from "react-hook-form";
import { Button, List, Checkbox, Icon } from "antd-mobile";

const CheckboxItem = Checkbox.CheckboxItem;

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

const ScreatePropterties = () => {
  const { register, handleSubmit, watch, formState } =
    useForm<IScreateBasicInput>();

  const data2 = [
    { value: 0, company: "골든 크로스", code: "" },
    { value: 1, company: "블린저 밴드", code: "" },
  ];

  return (
    <SScreatePropterties>
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
        <List>
          {data2.map((i) => (
            <CheckboxItem key={i.value} onChange={() => {}}>
              <span className="companyCode">{i.code}</span> {i.company}
            </CheckboxItem>
          ))}
        </List>
      </article>
      <article className="articleCol selectedCol">
        <Button className="finish" type="primary">
          전략 생성 및 백테스팅
        </Button>
        <div className="targetSettingName flexRow">골든크로스 세부 셋팅</div>
        <List>
          <List.Item>
            <div>SMA-1</div>
            <input type="text" placeholder={"8"}></input>
          </List.Item>
          <List.Item>
            <div>SMA-2</div>
            <input type="text" placeholder={"16"}></input>
          </List.Item>
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
