import React, { useEffect, useRef } from "react";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { useLogin } from "../../store/auth/hooks/useLogin";
import { InputField } from "../../components/input-field/input-field";
import {
  useFormErrorMessage,
  useFormErrorStatus,
} from "../../store/auth/hooks/selectors";
import { useResetErrors } from "../../store/auth/hooks/useResetErrors";
import { ErrorsList } from "../../components/errors-list/errors-list";

export const Login: React.FC = (): JSX.Element => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);

  const errorMessages = useFormErrorMessage();
  const isFormError = useFormErrorStatus();

  const onSubmit = useLogin();
  const resetErrors = useResetErrors();

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    onSubmit({
      login: (loginRef.current as HTMLInputElement).value,
      password: (passwordRef.current as HTMLInputElement).value,
    });
  };

  useEffect(() => {
    return () => {
      resetErrors();
    };
  }, [resetErrors]);

  return (
    <>
      <Header isMain={false} headerText="Sign In" />
      <div className="sign-in">
        {isFormError && <ErrorsList errorMessages={errorMessages} />}
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <InputField
              ref={loginRef}
              placeholder="Login"
              name="user-login"
              required
            />
            <InputField
              ref={passwordRef}
              placeholder="Password"
              name="user-password"
              required
              type="password"
            />
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
