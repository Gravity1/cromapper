import React from 'react';
import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; import SearchBar from "material-ui-search-bar";

import {
  BrowserRouter as
  Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';


function Navbar() {
  return <div className='Navbar'>
    <div className='leftside_nav'>
      <div className='navbar_icon_div'>
        < MenuIcon fontSize="large" />
      </div>
    </div>
    <div className='rightside_nav'>


      
        <ul>
          <li>
            <SearchBar
            // value={this.state.value}
            // onChange={(newValue) => this.setState({ value: newValue })}
            // onRequestSearch={() => doSomethingWith(this.state.value)}
            />
          </li>

          <li>
            <Link to='/login'>Log out</Link>
          </li>

          <li><AccountCircleIcon /></li>


        </ul>


        <Routes>

          <Route path="/login" element={<Login />}>
          </Route>

          <Route path="/signup" element={<SignUp />}>
          </Route>

        </Routes>
      






    </div>

  </div>;
}

export default Navbar;
