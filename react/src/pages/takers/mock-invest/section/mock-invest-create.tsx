import React, { useMemo } from 'react';
import { Title } from 'components/common/_atoms/Typos';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import WingBlank from 'components/common/_atoms/WingBlank';
import NavHeaderDetail from 'components/common/_molecules/NavHeaderDetail';
import StrategyCardInfo from 'components/common/_molecules/StrategyCardInfo';
import { useHistory, useParams } from 'react-router-dom';
import useStrategyDetail from 'states/strategy/query/useStrategyDetail';
import { Button } from 'components/common/_atoms/Buttons';
import { useForm } from 'react-hook-form';
import { useForkStrategy } from 'states/strategy/query/useForkStrategy';
import InputListItem from 'components/common/_atoms/InputListItem';
import { toast } from 'react-toastify';
import styled from 'styled-components';

interface IForkStrategyForm {
  strategy_code: string; // "52",
  strategy_name: string; // "따라해보는 전략 테스트",
  invest_principal: string; // "8800000",
  securities_corp_fee: string; // "8.8"
}

const MockInvestCreate = () => {
  // route 처리
  const history = useHistory();
  const params = useParams() as { id: string };
  const strategyCode = params?.id || 0;
  if (strategyCode === 0) {
    history.push('/');
  }

  // 전략에 대한 정보
  const { strategyDetailQuery } = useStrategyDetail(strategyCode + '');
  const memberStrategy = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy,
    [strategyDetailQuery?.data],
  );

  // form 처리
  const { register, handleSubmit, formState, getValues } =
    useForm<IForkStrategyForm>({
      defaultValues: {
        strategy_code: String(strategyCode),
        securities_corp_fee: '0.3',
        invest_principal: '10000000',
      },
    });

  // mutation 처리
  const { forkStrategyMutation } = useForkStrategy();
  console.log('formState.errors', formState.errors);

  const handleForkStrategy = handleSubmit(async (data) => {
    forkStrategyMutation.mutate(data);
    toast.success('전략 생성 완료. 나의 모의투자에서 확인해보세요. ✨');
    setTimeout(() => {
      history.push(process.env.PUBLIC_URL + `/takers/mock-invest`);
    }, 500);
  });

  return (
    <SMockInvestCreate>
      <NavHeaderDetail
        linkTo={
          process.env.PUBLIC_URL +
          `/takers/strategy-search/details/${strategyCode}`
        }
        headerTitle="전략 생성 하기"
      />
      <WingBlank>
        <WhiteSpace />
        {strategyDetailQuery.isLoading && 'loading...'}
        {memberStrategy && <StrategyCardInfo strategy={memberStrategy} />}
        <WhiteSpace />
        <Title title={'기본 설정'} />
        <WhiteSpace />
        <InputListItem>
          <label>전략 코드</label>
          <input type="text" disabled value={getValues('strategy_code')} />
        </InputListItem>
        <InputListItem
          error={!!formState.errors.strategy_name?.message}
          errorMessage={formState.errors.strategy_name?.message}
        >
          <label htmlFor="strategy_name">전략이름</label>
          <input
            type="text"
            id="strategy_name"
            placeholder="eg) 1번 전략"
            {...register('strategy_name', {
              required: '* 전략 이름 필수',
              validate: {
                lessThan: (v) => v.length <= 50 || '* 50자 이하',
                MoreThan: (v) => v.length >= 2 || '* 2자 이상',
              },
            })}
          />
        </InputListItem>
        <WhiteSpace />
        <Title title={'사용자 설정'} />
        <WhiteSpace />
        <>
          <InputListItem
            error={!!formState.errors.invest_principal?.message}
            errorMessage={formState.errors.invest_principal?.message}
          >
            <label htmlFor="invest_principal">원금</label>
            <input
              type="text"
              id="invest_principal"
              placeholder="투자 시작 금액을 입력해주세요"
              {...register('invest_principal', {
                required: '* 투자 시작금액 입력 예) 1000만원',
                validate: {
                  moreThan: (v) =>
                    Number(v) >= 1000000 || '* 100만원 보다 큰 금액',
                },
              })}
            />
          </InputListItem>
          {/* <InputListItem
              error={!!formState.errors.securities_corp_fee?.message}
              errorMessage={formState.errors.securities_corp_fee?.message}
            >
              <label htmlFor="securities_corp_fee">수수료(%)</label>
              <input
                type="text"
                id="securities_corp_fee"
                placeholder="거래당 발생하는 수수료"
                {...register('securities_corp_fee', {
                  required: '* 거래 수수료 입력 예) 0.01',
                  validate: {
                    lessThan: (v) => Number(v) < 100 || '* 100 보다 작은 금액',
                    moreThan: (v) => Number(v) > 0 || '* 0보다 큰 금액',
                  },
                })}
              />
            </InputListItem> */}
        </>
        <WhiteSpace />

        <Button
          style={{
            height: '4.6rem',
            fontSize: '1.8rem',
            lineHeight: '1.6rem',
          }}
          onClick={handleForkStrategy}
        >
          전략 생성 및 백테스팅 시작
        </Button>
      </WingBlank>
    </SMockInvestCreate>
  );
};

export default MockInvestCreate;

const SMockInvestCreate = styled.section`
  input[type='text'] {
    all: unset;
  }
`;
