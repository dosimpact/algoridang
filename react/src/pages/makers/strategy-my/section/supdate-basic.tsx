import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Button } from 'antd-mobile';

type ISupdateBasicInput = {
  name: string;
  description: string;
  tags: string;
  startMoney: number;
  backtestFrom: string;
  backtestTo: string;
  fees: number;
  openRange: 'public' | 'private';
};

const inputNameList = [
  'name',
  'description',
  'tags',
  'startMoney',
  'backtestFrom',
  'backtestTo',
  'fees',
  'openRange',
];

const mapNameToDetail = {
  name: '전략 이름',
  description: '전략 설명',
  tags: '전략 테그',
  startMoney: '운용 자금',
  backtestFrom: '백테스트 시작',
  backtestTo: '백테스트 종료',
  fees: '수수료',
  openRange: '공개범위',
} as Record<string, string>;

const mapNameToPlaceholder = {
  name: '전략 이름',
  description: '전략 설명',
  tags: '전략 테그',
  startMoney: '운용 자금',
  backtestFrom: '백테스트 시작',
  backtestTo: '백테스트 종료',
  fees: '수수료',
  openRange: '공개범위',
} as Record<string, string>;

const mapNameToRemark = {
  name: '',
  description: '',
  tags: '',
  startMoney: '만원',
  backtestFrom: '년',
  backtestTo: '%',
  fees: '',
  openRange: '',
} as Record<string, string>;

const SupdateBasic = () => {
  const { register, handleSubmit } = useForm<ISupdateBasicInput>();

  const inputNameListM = useMemo<string[]>(() => inputNameList, []);

  return (
    <SSupdateBasic>
      <form
        className="basicSettingForm"
        style={{ display: 'flex', flexFlow: 'column nowrap' }}
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="inputRow inputRowHeader">
          <div className="col detail">항목</div>
          <div className="col inputField">입력</div>
          <div className="col remark">단위</div>
        </div>
        {inputNameListM
          .filter((name) => name !== 'openRange')
          .map((name, key) => {
            return (
              <div className="inputRow" key={key}>
                <div className="col detail">{mapNameToDetail[name]}</div>
                <div className="col inputField">
                  <input
                    type="text"
                    placeholder={mapNameToPlaceholder[name]}
                    {...register(name as keyof ISupdateBasicInput, {
                      // required: true,
                    })}
                  ></input>
                </div>
                <div className="col remark">{mapNameToRemark[name]}</div>
              </div>
            );
          })}
        <div className="inputRow">
          <div className="col detail">{mapNameToDetail['openRange']}</div>
          <div className="col inputField">
            <select {...register('openRange')}>
              {['public', 'private'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="col remark">{mapNameToRemark['openRange']}</div>
        </div>
        <Button
          type="primary"
          onClick={handleSubmit((data) => {
            console.log(data);
          })}
        >
          수정 완료
        </Button>
      </form>
    </SSupdateBasic>
  );
};

const SSupdateBasic = styled.div`
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

export default SupdateBasic;
