import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import InputListItemH from 'components/common/_atoms/InputListItemH';

interface IFilterListItem {
  name: string;
  defaultFormValue?: IFilterForm;
  onChange?: (e: IFilterForm) => void;
}
interface IFilterForm {
  lowerBound: number;
  upperBound: number;
}

const FilterListItemRange: React.FC<IFilterListItem> = ({
  name,
  onChange,
  defaultFormValue,
}) => {
  const { register, watch, getValues, formState, trigger } =
    useForm<IFilterForm>({
      defaultValues: { ...defaultFormValue },
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
                  '*하안값은 상한값보다 작아야 합니다.',
              },
            })}
            placeholder="하안값"
          />
          <span className="tail">~</span>
          <input
            type="text"
            {...register('upperBound', {
              setValueAs: (v) => Number(v),
              validate: {
                moreThanUpperBound: (v) =>
                  v > getValues('lowerBound') ||
                  '*상한값은 하안값보다 커야 합니다.',
              },
            })}
            placeholder="상한값"
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
`;
