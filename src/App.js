import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserList from "./pages/UserList"
import UserCreate from "./pages/UserCreate"
import UserEdit from "./pages/UserEdit"
import UserShow from "./pages/UserShow"
import Login from "./pages/Login"
import Registration from "./pages/Registration"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/" element={<UserList />} />
        <Route path="/create" element={<UserCreate />} />
        <Route path="/edit/:id" element={<UserEdit />} />
        <Route path="/show/:id" element={<UserShow />} />
      </Routes>
    </Router>
  );
}

export default App;