import React, { useState } from 'react';
import { Button } from 'components/common/_atoms/Buttons';
import useMember from 'states/member/query/useMember';
import NavHeaderDetail from 'components/common/_molecules/NavHeaderDetail';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import InputListItemH from 'components/common/_atoms/InputListItemH';
import { toast } from 'react-toastify';

interface ILoginForm {
  email: string;
  password: string;
}

const UserLoginForm = () => {
  const { logIn, logInMutation } = useMember();
  const { trigger, register, handleSubmit, formState } = useForm<ILoginForm>({
    defaultValues: { email: '', password: '' },
  });
  const handleLogin = handleSubmit((data) => {
    toast.promise(
      logInMutation.mutateAsync({
        email_id: data.email,
        password: data.password,
      }),
      {
        pending: '로그인 ',
        success: '로그인 성공',
        error: '이메일 비밀번호를 다시 확인해주세요',
      },
      { autoClose: 2500, position: 'top-center' },
    );
  });
  return (
    <div>
      <form>
        <InputListItemH
          error={!!formState.errors.email}
          errorMessage={formState.errors.email?.message}
        >
          <input
            type="text"
            placeholder="이메일"
            {...register('email', {
              required: '*이메일 입력 필수',
            })}
          />
        </InputListItemH>
        <InputListItemH
          error={!!formState.errors.password}
          errorMessage={formState.errors.password?.message}
        >
          <input
            type="password"
            placeholder="비밀번호"
            {...register('password', {
              required: '*비밀번호 입력 필수',
            })}
          />
        </InputListItemH>
        <Button onClick={handleLogin} className="btn" type="normal">
          로그인
        </Button>
      </form>
    </div>
  );
};

export default UserLoginForm;
