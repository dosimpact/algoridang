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

const ScreateTickers = () => {
  const { register, handleSubmit, watch, formState } =
    useForm<IScreateBasicInput>();

  const data2 = [
    { value: 0, company: "basketball", code: "00FF12DD" },
    { value: 1, company: "football", code: "00FF12DD" },
  ];

  return (
    <SScreateTickers>
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
            placeholder=" 코드, 기업명을 입력해주세요"
          ></input>
        </form>
        <div className="flexRow">
          <Button className="btn">전체 선택</Button>
        </div>
        <List>
          {data2.map((i) => (
            <CheckboxItem key={i.value} onChange={() => {}}>
              <span className="companyCode">{i.code}</span> {i.company}
            </CheckboxItem>
          ))}
        </List>
      </article>
      <article className="articleCol buttonCol">
        <div className="wrapper">
          <div className="flexCenter" style={{ margin: "0.5rem" }}>
            <Icon size="lg" type="right" />
          </div>
          <Button type="primary">선택 추가</Button>
          <Button type="warning">선택 삭제</Button>
          <div className="flexCenter" style={{ margin: "0.5rem" }}>
            <Icon size="lg" type="left" />
          </div>
        </div>
      </article>
      <article className="articleCol selectedCol">
        <div style={{ height: "5rem" }}></div>
        <div className="flexRow">
          <Button className="btn">전체 선택</Button>
        </div>
        <List>
          {data2.map((i) => (
            <CheckboxItem key={i.value} onChange={() => {}}>
              <span className="companyCode">{i.code}</span> {i.company}
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
    justify-content: center;
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
