import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { InputField } from "../../components/input-field/input-field";
import { ErrorsList } from "../../components/errors-list/errors-list";
import { useStore } from "../../store";

export const Login: React.FC = observer((): JSX.Element => {
  const {
    authStore: { errorMessages, isFormError, login, resetErrors },
  } = useStore();

  const passwordRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    await login({
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
});
