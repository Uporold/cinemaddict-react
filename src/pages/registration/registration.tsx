import React, { useEffect, useRef } from "react";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { InputField } from "../../components/input-field/input-field";
import { useRegistration } from "../../store/auth/hooks/useRegistration";
import {
  useFormErrorMessage,
  useFormErrorStatus,
} from "../../store/auth/hooks/selectors";
import { useResetErrors } from "../../store/auth/hooks/useResetErrors";
import { ErrorsList } from "../../components/errors-list/errors-list";

export const Registration: React.FC = (): JSX.Element => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const onSubmit = useRegistration();

  const errorMessages = useFormErrorMessage();
  const isFormError = useFormErrorStatus();
  const resetErrors = useResetErrors();

  useEffect(() => {
    return () => {
      resetErrors();
    };
  }, [resetErrors]);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    onSubmit({
      email: (emailRef.current as HTMLInputElement).value,
      login: (loginRef.current as HTMLInputElement).value,
      password: (passwordRef.current as HTMLInputElement).value,
      name: (nameRef.current as HTMLInputElement).value,
    });
  };
  return (
    <>
      <Header isMain={false} headerText="Registration" />
      <div className="sign-in">
        {isFormError && <ErrorsList errorMessages={errorMessages} />}
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <InputField
              ref={emailRef}
              placeholder="Email address"
              name="user-email"
              required
            />
            <InputField
              ref={loginRef}
              placeholder="login"
              name="user-login"
              required
            />
            <InputField
              ref={nameRef}
              placeholder="Name"
              name="user-name"
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
              Register
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
