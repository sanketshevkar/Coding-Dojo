import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    if(this.props.auth.isAuthenticated===false){
      return (
      
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper white">
              <Link
                to="/"
                style={{
                  fontFamily: "monospace"
                }}
                className="col s5 brand-logo center black-text"
              >
                <i className="material-icons"></i>
                POST-IT
              </Link>
            </div>
          </nav>
        </div>
      );
    }
    else{
      return (
      
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper white">
              <Link
                to="/"
                style={{
                  fontFamily: "monospace"
                }}
                className="col s5 brand-logo center black-text"
              >
                <i className="material-icons"></i>
                POST-IT
              </Link>
              <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            margin: "1rem",
          }}
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Logout{console.log(this.props.auth.isAuthenticated)}
        </button>
        </li>
        </ul>
            </div>
          </nav>
        </div>
      );
    }
    
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);