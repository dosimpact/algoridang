import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { atomBasicSetting } from 'states/recoil/strategy-create';
import { IInspectorSettings } from './index';

interface IFormBasicSetting {
  strategy_name: string; // 전략 이름
  strategy_explanation: string; // 전략 설명
  tags: string;

  invest_principal: string; // 투자 원금
  invest_start_date: string; // 백테스트 시작일
  securities_corp_fee: string; // 수수료

  open_yes_no: boolean; // 공개범위
}

interface IBaseSettings extends IInspectorSettings {}

/**
 * 인스팩터 - 기본설정
 */
const BaseSettings: React.FC<IBaseSettings> = ({ headerTitle }) => {
  const [basicSetting, setBasicSetting] = useRecoilState(atomBasicSetting);
  const { register, watch } = useForm<IFormBasicSetting>({
    defaultValues: {
      ...basicSetting,
      tags: basicSetting.tags.join(' '),
    },
  });

  // 구독 함수를 통해, DOM InputElemet - Recoil 상태를 바인딩 한다.
  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type);
      setBasicSetting((prev) => ({
        ...prev,
        ...value,
        tags: value.tags.split(' '),
        open_yes_no: value.open_yes_no,
      }));
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setBasicSetting]);

  return (
    <div>
      <InspectorHeaderDetail headerTitle={headerTitle || 'BaseSettings'} />
      BaseSettings
      <form>
        <div>전략 이름</div>
        <input {...register('strategy_name')} placeholder="전략 이름"></input>
        <div>전략 설명</div>
        <input
          {...register('strategy_explanation')}
          placeholder="전략 설명"
        ></input>
        <div>태그</div>
        <input {...register('tags')} placeholder="태그"></input>
        <div>운용자금</div>
        <input {...register('invest_principal')} placeholder="운용자금"></input>
        <div>백테스트 시작 날짜</div>
        <input
          type="date"
          {...register('invest_start_date')}
          placeholder="전략이름"
        ></input>
        <div>수수료</div>
        <input
          {...register('securities_corp_fee')}
          placeholder="수수료"
        ></input>
        <div>공개 범위</div>
        <select
          {...register('open_yes_no', {
            setValueAs: (v) => (v === 'true' ? true : false),
          })}
        >
          <option value={'true'}>public</option>
          <option value={'false'}>private</option>
        </select>
      </form>
    </div>
  );
};

export default BaseSettings;
