import React from 'react';
import { Button } from 'components/common/_atoms/Buttons';
import useMember from 'states/member/query/useMember';
import { useForm } from 'react-hook-form';
import InputListItemH from 'components/common/_atoms/InputListItemH';
import { toast } from 'react-toastify';

interface ILoginSignForm {
  email: string;
  password: string;
  password_re: string;
  member_name: string;
}

const UserSignUpForm = () => {
  const { createMemberMutation, logInMutation } = useMember();
  const { register, handleSubmit, formState, getValues } =
    useForm<ILoginSignForm>({
      defaultValues: {
        email: '',
        password: '',
        member_name: '',
        password_re: '',
      },
    });
  const handleSignUp = handleSubmit(async (data) => {
    toast.promise(
      async () => {
        const res = await createMemberMutation.mutateAsync({
          email_id: data.email,
          password: data.password,
          member_name: data.member_name,
        });
        console.log(res.status);

        await logInMutation.mutateAsync({
          email_id: data.email,
          password: data.password,
        });
      },
      {
        pending: '회원정보 생성중...',
        success: '회원가입 완료 ✨',
        error: `이미 가입된 이메일 입니다.😢`,
      },
      { autoClose: 2300, position: 'top-center' },
    );
  });

  return (
    <div>
      <form>
        <InputListItemH
          error={!!formState.errors.member_name}
          errorMessage={formState.errors.member_name?.message}
        >
          <input
            type="text"
            placeholder="닉네임"
            {...register('member_name', {
              required: '*닉네임 입력 필수',
              validate: {
                lessThan: (s) => s.length <= 10 || '*10자 이하',
                moreThan: (s) => s.length >= 2 || '*2자 이상',
              },
            })}
          />
        </InputListItemH>

        <InputListItemH
          error={!!formState.errors.email}
          errorMessage={formState.errors.email?.message}
        >
          <input
            type="text"
            placeholder="이메일"
            {...register('email', {
              required: '*이메일 입력 필수',
              validate: {
                isEmail: (s) =>
                  new RegExp(
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  ).test(s) || '*이메일 형식이 아닙니다.',
              },
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

        <InputListItemH
          error={!!formState.errors.password_re}
          errorMessage={formState.errors.password_re?.message}
        >
          <input
            type="password"
            placeholder="비밀번호 확인"
            {...register('password_re', {
              required: '*비밀번호 확인 입력 필수',
              validate: {
                checkEqual: (s) =>
                  getValues('password') === s || '*비밀번호가 다릅니다.',
              },
            })}
          />
        </InputListItemH>
        <Button onClick={handleSignUp} className="btn" type="normal">
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default UserSignUpForm;
