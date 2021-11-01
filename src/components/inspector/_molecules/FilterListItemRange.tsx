import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import InputListItemH from 'components/common/_atoms/InputListItemH';

interface IFilterForm {
  lowerBound: number;
  upperBound: number;
}

interface IFilterListItem {
  name: string;
  defaultFormValue?: Partial<IFilterForm>;
  type: 'up' | 'down' | 'between';
  onChange?: (e: IFilterForm) => void;
}

const FilterListItemRange: React.FC<IFilterListItem> = ({
  name,
  onChange,
  defaultFormValue,
  type = 'between',
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
      <div className="title">{name}</div>
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
            disabled={type === 'down'}
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
            disabled={type === 'up'}
          />
        </div>
      </InputListItemH>
    </SFilterListItem>
  );
};

export default FilterListItemRange;

const SFilterListItem = styled.li`
  .title {
    margin-bottom: 0.5rem;
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
