import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import InputListItemH from 'components/common/_atoms/InputListItemH';
import { Button } from 'components/common/_atoms/Buttons';
import { RequestFSKeys } from 'states/finance/interface/entities';
import { IhandleToggleQSBodyValue } from '../_organisms/UniversalSettingTabQuantSearchVM';
import { IatomQSHeader } from 'states/common/recoil/dashBoard/QuantSelect';

interface IFilterForm {
  lowerBound: number;
  upperBound: number;
}

interface IFilterListItem {
  name: string;
  QSHeader: IatomQSHeader;
  requestFSKeys?: RequestFSKeys;
  defaultFormValue?: Partial<IFilterForm>;
  onChange?: (e: IFilterForm) => void;
  handleToggleOperatorType?: IhandleToggleQSBodyValue;
}

// Range 범위 값을 설정하는 필터 아이템
export const FilterListItemRange: React.FC<IFilterListItem> = ({
  name,
  QSHeader,
  onChange,
  defaultFormValue,
  handleToggleOperatorType,
  requestFSKeys,
}) => {
  const { register, watch, getValues, formState, trigger } =
    useForm<IFilterForm>({
      defaultValues: { lowerBound: 0, upperBound: 10, ...defaultFormValue },
    });

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      trigger();
      if (onChange) onChange(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, trigger, onChange]);

  return (
    <SFilterListItem>
      <div className="title">
        {name}
        {QSHeader.strategy === 1 && (
          <Button
            className="badge"
            type="success"
            onClick={() => {
              if (handleToggleOperatorType && requestFSKeys) {
                handleToggleOperatorType(requestFSKeys);
              }
            }}
          >
            범위
          </Button>
        )}
      </div>
      <InputListItemH
        error={!!formState.errors.lowerBound || !!formState.errors.upperBound}
        errorMessage={
          formState.errors.lowerBound?.message
            ? formState.errors.lowerBound.message
            : formState.errors.upperBound?.message
        }
      >
        <div className="fields">
          <input
            type="text"
            {...register('lowerBound', {
              setValueAs: (v) => Number(v),
              validate: {
                lessThanUpperBound: (v) =>
                  v < getValues('upperBound') ||
                  '*하한값은 상한값보다 작아야 합니다.',
              },
            })}
            placeholder="하한값"
          />
          <span className="tail">~</span>
          <input
            type="text"
            {...register('upperBound', {
              setValueAs: (v) => Number(v),
              validate: {
                moreThanUpperBound: (v) =>
                  v > getValues('lowerBound') ||
                  '*상한값은 하한값보다 커야 합니다.',
              },
            })}
            placeholder="상한값"
          />
        </div>
      </InputListItemH>
    </SFilterListItem>
  );
};
// Refactor : 토글을 위해서    QSHeader,handleToggleOperatorType,requestFSKeys, 3개변수를 받는다?
// - handleToggleOperatorType 하나로 줄일것!

// up operator = 50 이상의 종목만 , 즉 하한값을 셋팅한다.
export const FilterListItemUpOperator: React.FC<IFilterListItem> = ({
  name,
  onChange,
  defaultFormValue,
  QSHeader,
  handleToggleOperatorType,
  requestFSKeys,
}) => {
  const { register, watch, formState, trigger } = useForm<IFilterForm>({
    defaultValues: {
      lowerBound: 0,
      upperBound: 99999,
      ...defaultFormValue,
    },
  });

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      trigger();
      if (onChange) onChange(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, trigger, onChange]);

  return (
    <SFilterListItem>
      <div className="title">
        {name}
        {QSHeader.strategy === 1 && (
          <Button
            className="badge"
            type="danger"
            onClick={() => {
              if (handleToggleOperatorType && requestFSKeys) {
                handleToggleOperatorType(requestFSKeys);
              }
            }}
          >
            하한값
          </Button>
        )}
      </div>
      <InputListItemH
        error={!!formState.errors.lowerBound || !!formState.errors.upperBound}
        errorMessage={
          formState.errors.lowerBound?.message
            ? formState.errors.lowerBound.message
            : formState.errors.upperBound?.message
        }
      >
        <div className="fields">
          <input
            type="text"
            {...register('lowerBound', {
              setValueAs: (v) => Number(v),
            })}
            placeholder="하한값"
          />
          <span className="tail">~</span>
          <div></div>
        </div>
      </InputListItemH>
    </SFilterListItem>
  );
};

// down operator = 50 이하의 종목만 , 즉 상한값을 셋팅한다.
export const FilterListItemDownOperator: React.FC<IFilterListItem> = ({
  name,
  onChange,
  defaultFormValue,
  QSHeader,
  handleToggleOperatorType,
  requestFSKeys,
}) => {
  const { register, watch, formState, trigger } = useForm<IFilterForm>({
    defaultValues: {
      lowerBound: -99999,
      upperBound: 20,
      ...defaultFormValue,
    },
  });

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      trigger();
      if (onChange) onChange(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, trigger, onChange]);

  return (
    <SFilterListItem>
      <div className="title">
        {name}
        {QSHeader.strategy === 1 && (
          <Button
            className="badge"
            type="warn"
            onClick={() => {
              if (handleToggleOperatorType && requestFSKeys) {
                handleToggleOperatorType(requestFSKeys);
              }
            }}
          >
            상한값
          </Button>
        )}
      </div>
      <InputListItemH
        error={!!formState.errors.lowerBound || !!formState.errors.upperBound}
        errorMessage={
          formState.errors.lowerBound?.message
            ? formState.errors.lowerBound.message
            : formState.errors.upperBound?.message
        }
      >
        <div className="fields">
          <span className="tail">~</span>
          <input
            type="text"
            {...register('upperBound', {
              setValueAs: (v) => Number(v),
            })}
            placeholder="상한값"
          />
        </div>
      </InputListItemH>
    </SFilterListItem>
  );
};

const SFilterListItem = styled.li`
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    .badge {
      margin-left: 1rem;
      min-width: 5rem;
      width: 5rem;
    }
  }
  .fields {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .tail {
      margin: 0rem 1rem;
    }
  }
  input:disabled {
    color: ${(props) => props.theme.ColorGrayL1};
    background-color: ${(props) => props.theme.ColorGrayL1};
  }
`;
