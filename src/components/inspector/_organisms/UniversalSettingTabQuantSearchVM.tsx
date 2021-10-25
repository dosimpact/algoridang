import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IQuantPreset, RequestFSKeys } from 'states/finance/interface/entities';
import styled from 'styled-components';
import Modal from 'react-modal';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import { Button } from 'components/common/_atoms/Buttons';
import FilterListItemRange from '../_molecules/FilterListItemRange';
import QuantFilterModal from '../_molecules/QuantFilterModal';
import {
  atomQSBody,
  selectorQSBodyOnOff,
  atomQSHeader,
  IatomQSBody,
  selectorQSBodyOnOff_IO,
  selectorQSBodyOnOff_Params,
} from 'states/common/recoil/dashBoard/QuantSelect';
import { useForm } from 'react-hook-form';
import InputListItemH from 'components/common/_atoms/InputListItemH';
import produce from 'immer';

//https://velog.io/@seungsang00/React-React-Modal
Modal.setAppElement('#root');

export type IhandleSetQSBodyValue = (
  key: selectorQSBodyOnOff_Params,
  data: selectorQSBodyOnOff_IO,
) => void;

export type IhandleToggleQSBodyValue = (
  key: selectorQSBodyOnOff_Params,
) => void;

export type IhandlePreset = (preset: IQuantPreset) => void;

const UniversalSettingTabQuantSearchVM = () => {
  // 종목 추출 요청
  const [currentFSKey, setCurrentFSKey] = useState<RequestFSKeys>('capital_Q');
  const handleSetCurrentFSKey = (key: RequestFSKeys) => {
    setCurrentFSKey(key);
  };
  // 선택지 리스트 업
  const [QSBody, setQSBody] = useRecoilState(atomQSBody);

  const _handleSetQSBodyValue: IhandleSetQSBodyValue = (key, data) => {
    setQSBody(
      produce(QSBody, (df) => {
        df.data[key] = data;
        return df;
      }),
    );
  };
  const _handlePreset_0 = () => {
    //   TODO Reset
  };
  const _handlePreset_1 = () => {
    setQSBody(
      produce(QSBody, (df) => {
        df.data['market_cap'] = { operator: 'up', values: [5000] };
        return df;
      }),
    );
  };
  const _handlePreset_2 = () => {
    setQSBody(
      produce(QSBody, (df) => {
        df.data['market_cap'] = { operator: 'up', values: [5000] };
        df.data['PBR_Q'] = { operator: 'up', values: [0] };
        return df;
      }),
    );
  };
  const _handlePreset_3 = () => {
    setQSBody(
      produce(QSBody, (df) => {
        df.data['market_cap'] = { operator: 'up', values: [5000] };
        df.data['PBR_Q'] = { operator: 'up', values: [0] };
        df.data['EV_per_EBITDA'] = { operator: 'up', values: [0] };
        return df;
      }),
    );
  };
  const _handlePreset_4 = () => {
    setQSBody(
      produce(QSBody, (df) => {
        df.data['PER'] = { operator: 'up', values: [5000] };
        df.data['debt_ratio_Q'] = { operator: 'up', values: [0] };
        df.data['EV_per_EBITDA'] = { operator: 'up', values: [0] };
        return df;
      }),
    );
  };
  const _handlePreset_5 = () => {
    setQSBody(
      produce(QSBody, (df) => {
        df.data['PER'] = { operator: 'down', values: [10] };
        df.data['debt_ratio_Q'] = { operator: 'down', values: [50] };
        return df;
      }),
    );
  };
  const _handlePreset_6 = () => {
    setQSBody(
      produce(QSBody, (df) => {
        df.data['PBR_Q'] = { operator: 'up', values: [0.2] };
        df.data['debt_ratio_Q'] = { operator: 'down', values: [50] };
        df.data['ROA_Q'] = { operator: 'up', values: [5] };
        return df;
      }),
    );
  };

  const handlePreset = (preset: IQuantPreset) => {
    if (preset === '0') _handlePreset_0();
    if (preset === '1') _handlePreset_1();
    if (preset === '2') _handlePreset_2();
    if (preset === '3') _handlePreset_3();
    if (preset === '4') _handlePreset_4();
    if (preset === '5') _handlePreset_5();
    if (preset === '6') _handlePreset_6();
  };

  const handleToggleQSBodyValue: IhandleToggleQSBodyValue = (key) => {
    if (typeof QSBody.data[key] === 'number') {
      setQSBody(
        produce(QSBody, (df) => {
          df.data[key] = { operator: 'between', values: [10, 20] };
          return df;
        }),
      );
    } else {
      setQSBody(
        produce(QSBody, (df) => {
          df.data[key] = 0;
          return df;
        }),
      );
    }
  };

  const [QSHeader, setQSHeader] = useRecoilState(atomQSHeader);
  const handleSetStrategyNum = (strategy: number) => {
    setQSHeader({ ...QSHeader, strategy });
  };
  const handleSetNumOfRequestTicker = (numberOfData: number) => {
    setQSHeader({ ...QSHeader, numberOfData });
  };
  //   const [] = useRecoilState(selectorQSBodyOnOff('BETA'));
  // 핸들러 - 필터셋 선택

  return (
    <UniversalSettingTabQuantSearch
      QSBody={QSBody}
      currentFSKey={currentFSKey}
      handleSetCurrentFSKey={handleSetCurrentFSKey}
      handleSetStrategyNum={handleSetStrategyNum}
      handleSetNumOfRequestTicker={handleSetNumOfRequestTicker}
      handleToggleQSBodyValue={handleToggleQSBodyValue}
      handlePreset={handlePreset}
    />
  );
};

