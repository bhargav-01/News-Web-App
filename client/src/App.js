import NewsList from './components/NewsList'
import './App.css';
import React from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Login from './components/LoginComponent'
import $ from 'jquery'

class App extends React.Component {

  componentDidMount()
  {
      const mobileScreen = window.matchMedia("(max-width: 990px )");
      $(document).ready(function () {
          $(".dashboard-nav-dropdown-toggle").click(function () {
              $(this).closest(".dashboard-nav-dropdown")
                  .toggleClass("show")
                  .find(".dashboard-nav-dropdown")
                  .removeClass("show");
              $(this).parent()
                  .siblings()
                  .removeClass("show");
          });
          $(".menu-toggle").click(function () {
              if (mobileScreen.matches) {
                  $(".dashboard-nav").toggleClass("mobile-show");
              } else {
                  $(".dashboard").toggleClass("dashboard-compact");
              }
          });
      });  
  }

  render()
  {
    return (
      <BrowserRouter>
        <div className="App">
          <NewsList/>
        </div>
      </BrowserRouter>
    )
  }
  
}

export default App;
