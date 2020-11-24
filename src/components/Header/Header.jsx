import React from 'react';
import s from './Header.module.css'
import {connect} from "react-redux";
import {getIsAuthSel} from "../../selectors";
import {logOut} from "../../reducers/auth-reducer";
import {NavLink} from "react-router-dom";

const Header = ({isLogin, logOut, dispatch}) => {

  return (
      <div className={s.wrap}>
        {isLogin
            ? <span className={s.login} onClick={() => logOut()}>Log Out</span>
            : <NavLink className={s.login} to="/login">Log In</NavLink>}
      </div>
  )
}

const mapStateToProps = (state) => ({
  isLogin: getIsAuthSel(state),
})

export default connect(mapStateToProps, {logOut})(Header);