export default UniversalSettingTabQuantSearchVM;

export interface IUniversalSettingTabQuantSearch {
  QSBody: IatomQSBody;
  currentFSKey: RequestFSKeys;
  handleSetCurrentFSKey: (key: RequestFSKeys) => void;
  handleSetStrategyNum: (strategy: number) => void;
  handleSetNumOfRequestTicker: (numberOfData: number) => void;
  handleToggleQSBodyValue: IhandleToggleQSBodyValue;
  handlePreset: IhandlePreset;
}

const UniversalSettingTabQuantSearch: React.FC<IUniversalSettingTabQuantSearch> =
  ({
    QSBody,
    currentFSKey,
    handleSetCurrentFSKey,
    handleSetNumOfRequestTicker,
    handleSetStrategyNum,
    handleToggleQSBodyValue,
    handlePreset,
  }) => {
    // 1. 모달창 open/close 상태
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const { register, formState, watch, trigger, handleSubmit } = useForm<{
      numberOfData: number;
    }>({
      defaultValues: { numberOfData: 10 },
    });

    React.useEffect(() => {
      // ✅입력마다 유효성 검사를 한다.
      // -유효성 검사 성공시 내용을 적용한다.
      const subscription = watch((value, { name, type }) => {
        trigger();
        handleSubmit((data) => {
          handleSetStrategyNum(data.numberOfData);
        })();
      });
      return () => {
        subscription.unsubscribe();
      };
    }, [watch, trigger, handleSetStrategyNum, handleSubmit]);

    return (
      <SUniversalSettingTabQuantSearch>
        <WhiteSpace style={{ marginTop: '1rem' }} />
        <div>
          <InputListItemH
            error={!!formState.errors.numberOfData?.message}
            errorMessage={formState.errors.numberOfData?.message}
          >
            <label htmlFor="numberOfData">편입 종목 수</label>
            <WhiteSpace marginV="0.5" />
            <input
              type="text"
              placeholder="편입 종목 수"
              id="numberOfData"
              {...register('numberOfData', {
                required: '*몇개의 종목을 편입 하시겠습니까?',
                validate: {
                  moreThan: (n) => Number(n) >= 1 || '*1개 이상 입력',
                  lessThan: (n) => Number(n) <= 50 || '*50개 이하 입력',
                },
              })}
            ></input>
          </InputListItemH>
        </div>
        <div className="filterButtonList">
          <Button
            type="info"
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            필터 추가
          </Button>
          <Button type="success">종목 추출</Button>
        </div>
        <WhiteSpace style={{ marginTop: '1rem' }} />
        <FilterList>
          <FilterListItem>
            <div className="title">거래량 ( 단위: )</div>
            <div className="fields">
              <input type="text" name="" id="" placeholder="0" />
              <span className="tail">~</span>
              <input type="text" name="" id="" placeholder="100" />
            </div>
          </FilterListItem>
          <FilterListItemRange
            name="ROE (단위:)"
            defaultFormValue={{
              lowerBound: 0,
              upperBound: 10,
            }}
            onChange={(e) => {
              console.log(e);
            }}
          />
        </FilterList>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <QuantFilterModal
            QSBody={QSBody}
            onRequestClose={() => setModalIsOpen(false)}
            currentFSKey={currentFSKey}
            onSetCurrentFSKey={handleSetCurrentFSKey}
            handleToggleQSBodyValue={handleToggleQSBodyValue}
            handlePreset={handlePreset}
          />
        </Modal>
      </SUniversalSettingTabQuantSearch>
    );
  };

const SUniversalSettingTabQuantSearch = styled.section`
  .filterButtonList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }
`;

const FilterList = styled.ul``;
const FilterListItem = styled.li`
  margin-bottom: 2rem;
  .title {
    margin-bottom: 1rem;
  }
  .fields {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .tail {
      margin: 0rem 1rem;
    }
  }
`;
