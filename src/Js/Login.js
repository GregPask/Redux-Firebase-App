import React, { Component } from 'react';

import bootstrap from "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import firebase from "../firebase";

// Redux Stuff
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser , checkUserState } from "../Actions/actions";


class Login extends Component {
    state = { 
        email: "",
        password: "",
        email_error: "",
        password_error: "",
        
        firebaseErrors: {
            email: "",
            password: ""
        }
     }

     componentWillMount(){
        this.props.checkUserState();
     }




     componentWillReceiveProps(nextProps){
     
       if(nextProps.user !== null){
           this.props.history.push("/dashboard");
       } else {
         
       }
     }
     
     handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        })
    }


    handleSubmit = (e) => {
       e.preventDefault();
       let { email , password, email_error, password_error } = this.state;

        let firebaseErrors = this.state.firebaseErrors;
     
        if(email === ""){
            email_error = "Please enter your Email";

        }  else {
            email_error = "";
        }
        
        if (password === ""){
            password_error = "Please enter your password";
        } else {
            password_error = "";
        }


        this.setState({
            email_error,
            password_error,
        })
        
            if(email_error === "" && password_error ===""){
                console.log("No errors");
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then((user) => {
                console.log(user);
            })
            .catch((err) => {

                console.log(err.message);

                if(err.message.match("password is invalid")){
                    firebaseErrors.password = "Password is invalid";   
                } else {
                    delete firebaseErrors.password;
                }
                
                if(err.message.match("record")){
                    firebaseErrors.email = "Unknown Email Address";
                } else {
                    delete firebaseErrors.email;
                }


                    this.setState({
                        firebaseErrors,
                    })
            })
        } 
    }



    render() { 

            // console.log(this.state.errors);

            let { email_error , password_error , firebaseErrors} = this.state;

        return ( 
            <div id="login">
                <div className="container3">
                <h2>login Page</h2><br/>
                <form id="login-form">
                   

                <div class="form-group">
                        <label for="inputAddress">Email</label>
                        <input value={this.state.email} onChange={this.handleChange}  type="email" class={email_error || firebaseErrors.email ? "form-control is-invalid" : "form-control"} name="email" placeholder="Someone@example.com"/>

                        {email_error && <div className="invalid-feedback">{email_error}</div>}
                        {firebaseErrors.email && <div className="invalid-feedback">{firebaseErrors.email}</div>}
                    </div>
                    

                    <div class="form-group">
                        <label for="inputAddress">Password</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" class={password_error || firebaseErrors.password  ? "form-control is-invalid" : "form-control"} name="password" placeholder="* * * * * * "/>
                       
                        {password_error && <div className="invalid-feedback">{password_error}</div>}
                        {firebaseErrors.password && <div className="invalid-feedback">{firebaseErrors.password}</div>}
                    </div>

                    <p style={{color: "#333;"}}>Not yet a member? Register <Link to="/signup">here</Link></p>
                    
                    <div id="login-btn-wrap">
                    <button  onClick={this.handleSubmit} id="login-btn" type="submit" class="btn btn-primary">Sign in</button>
                    </div>
                </form>
                </div>
            </div>
         );
    }
}
 

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, {checkUserState})(Login);