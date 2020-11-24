import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {getIsAuthSel} from "./selectors";
import {connect} from "react-redux";
import Users from "./components/Users/Users";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import NotFound from "./components/NotFound/NotFound";


function App({isAuth}) {
  return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login/"/>}/>
          <Route exact path="/users/" render={() => <Users/>}/>
          <Route exact path="/login/" render={() => <Login/>}/>
          <Route path="/*" render={() => <NotFound/>}/>
        </Switch>
      </div>
  )
}

const mapStateToProps = (state) => ({
  isAuth: getIsAuthSel(state),
});

export default connect(mapStateToProps, {})(App);
