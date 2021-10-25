import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  Corporation,
  IQuantPreset,
  RequestFSKeys,
} from 'states/finance/interface/entities';
import styled from 'styled-components';
import Modal from 'react-modal';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import { Button } from 'components/common/_atoms/Buttons';
import FilterListItemRange from '../_molecules/FilterListItemRange';
import QuantFilterModal from '../_molecules/QuantFilterModal';
import {
  atomQSBody,
  atomQSHeader,
  defaultQSBodyData,
  IatomQSBody,
  selectorQSBodyOnOff_IO,
  selectorQSBodyOnOff_Params,
  selectorQSApiBody,
} from 'states/common/recoil/dashBoard/QuantSelect';
import { useForm } from 'react-hook-form';
import InputListItemH from 'components/common/_atoms/InputListItemH';
import produce from 'immer';
import { useQuantSelect } from 'states/finance/query/useQuantSelect';
import { toast } from 'react-toastify';
import { RequestQuantSelectOutput } from 'states/backtest/interface/dtos';
import {
  atomUniversalSettingState,
  IAtomInterestedUnivItem,
} from 'states/common/recoil/dashBoard/dashBoard';

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
    setQSBody({
      data: {
        ...defaultQSBodyData,
        market_cap: { operator: 'up', values: [5000] },
      },
    });
  };
  const _handlePreset_2 = () => {
    setQSBody(
      produce({ data: defaultQSBodyData }, (df) => {
        df.data['market_cap'] = { operator: 'up', values: [5000] };
        df.data['PBR_Q'] = { operator: 'up', values: [0] };
        return df;
      }),
    );
  };
  const _handlePreset_3 = () => {
    setQSBody(
      produce({ data: defaultQSBodyData }, (df) => {
        df.data['market_cap'] = { operator: 'up', values: [5000] };
        df.data['PBR_Q'] = { operator: 'up', values: [0] };
        df.data['EV_per_EBITDA'] = { operator: 'up', values: [0] };
        return df;
      }),
    );
  };
  const _handlePreset_4 = () => {
    setQSBody(
      produce({ data: defaultQSBodyData }, (df) => {
        df.data['PER'] = { operator: 'up', values: [5000] };
        df.data['debt_ratio_Q'] = { operator: 'up', values: [0] };
        df.data['EV_per_EBITDA'] = { operator: 'up', values: [0] };
        return df;
      }),
    );
  };
  const _handlePreset_5 = () => {
    setQSBody(
      produce({ data: defaultQSBodyData }, (df) => {
        df.data['PER'] = { operator: 'down', values: [10] };
        df.data['debt_ratio_Q'] = { operator: 'down', values: [50] };
        return df;
      }),
    );
  };
  const _handlePreset_6 = () => {
    setQSBody(
      produce({ data: defaultQSBodyData }, (df) => {
        df.data['PBR_Q'] = { operator: 'up', values: [0.2] };
        df.data['debt_ratio_Q'] = { operator: 'down', values: [50] };
        df.data['ROA_Q'] = { operator: 'up', values: [5] };
        return df;
      }),
    );
  };
  const resetQSBody = useResetRecoilState(atomQSBody);
  const handlePreset = (preset: IQuantPreset) => {
    resetQSBody();
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

  // 퀀트 발굴하기
  const QSReqeustBody = useRecoilValue(selectorQSApiBody);
  const { QSMutation } = useQuantSelect();
  const [universalSettingState, setUniversalSettingState] = useRecoilState(
    atomUniversalSettingState,
  );

  const handleRequestQuantSelect = async () => {
    const result = await toast.promise(
      QSMutation.mutateAsync(QSReqeustBody),
      {
        pending: '종목을 추출 합니다.',
        success: {
          render({ data }) {
            console.log('data', data);
            const res = result.data as unknown as RequestQuantSelectOutput;
            const su = Object.keys(res.result).length;
            return `종목 추출 완료 - ${su}개 😊`;
          },
        },
        error: '종목 추출 실패 🤯',
      },
      {
        position: 'bottom-right',
      },
    );
    const res = result.data as unknown as RequestQuantSelectOutput;
    const listup = Object.keys(res.result).map((_key) => {
      return {
        selectedCorporations: {
          ticker: res.result[_key][0],
          corp_name: res.result[_key][1],
        },
      } as IAtomInterestedUnivItem;
    });
    console.log('listup', listup);

    setUniversalSettingState((prev) =>
      produce(prev, (draft) => {
        draft.selected = draft.selected.concat(...listup);
        return draft;
      }),
    );
  };

  return (
    <UniversalSettingTabQuantSearch
      QSBody={QSBody}
      currentFSKey={currentFSKey}
      handleSetCurrentFSKey={handleSetCurrentFSKey}
      handleSetStrategyNum={handleSetStrategyNum}
      handleSetNumOfRequestTicker={handleSetNumOfRequestTicker}
      handleToggleQSBodyValue={handleToggleQSBodyValue}
      handlePreset={handlePreset}
      handleRequestQuantSelect={handleRequestQuantSelect}
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
  handleRequestQuantSelect: () => void;
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
    handleRequestQuantSelect,
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
          handleSetNumOfRequestTicker(data.numberOfData);
        })();
      });
      return () => {
        subscription.unsubscribe();
      };
    }, [watch, trigger, handleSetNumOfRequestTicker, handleSubmit]);

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
                setValueAs: (n) => Number(n),
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
          <Button
            type="success"
            onClick={() => {
              handleRequestQuantSelect();
            }}
          >
            종목 추출
          </Button>
        </div>
        <WhiteSpace style={{ marginTop: '1rem' }} />
        <FilterList>
          {Object.keys(QSBody.data).map((key) => {
            const _key = key as RequestFSKeys;
            const val = QSBody.data[_key];
            if (typeof val !== 'number') {
              if (val?.operator === 'between')
                return (
                  <FilterListItemRange
                    type="between"
                    name={_key}
                    defaultFormValue={{
                      lowerBound: 0,
                      upperBound: 10,
                    }}
                  />
                );
              if (val?.operator === 'down')
                return (
                  <FilterListItemRange
                    type="down"
                    name={_key}
                    defaultFormValue={{
                      upperBound: 10,
                    }}
                  />
                );
              if (val?.operator === 'up')
                return (
                  <FilterListItemRange
                    type="up"
                    name={_key}
                    defaultFormValue={{
                      lowerBound: 0,
                    }}
                  />
                );
            }
          })}
          {/* <FilterListItemRange
            name="ROE (단위:)"
            defaultFormValue={{
              lowerBound: 0,
              upperBound: 10,
            }}
            onChange={(e) => {
              console.log(e);
            }}
          /> */}
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
            handleSetStrategyNum={handleSetStrategyNum}
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

const FilterList = styled.ul`
  max-height: 60vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0.3rem;
  }
`;
