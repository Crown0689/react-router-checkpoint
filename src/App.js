import React from 'react'
import Login from './components/Login'
import TopNav from './components/TopNav'
import { Route } from 'react-router-dom';
import Signup from './components/Signup'
import UserProfile from './components/UserProfile'
import './App.css'

export const App = () => {
  return (
    <div>
      <TopNav />
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/signup" component={Signup} />
    </div>
  )
}

export default App
