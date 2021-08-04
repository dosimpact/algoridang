import React, { useMemo } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Button } from "antd-mobile";
import { useRecoilState } from "recoil";
import { atomStrategyState } from "states/recoil/strategy";

export type IformStateBasicSetting = {
  strategy_name: string;
  strategy_explanation: string;
  tags: string;
  invest_principal: number;
  invest_start_date: string;
  invest_end_date: string;
  securities_corp_fee: number;
  open_yes_no: "public" | "private";
};

const inputNameList = [
  "strategy_name",
  "strategy_explanation",
  "tags",
  "invest_principal",
  "invest_start_date",
  "invest_end_date",
  "securities_corp_fee",
  "open_yes_no",
];

const mapNameToDetail = {
  strategy_name: "전략 이름",
  strategy_explanation: "전략 설명",
  tags: "전략 테그",
  invest_principal: "운용 자금",
  invest_start_date: "백테스트 시작",
  invest_end_date: "백테스트 종료",
  securities_corp_fee: "수수료",
  open_yes_no: "공개범위",
} as Record<string, string>;

const mapNameToPlaceholder = {
  strategy_name: "전략 이름",
  strategy_explanation: "전략 설명",
  tags: "전략 테그",
  invest_principal: "운용 자금",
  invest_start_date: "백테스트 시작",
  invest_end_date: "백테스트 종료",
  securities_corp_fee: "수수료",
  open_yes_no: "공개범위",
} as Record<string, string>;

const mapNameToRemark = {
  strategy_name: "",
  strategy_explanation: "",
  tags: "",
  invest_principal: "만원",
  invest_start_date: "년",
  invest_end_date: "%",
  securities_corp_fee: "",
  open_yes_no: "",
} as Record<string, string>;

const ScreateBasic = () => {
  const { register, handleSubmit } = useForm<IformStateBasicSetting>();
  const [strategyState, setStrategyState] = useRecoilState(atomStrategyState);

  const inputNameListM = useMemo<string[]>(() => inputNameList, []);

  return (
    <SScreateBasic>
      <form
        className="basicSettingForm"
        style={{ display: "flex", flexFlow: "column nowrap" }}
        onSubmit={handleSubmit((data) => {
          setStrategyState((prev) => {
            return { ...prev, formStateBasicSetting: data };
          });
        })}
      >
        <div className="inputRow inputRowHeader">
          <div className="col detail">항목</div>
          <div className="col inputField">입력</div>
          <div className="col remark">단위</div>
        </div>
        {inputNameListM
          .filter((name) => name !== "open_yes_no")
          .map((name, key) => {
            return (
              <div className="inputRow" key={key}>
                <div className="col detail">{mapNameToDetail[name]}</div>
                <div className="col inputField">
                  <input
                    type="text"
                    placeholder={mapNameToPlaceholder[name]}
                    {...register(name as keyof IformStateBasicSetting, {
                      // required: true,
                    })}
                  ></input>
                </div>
                <div className="col remark">{mapNameToRemark[name]}</div>
              </div>
            );
          })}
        <div className="inputRow">
          <div className="col detail">{mapNameToDetail["open_yes_no"]}</div>
          <div className="col inputField">
            <select {...register("open_yes_no")}>
              {["public", "private"].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="col remark">{mapNameToRemark["open_yes_no"]}</div>
        </div>
        <button type="submit">완료</button>
        {/* <Button
          type="primary"
          onClick={handleSubmit((data) => {
            console.log(data);
          })}
        >
          완료
        </Button> */}
      </form>
    </SScreateBasic>
  );
};

const SScreateBasic = styled.div`
  width: 100%;
  font-size: ${(props) => props.theme.FontSizeXlg};

  .basicSettingForm {
    max-width: 60rem;
    width: 100%;
    background-color: ${(props) => props.theme.ColorWhite};
    transition: box-shadow 0.2s ease-in-out;
    :hover {
      box-shadow: 0 4px 12px 0px rgba(0, 0, 0, 0.25);
    }
    border-bottom-right-radius: 1rem;

    .inputRowHeader {
      .col {
        text-align: center;
      }
    }
    .inputRow {
      height: 5rem;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 0.3fr;
      padding: 0.5rem 0rem;
      justify-items: center;
      align-items: center;
      border-bottom: ${(props) => props.theme.Border};
      /* justify-content: center; */
      /* align-items: center; */
      .col {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        padding: 0rem 1rem;
        .detail {
        }
        .inputField {
          width: 100%;
        }
        .remark {
        }
      }
    }
  }
`;

export default ScreateBasic;
