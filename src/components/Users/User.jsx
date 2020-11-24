import React from 'react';
import s from './User.module.css'

const User = ({first_name, id, is_active, is_superuser, last_login, last_name, username}) => {
  return (
      <div className={s.item}>
        <span className={s.userInfo}>first name: {first_name || "no info"}</span>
        <span className={s.userInfo}>id: {id || "no info"}</span>
        <span className={s.userInfo}>is
          active: {is_active === false ? "false" : is_active === true ? "true" : "no info"}</span>
        <span className={s.userInfo}>is
          superuser: {is_superuser === false ? "false" : is_active === true ? "true" : "no info"}</span>
        <span className={s.userInfo}>last login: {last_login === null ? "null" : last_login}</span>
        <span className={s.userInfo}>last name: {last_name || "no info"}</span>
        <span className={s.userInfo}>username: {username || "no info"}</span>
      </div>
  )
}

export default User;