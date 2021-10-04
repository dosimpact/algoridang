import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { atomStrategyState } from 'states/strategy/recoil/strategy';
import { CreateMyStrategyInput } from 'states/strategy/interface/dtos';

// 폼 인터페이스
export interface IformStateBasicSetting {
  strategy_name: string;
  strategy_explanation: string;
  tags?: string;
  open_yes_no: 'public' | 'private';

  'investProfitInfo.invest_principal': number;
  'investProfitInfo.invest_start_date': string;
  'investProfitInfo.invest_end_date'?: string;
  'investProfitInfo.securities_corp_fee': number;
}

// todo:refactor : 유효성 검사
const ScreateBasic = () => {
  const { register, handleSubmit } = useForm<IformStateBasicSetting>();
  const [, setStrategyState] = useRecoilState(atomStrategyState);

  return (
    <SScreateBasic>
      <form
        className="basicSettingForm"
        style={{ display: 'flex', flexFlow: 'column nowrap' }}
        onSubmit={handleSubmit((data) => {
          console.log('basicSettingForm', data);

          const tags = data?.tags?.split(' ');
          const open_yes_no = data.open_yes_no === 'private' ? false : true;

          const createMyStrategyInput =
            data as unknown as CreateMyStrategyInput;

          createMyStrategyInput.tags = tags;
          createMyStrategyInput.open_yes_no = open_yes_no;
          setStrategyState((prev) => {
            return {
              ...prev,
              createMyStrategyInput,
            };
          });
        })}
      >
        <div className="inputRow inputRowHeader">
          <div className="col detail">항목</div>
          <div className="col inputField">입력</div>
        </div>
        {/* 1. */}
        <div className="inputRow">
          <div className="col detail">전략 이름</div>
          <div className="col inputField">
            <input
              type="text"
              placeholder={'전략 이름'}
              {...register('strategy_name', {
                // required: true,
              })}
            ></input>
          </div>
        </div>

        <div className="inputRow">
          <div className="col detail">전략 설명</div>
          <div className="col inputField">
            <input
              type="text"
              placeholder={'전략 설명'}
              {...register('strategy_explanation', {
                // required: true,
              })}
            ></input>
          </div>
        </div>

        <div className="inputRow">
          <div className="col detail">Tags(공백 구분)</div>
          <div className="col inputField">
            <input
              type="text"
              placeholder={'태그 입력'}
              {...register('tags', {
                // required: true,
              })}
            ></input>
          </div>
        </div>

        <div className="inputRow">
          <div className="col detail">공개범위</div>
          <div className="col inputField">
            <select {...register('open_yes_no')}>
              <option value={'false'}>public</option>
              <option value={'true'}>private</option>
            </select>
          </div>
        </div>

        <div className="inputRow">
          <div className="col detail">백테스트 시작</div>
          <div className="col inputField">
            <input
              type="date"
              placeholder={'태그 입력'}
              {...register('investProfitInfo.invest_start_date', {
                required: true,
              })}
            ></input>
          </div>
        </div>

        <div className="inputRow">
          <div className="col detail">백테스트 종료</div>
          <div className="col inputField">
            <input
              type="date"
              placeholder={'태그 입력'}
              {...register('investProfitInfo.invest_end_date', {
                // required: true,
              })}
            ></input>
          </div>
        </div>

        <div className="inputRow">
          <div className="col detail">운용 자금 (원)</div>
          <div className="col inputField">
            <input
              type="text"
              placeholder={'Ex) 10000000'}
              {...register('investProfitInfo.invest_principal', {
                // required: true,
                // valueAsNumber: true,
              })}
            ></input>
          </div>
        </div>

        <div className="inputRow">
          <div className="col detail">수수료 (%)</div>
          <div className="col inputField">
            <input
              type="text"
              placeholder={'Ex) 0.1'}
              {...register('investProfitInfo.securities_corp_fee', {
                // required: true,
                // valueAsNumber: true,
              })}
            ></input>
          </div>
        </div>

        <button type="submit">완료</button>
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
      grid-template-columns: 1fr 1fr;
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
      }
    }
  }
`;

export default ScreateBasic;
