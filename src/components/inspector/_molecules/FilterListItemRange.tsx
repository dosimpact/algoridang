import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

interface IFilterListItem {
  name: string;
  defaultFormValue?: IFilterForm;
  onChange?: (e: IFilterForm) => void;
}
interface IFilterForm {
  lowerBound: string;
  upperBound: string;
}

const FilterListItemRange: React.FC<IFilterListItem> = ({
  name,
  onChange,
  defaultFormValue,
}) => {
  const { register, watch } = useForm<IFilterForm>({
    defaultValues: { ...defaultFormValue },
  });

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type);
      if (onChange) onChange(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  });

  return (
    <SFilterListItem>
      <div className="title">{name}</div>
      <div className="fields">
        <input type="text" {...register('lowerBound')} placeholder="0" />
        <span className="tail">~</span>
        <input type="text" {...register('upperBound')} placeholder="100" />
      </div>
    </SFilterListItem>
  );
};

export default FilterListItemRange;

const SFilterListItem = styled.li`
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
