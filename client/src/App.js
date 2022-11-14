import React,{useState,useEffect} from "react";
import Login from './Login'
import Upload from './Upload'
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";

const App = () => {
  return(
  <>
  <Router>
    <Routes>
      <Route exact path="/"/>
        <Login/>
      <Route path="/Upload" component={Upload} />
    </Routes>
  </Router>
  </>
  )
}

export default App