var React = require('react');
var SigninForm = require('../SigninForm/SigninForm');
var PostForm = require('../PostForm/PostForm');
var $ = require('jquery');

var UserForms = React.createClass({
  getInitialState: function() {
    return {
      accessCode: '',
      username: '',
      showInputForm: false,
      showSigninForm: true,
    };
  },
  
  render: function() {
    return (
      <div>
        {this.state.showSigninForm ? <SigninForm onStart={this.onStart} onSignin={this.onSignin} /> : true }
        {this.state.showInputForm ? <PostForm accessCode={this.state.accessCode} username={this.state.username} /> : null }
      </div>
    );
  },

  onStart: function(accessCode, username){
    this.setState({
      accessCode: accessCode,
      username: username,
      showInputForm: true,
      showSigninForm: false
    });
    
    this.props.getAccessCode(accessCode);
  },
  
  onSignin: function(accessCode, username){
    this.setState({
      accessCode: accessCode,
      username: username,
      showInputForm: true,
      showSigninForm: false
    });
    
    this.props.getAccessCode(accessCode);
    
    $.get('/api/posts/' + accessCode, function(data){
      this.props.showOldPosts(data);
      console.log('Loaded old posts and stored signin variables.');
    }.bind(this));
  }
});

module.exports = UserForms;