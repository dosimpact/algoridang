import { Button } from 'components/common/_atoms/Buttons';
import InputListItem from 'components/common/_atoms/InputListItem';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SettingJSON } from 'states/trading/interface/entities';

interface IStProps {
  onSubmit?: (e: SettingJSON) => void;
  setting_json?: SettingJSON;
}

// Addon -StrategyName
// 늘어나는 상세 전략에 대해 상속을 통해 구현합니다.

// GoldenCross
interface IStPropsGoldenCross extends IStProps {}
interface IStPropsGoldenCrossForm {
  pfast: number;
  pslow: number;
}

export const StPropsGoldenCross: React.FC<IStPropsGoldenCross> = ({
  onSubmit,
  setting_json,
}) => {
  const { register, handleSubmit, getValues, formState, setValue } =
    useForm<IStPropsGoldenCrossForm>({
      defaultValues: {
        pfast: setting_json?.GoldenCross?.pfast || 5,
        pslow: setting_json?.GoldenCross?.pslow || 20,
      },
    });
  // ✅ 이슈 해결
  // -- react-hook-form의 defaultvalue는 한번만 랜더링 되므로
  // -- 그 이후에 비동기적으로 가져온 데이터로 , input value를 변경하려면 setValue를 사용해야한다.
  useEffect(() => {
    setValue('pfast', setting_json?.GoldenCross?.pfast || 5);
    setValue('pslow', setting_json?.GoldenCross?.pslow || 20);
    return () => {};
  }, [setting_json, setValue]);

  const submitHandler = handleSubmit((data) => {
    toast.success('적용 완료', {
      position: 'bottom-right',
    });
    if (onSubmit) {
      onSubmit({ GoldenCross: data });
    }
  });

  return (
    <div>
      <form onSubmit={submitHandler}>
        <InputListItem
          error={!!formState.errors.pfast}
          errorMessage={formState.errors.pfast?.message}
        >
          <label htmlFor="pfast">단기</label>
          <input
            type="text"
            id="pfast"
            {...register('pfast', {
              setValueAs: (v) => Number(v),
              validate: {
                'lessThan-pfast': (v) =>
                  Number(v) < getValues('pslow') ||
                  '*단기지표값은 장기보다 작아야합니다.',
              },
            })}
          />
        </InputListItem>

        <InputListItem
          error={!!formState.errors.pslow}
          errorMessage={formState.errors.pslow?.message}
        >
          <label htmlFor="pslow">장기</label>
          <input
            type="text"
            id="pslow"
            {...register('pslow', {
              setValueAs: (v) => Number(v),
              validate: {
                'moreThan-pfast': (v) =>
                  Number(v) > getValues('pfast') ||
                  '*장기지표값은 단기보다 커야합니다.',
              },
            })}
          />
        </InputListItem>

        <Button type="success" onClick={submitHandler}>
          적용
        </Button>
      </form>
    </div>
  );
};

// RSI

interface IStPropsRSI extends IStProps {}
interface IStPropsRSIForm {
  min: number;
  max: number;
}

export const StPropsRSI: React.FC<IStPropsRSI> = ({
  onSubmit,
  setting_json,
}) => {
  const { register, handleSubmit, getValues } = useForm<IStPropsRSIForm>({
    defaultValues: {
      min: setting_json?.RSI?.min || 30,
      max: setting_json?.RSI?.max || 70,
    },
  });

  const submitHandler = handleSubmit((data) => {
    if (onSubmit) {
      onSubmit({ RSI: data });
    }
  });

  return (
    <div>
      <form onSubmit={submitHandler}>
        <InputListItem>
          <label htmlFor="min">RSI 하단</label>
          <input
            type="text"
            id="min"
            {...register('min', {
              setValueAs: (v) => Number(v),
              validate: {
                lessThan: (v) => Number(v) < getValues('max'),
              },
            })}
          />
        </InputListItem>
        <InputListItem>
          <label htmlFor="max">RSI 상단</label>
          <input
            type="text"
            id="max"
            {...register('max', {
              setValueAs: (v) => Number(v),
              validate: {
                moreThan: (v) => Number(v) > getValues('min'),
              },
            })}
          />
        </InputListItem>
        <Button type="success" onClick={submitHandler}>
          적용
        </Button>
      </form>
    </div>
  );
};

// BollingerBand
interface IStPropsBollingerBand extends IStProps {}
interface IStPropsBollingerBandForm {
  period: number;
}

export const StPropsBollingerBand: React.FC<IStPropsBollingerBand> = ({
  onSubmit,
  setting_json,
}) => {
  const { register, handleSubmit } = useForm<IStPropsBollingerBandForm>({
    defaultValues: {
      period: setting_json?.BollingerBand?.period || 70,
    },
  });

  const submitHandler = handleSubmit((data) => {
    if (onSubmit) {
      onSubmit({ BollingerBand: data });
    }
  });

  return (
    <div>
      <form onSubmit={submitHandler}>
        <InputListItem>
          <label htmlFor="period">기간</label>
          <input
            type="text"
            id="period"
            {...register('period', {
              setValueAs: (v) => Number(v),
              validate: {
                moreThan: (v) => Number(v) > 1,
              },
            })}
          />
        </InputListItem>
        <Button type="success" onClick={submitHandler}>
          적용
        </Button>
      </form>
    </div>
  );
};

// MACD
interface IStPropsMACD extends IStProps {}
interface IStPropsMACDForm {
  pfast: number;
  pslow: number;
  value: number;
}

export const StPropsMACD: React.FC<IStPropsMACD> = ({
  onSubmit,
  setting_json,
}) => {
  const { register, handleSubmit, getValues } = useForm<IStPropsMACDForm>({
    defaultValues: {
      pfast: setting_json?.MACD?.pfast || 12,
      pslow: setting_json?.MACD?.pslow || 26,
      value: setting_json?.MACD?.value || 9,
    },
  });

  const submitHandler = handleSubmit((data) => {
    if (onSubmit) {
      onSubmit({ MACD: data });
    }
  });

  return (
    <div>
      <form onSubmit={submitHandler}>
        <InputListItem>
          <label htmlFor="pfast">단기</label>
          <input
            type="text"
            id="pfast"
            {...register('pfast', {
              setValueAs: (v) => Number(v),
              validate: {
                lessThan: (v) =>
                  Number(v) < getValues('pslow') || '* 장기보다 작아야합니다.',
              },
            })}
          />
        </InputListItem>
        <InputListItem>
          <label htmlFor="pslow">장기</label>
          <input
            type="text"
            id="pslow"
            {...register('pslow', {
              setValueAs: (v) => Number(v),
              validate: {
                moreThan: (v) =>
                  Number(v) > getValues('pfast') || '* 단기보다 커야합니다.',
              },
            })}
          />
        </InputListItem>
        <InputListItem>
          <label htmlFor="value">시그널</label>
          <input
            type="text"
            id="value"
            {...register('value', {
              setValueAs: (v) => Number(v),
              validate: {
                moreThan: (v) => Number(v) >= 1 || '* 1보다 커야합니다.',
              },
            })}
          />
        </InputListItem>
        <Button type="success" onClick={submitHandler}>
          적용
        </Button>
      </form>
    </div>
  );
};
