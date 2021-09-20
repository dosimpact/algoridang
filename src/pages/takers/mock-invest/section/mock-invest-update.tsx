import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'components/common/_atoms/Buttons';
import InputListItem from 'components/_atoms/InputListItem';
import { Title } from 'components/_atoms/Typos';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import WingBlank from 'components/common/_atoms/WingBlank';
import NavHeaderDetail from 'components/common/_molecules/NavHeaderDetail';
import StrategyCardBox from 'components/common/_molecules/StrategyCardBox';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import useStrategyDetail from 'states/react-query/strategy/useStrategyDetail';
import { toTagsString, toTickerImage } from 'utils/parse';
import { useUpdateMyStrategy } from 'states/react-query/strategy/useUpdateMyStrategy';

interface IForkStrategyForm {
  strategy_code: string; // "52",
  strategy_name: string; // "따라해보는 전략 테스트",
  invest_principal: string; // "8800000",
  securities_corp_fee: string; // "8.8"
}
/**
 * - get 전략 코드 - route params를 통해
 * - get 전략 정보 - react-query
 * - formstate 전략 수정 폼
 * - set formstate 기존 전략정보로 폼 업데이트
 * - handler 전략 수정
 * - handler 전략 삭제
 * @returns
 */
const MockInvestUpdate = () => {
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
  const { register, handleSubmit, formState, getValues, setValue } =
    useForm<IForkStrategyForm>({
      defaultValues: {
        strategy_code: String(strategyCode),
        securities_corp_fee: '0.1',
        invest_principal: '10000000',
      },
    });
  // update exist data to formState
  useEffect(() => {
    const onStrategyDetailQuerySuccess = () => {
      // console.log('strategyDetailQuery useEffect', strategyDetailQuery);
      if (
        strategyDetailQuery.status === 'success' &&
        strategyDetailQuery.data.memberStrategy
      ) {
        const data = strategyDetailQuery.data.memberStrategy;
        setValue('strategy_name', data?.strategy_name);
        setValue(
          'securities_corp_fee',
          data?.investProfitInfo.securities_corp_fee,
        );
        setValue('invest_principal', data?.investProfitInfo.invest_principal);
      }
    };
    onStrategyDetailQuerySuccess();
    return () => {};
  }, [strategyDetailQuery, setValue]);

  // 전략 수정
  const { updateMyStrategyMutation } = useUpdateMyStrategy();
  const handleUpdateStrategy = handleSubmit(async (data) => {
    updateMyStrategyMutation.mutate(data);
    toast.success('전략 수정 완료. 나의 모의투자에서 확인해보세요. ✨');
    setTimeout(() => {
      history.push(process.env.PUBLIC_URL + `/takers/mock-invest`);
    }, 500);
  });

  // 전략 삭제
  const [cnt, setCnt] = useState(0);
  const handleDeleteMyStrategy = () => {
    if (cnt === 0) {
      setCnt(cnt + 1);
      toast.warn('정말 전략 삭제를 하시겠습니까? (한번더 클릭)');
    } else {
      toast.success('전략 삭제 완료 ✨');
    }
  };

  return (
    <>
      <NavHeaderDetail
        linkTo={
          process.env.PUBLIC_URL + `/takers/mock-invest/details/${strategyCode}`
        }
        headerTitle="전략 수정 하기"
      />
      <WingBlank>
        {strategyDetailQuery.isLoading && 'loading...'}

        {memberStrategy && (
          <StrategyCardBox
            title={memberStrategy.strategy_name}
            subTitle={toTagsString(
              memberStrategy.hashList?.map((e) => e?.hash?.hash_contents),
            )}
            CAGR={
              memberStrategy?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(memberStrategy?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={
              memberStrategy.universal.length >= 1
                ? toTickerImage(memberStrategy.universal[0].ticker)
                : ''
            }
            onErrorImg={memberStrategy.image_url}
          />
        )}
        <WingBlank>
          <Title title={'기본 설정'} />
          <WhiteSpace />
          <InputListItem>
            <label>전략 코드</label>
            <input disabled value={getValues('strategy_code')} />
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

            <InputListItem
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
            </InputListItem>
          </>
          <WhiteSpace />
        </WingBlank>
        <Button
          style={{
            height: '4.6rem',
            fontSize: '1.8rem',
            lineHeight: '1.6rem',
          }}
          onClick={handleUpdateStrategy}
        >
          전략 수정하기
        </Button>
        <WhiteSpace />
        <Title title={'정보 삭제'} />
        <WhiteSpace marginV="0.5" />
        <Button
          type="danger"
          style={{
            height: '4.6rem',
            fontSize: '1.8rem',
            lineHeight: '1.6rem',
          }}
          onClick={handleDeleteMyStrategy}
        >
          전략 삭제하기
        </Button>
      </WingBlank>
    </>
  );
};

export default MockInvestUpdate;
