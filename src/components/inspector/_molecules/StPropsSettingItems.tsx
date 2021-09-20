import { Button } from 'components/_atoms/Buttons';
import InputListItem from 'components/_atoms/InputListItem';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SettingJSON } from 'states/interface/trading/entities';

interface IStProps {
  onSubmit?: (e: SettingJSON) => void;
  setting_json?: SettingJSON;
}

interface IStPropsSMAForm {
  SMA_A: number;
}
interface IStPropsSMA extends IStProps {}
export const StPropsSMA: React.FC<IStPropsSMA> = ({
  children,
  onSubmit,
  setting_json,
}) => {
  const { register, formState, handleSubmit } = useForm<IStPropsSMAForm>({
    defaultValues: { SMA_A: setting_json?.SMA?.SMA_A || 10 },
  });

  const submitHandler = handleSubmit((data) => {
    if (onSubmit) {
      onSubmit({ SMA: data });
    }
  });

  return (
    <div>
      <form onSubmit={submitHandler}>
        <InputListItem>
          <label htmlFor="SMA_A">단순이평선 정배열</label>
          <input type="text" id="SMA_A" {...register('SMA_A')} />
        </InputListItem>
        <Button onClick={submitHandler}>적용</Button>
      </form>
    </div>
  );
};

interface IStPropsGoldenCrossForm {
  pfast: number;
  pslow: number;
}
interface IStPropsGoldenCross extends IStProps {}

export const StPropsGoldenCross: React.FC<IStPropsGoldenCross> = ({
  onSubmit,
  setting_json,
}) => {
  const { register, formState, handleSubmit } =
    useForm<IStPropsGoldenCrossForm>({
      defaultValues: {
        pfast: setting_json?.GoldenCross?.pfast || 20,
        pslow: setting_json?.GoldenCross?.pslow || 5,
      },
    });

  const submitHandler = handleSubmit((data) => {
    if (onSubmit) {
      onSubmit({ GoldenCross: data });
    }
  });

  return (
    <div>
      <form onSubmit={submitHandler}>
        <InputListItem>
          <label htmlFor="pfast">장기</label>
          <input type="text" id="pfast" {...register('pfast')} />
        </InputListItem>
        <InputListItem>
          <label htmlFor="pslow">단기</label>
          <input type="text" id="pslow" {...register('pslow')} />
        </InputListItem>
        <Button onClick={submitHandler}>적용</Button>
      </form>
    </div>
  );
};
