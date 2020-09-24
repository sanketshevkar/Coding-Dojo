import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Note from "../notes/Note"
import Add from "../notes/Add"
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
return (<div>
  <div style={{display: "flex",
  justifyContent: "center",
  alignItems: "center",marginBottom: "2rem", marginTop: "2rem"}}>
  <Add />
  </div>
  <Note />
</div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);