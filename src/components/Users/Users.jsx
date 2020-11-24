import React, {useEffect, useState} from 'react';
import s from './Users.module.css'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getFilteredUsersSel, getIsAuthSel, getSortSel, getTokenSel, getUsersSel} from "../../selectors";
import {filteredUsersAC, setUsers, sortUsersAC} from "../../reducers/users-reducer";
import User from "./User";

const Users = ({isAuth, setUsers, filteredUsersAC, sortUsersAC, filteredUsers, sort}) => {

  const [filter, setFilter] = useState("");

  useEffect(() => {
    setUsers();
  }, []);

  const filtred = (e) => {
    setFilter(e.target.value);
    filteredUsersAC(e.target.value);
  };

  if (!isAuth) {
    return <Redirect to='login'/>
  }

  const filteredUsersToJSX = filteredUsers.map(u => <User key={u.id} firstname={u.first_name} id={u.id}
                                                        username={u.username}
                                                        is_superuser={u.is_superuser}
                                                        last_name={u.last_name} is_active={u.is_active}
                                                        last_login={u.last_login}/>);

  return (
      <>
        <div className={s.wrap}>
          <div className={s.filterWrap}>
            <input className={s.filter} onChange={filtred} type="text" placeholder="filter..." value={filter}/>
          </div>

          <div className={s.infoWrap}>
            {sort === "" || sort === "descending"
                ? <button className={s.button} onClick={sortUsersAC}>Sort &darr;</button>
                : <button className={s.button} onClick={sortUsersAC}>Sort &uarr; </button>
            }

            <span className={s.countWrap}>Quantity of users: <span
                className={s.countNum}>{filteredUsers.length}</span></span>

            <span className={s.sortWrap}>Sort: <span
                className={s.sortInfo}>{sort || "none"}</span></span>
          </div>
          {filteredUsersToJSX}
        </div>
      </>
  )
};

const mapStateToProps = (state) => ({
  isAuth: getIsAuthSel(state),
  token: getTokenSel(state),
  users: getUsersSel(state),
  filteredUsers: getFilteredUsersSel(state),
  sort: getSortSel(state),
});

export default connect(mapStateToProps, {setUsers, filteredUsersAC, sortUsersAC})(Users);