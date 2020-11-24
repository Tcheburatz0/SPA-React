import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./NotFound.module.css"

const NotFound = (props) => {
  return (
      <div className={s.wrap}>
        <span className={s.number}>404</span>
        <span className={s.info}>page not found</span>
        <NavLink className={s.link} to="/users">Home</NavLink>
      </div>
  )
}

export default NotFound;