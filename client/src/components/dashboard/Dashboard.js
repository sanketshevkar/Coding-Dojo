import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Note from "../notes/Note"
import Add from "../notes/Add"
import axios from 'axios';
var nJwt = require('njwt');

class Dashboard extends Component {

  state={
    posts:[{"_id":"","text":"","date":""}]
  }

  

   componentDidMount(){
    var jwt = nJwt.create(this.props.user,"secret","HS256");
    var token = jwt.compact();
    axios.get('http://localhost:5000/api/posts', 
    {headers: {
      'x-auth-token': token
    }}) 
    .then(res => this.setState({posts: res.data}))

  }

   addPost = (post,user) =>{
     console.log(user)
    let jwt = nJwt.create(user,"secret","HS256");
    let token = jwt.compact();
       console.log(post);
       axios.post(`http://localhost:5000/api/posts/`,{
           'text':post
       },{headers: {
        'x-auth-token': token
      }}).then(res => this.setState({posts: res.data}))
     }

     del = (id,user) =>{
      console.log(user)
     let jwt = nJwt.create(user,"secret","HS256");
     let token = jwt.compact();
        axios.delete(`http://localhost:5000/api/posts/${id}`,{headers: {
        'x-auth-token': token
      }}).then(res => this.setState({posts: res.data}))
      }



  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
return (<div>
  <div style={{display: "flex",
  justifyContent: "center",
  alignItems: "center",marginBottom: "2rem", marginTop: "2rem"}}>
  <Add addPost={this.addPost}/>
  </div>
  
  {this.state.posts.map((res) => (
    <div style={{marginBottom: "2rem"}} key={res._id}>
  <Note post={res} del={this.del}/>
  </div>
  ))}
  
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