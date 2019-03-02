import React, { Component } from 'react';

import bootstrap from "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import firebase from "../firebase";
import { Link } from "react-router-dom";
// Redux Stuff

import { connect } from "react-redux";
import { signupUser , checkUserState } from "../Actions/actions";


class Signup extends Component {
    state = { 
        name: "",
        email: "",
        password: "",
        errors: {
            name: "",
            email: "",
            password: "",
            firebaseEmail:"",
            firebasePassword: ""
        }
     }

     componentWillMount(){
         this.props.checkUserState();
     }


     componentWillReceiveProps(nextProps){
         if((nextProps.user) !== null){
             this.props.history.push("/dashboard");
         } else {
             console.log("No change");
         }
     }
     
     handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        })
    }


    handleSubmit = (e) => {
       e.preventDefault();
       let { email , password , name, errors} = this.state; 

        name === "" ? errors.name = "Please enter a valid username" : errors.name = "";
        email === "" ? errors.email = "Please enter your email"  : errors.email = "";
        password === "" ? errors.password = "Please enter your password" : errors.password = "";

      
        

       
            console.log("Lets go");
       firebase.auth().createUserWithEmailAndPassword(email,password)
       .then((user) => {
        
           let dbRef = firebase.database().ref("users/");
           let data = {name, uid: user.user.uid};
           dbRef.push(data);
       })
       .catch((err) => {
                console.log(err.message);
                if(err.message.match("Password")){
                    errors.firebasePassword = err.message
                } else {
                    errors.firebasePassword = "";
                }

                if(err.message.match("email address")){
                    errors.firebaseEmail = "Email address already taken!"
                } else {
                    errors.firebaseEmail = "";
                }


                this.setState({
                    errors,
                })

       });
    }

  

   

      
    



    render() { 

            

            let { errors} = this.state;



        return ( 
            <div id="signup">
                <div className="container3">
                <h2>Signup Page</h2><br/>
                <form id="signup-form">
                    <div class="form-row">
                    
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Name</label>
                            <input required value={this.state.name} onChange={this.handleChange} type="text" class={errors.name ? "form-control is-invalid" : "form-control"} name="name" placeholder="John Doe"/>
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Email</label>
                            <input required value={this.state.email} onChange={this.handleChange}  type="email" class={errors.email || errors.firebaseEmail ? "is-invalid form-control" : "form-control "} name="email" placeholder="someone@example.com"/>

                            {errors.firebaseEmail && <div className="invalid-feedback">{errors.firebaseEmail}</div>}
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                    </div>

                    <div class="form-group">
                        <label for="inputAddress">Password</label>
                        <input required value={this.state.password} onChange={this.handleChange}  type="password" class={errors.password || errors.firebasePassword ? "form-control is-invalid" : "form-control"  } name="password" placeholder="* * * * * * "/>

                      
                        {errors.firebasePassword && <div className="invalid-feedback">{errors.firebasePassword}</div>}
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <p style={{color: "#333;"}}>Already a member? Login <Link to="/login">here</Link></p>
                    
                    <div id="signup-btn-wrap">
                    <button  onClick={this.handleSubmit} id="signup-btn" type="submit" class="btn btn-primary">Sign in</button>
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

export default connect(mapStateToProps, {signupUser , checkUserState})(Signup);