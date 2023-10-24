'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { setAuthorization } from '@/app/redux/slices/usersSlice';
import { validateUser } from '@/app/utils/api';
import { LoginType } from '@/types/Login';
import { useAppDispatch } from '@/types/ReduxHooks';
import ButtonLoader from '../button-loader/button-loader';
import { CloseIcon } from '../icons/icon-close';
import { LoginIcon } from '../icons/icon-login';
import { UserIcon } from '../icons/icon-user';
import { VisibilityIcon, VisibilityOffIcon } from '../icons/icon-visibility';
import { WarningIcon } from '../icons/icon-warning';
import { validation } from './form';

import style from './login-form.module.scss';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isErrorAuthorization, setIsErrorAuthorization] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validation),
  });

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      setIsLoading(true);
      const fetchData = await validateUser(data);
      dispatch(setAuthorization(fetchData));
      router.push('/table');
    } catch (error) {
      setIsErrorAuthorization(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClearErrorValidation = () => {
    setIsErrorAuthorization(false);
  };

  return (
    <div className={style.container}>
      <div className={style.titleWrapper}>
        <UserIcon />
        <h1 className={style.title}>LOGIN</h1>
      </div>

      <form className={style.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={style.label}>
          <p className={style.label__text}>Username *</p>
          <div className={style.input}>
            <input
              type="text"
              placeholder="Enter your username"
              {...register('username')}
              className={`${style.input__text} ${
                errors?.username?.message ? style.input__text__error : style.input__text__success
              }`}
            />
            <div className={style.input__errorDescription}>{errors.username?.message}</div>
          </div>
        </label>
        <label className={style.label}>
          <p className={style.label__text}>Password *</p>
          <div className={style.input}>
            <div className={style.passwordInput}>
              <input
                autoComplete="off"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                className={`${style.input__text} ${
                  errors?.password?.message ? style.input__text__error : style.input__text__success
                }`}
              />
              <div className={style.iconWrapper} onClick={handleTogglePasswordVisibility}>
                {!showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>
            <div className={style.input__errorDescription}>{errors.password?.message}</div>
          </div>
        </label>
        <div className={style.notValidInfo}>
          {isErrorAuthorization && (
            <>
              <WarningIcon />
              <span>Incorrect username or password</span>
              <CloseIcon onClick={handleClearErrorValidation} />
            </>
          )}
        </div>

        <button className={style.button} type="submit" disabled={isLoading}>
          <span>Login</span>
          {isLoading ? <ButtonLoader /> : <LoginIcon />}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
