import React, { Component } from 'react';
import { Link } from "react-router-dom";

import firebase from "../firebase";
import { connect } from "react-redux";

class Navbar extends Component {
    state = { 

        sidebar: false,
        loggedIn: false
     }

     toggleSidebar = () => {
        this.setState({
            sidebar: !this.state.sidebar
        })
     }



     check = () => {
       if(window.innerWidth > 992){
           this.setState({
               sidebar: false
           })
       }
     }

     checkSidebar = () => {
         let sidebar = this.state.sidebar;


         if(sidebar){
             this.setState({
                 sidebar: false
             })
         }
     }

     componentDidMount(){
         setInterval(() => {
             this.check();
         },10);
     }


     logOut = () => {
        
        this.setState({
            loggedIn: false
        })
        
        firebase.auth().signOut();
        
            
     }

     componentWillReceiveProps(nextProps){
    
       

         if((nextProps.user === null || Object.keys(nextProps.user).length < 1)){
           
            this.setState({
                loggedIn: false
            })
         } 
         
         else 
         
         {
           this.setState({
               loggedIn: true
           })
         }
     }
    

    render() { 
    //   console.log(this.props);
        return ( 
            <div>
            <div id="navbar">
            <div className="containers">
            <div id="nav-left">
            <i class="fab fa-audible"></i>

                {this.state.loggedIn ? 
                (
                    <React.Fragment>
                    <h2><Link onClick={this.checkSidebar} className="nav-link" to="/dashboard">Dashboard</Link></h2>
                    </React.Fragment>
                )
                : 
                (
                    <React.Fragment>
                    <h2><Link onClick={this.checkSidebar} className="nav-link" to="/">PaskyChat</Link></h2>
                    </React.Fragment>
                )
                }
            </div>
            <div id="nav-right">
             {/* {this.props.user } */}

             {this.state.loggedIn ? 
             (
                <React.Fragment>
                 <Link onClick={this.logOut} className="nav-link" to="/">Logout</Link>
                 </React.Fragment>
             ) 
             : 
             (
                 <React.Fragment>
                 <Link className="nav-link" to="login">Login</Link>
               <Link className="nav-link" to="signup">Signup</Link>
                 </React.Fragment>
             )
             }
            </div>

            <div onClick={this.toggleSidebar} id="nav-btn">
                <div></div>
                <div></div>
                <div></div>
            </div>
            </div>
            </div>

            <div className={this.state.sidebar ? "show" : "" } id="sidebar">
            {this.state.loggedIn ? 
                (
                    <React.Fragment>
                 <Link onClick={this.logOut}  className="sidebar-link" to="/">Logout</Link>
                 </React.Fragment>
                )
                
                :(
                    <React.Fragment>
                 <Link onClick={this.toggleSidebar} className="sidebar-link" to="login">Login</Link>
               <Link onClick={this.toggleSidebar} className="sidebar-link" to="signup">Signup</Link>
                 </React.Fragment>
                )
                }
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

export default connect(mapStateToProps)(Navbar);