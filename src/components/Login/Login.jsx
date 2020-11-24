import React from 'react';
import s from './Login.module.css'
import {getIsAuthSel} from "../../selectors";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";
import {setAuthUser} from "../../reducers/auth-reducer";

const AuthForm = ({handleSubmit, onSubmitHandler, error}) => {
  return (
      <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={s.inputWrap}>
          <Field className={s.input} name="login" component="input" type="text" placeholder="login"/>
        </div>
        <div className={s.inputWrap}>
          <Field className={s.input} name="password" component="input" type="password" placeholder="password"/>
        </div>

        {error && <div className={s.error}>
          <span>{error}</span>
        </div>}

        <button className={s.button}>Log In</button>
      </form>
  )
};


const AuthReduxForm = reduxForm({form: "auth"})(AuthForm);

const Login = ({isAuth, setAuthUser}) => {

  const onSubmit = (formData) => {
    setAuthUser(formData.login, formData.password);
  };

  return (
      <>
        {isAuth && <Redirect to="/users"/>}
        <section className={s.wrap}>
          <AuthReduxForm onSubmitHandler={onSubmit}/>
        </section>
      </>
  )
};


const mapStateToProps = (state) => ({
  isAuth: getIsAuthSel(state),
});

export default connect(mapStateToProps, {setAuthUser,})(Login);