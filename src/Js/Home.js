import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div id="home">
                <div className="container2">
                    <p id="home1">WELCOME</p>
                    <p id="home2">TO</p>
                    <p id="home3">PASKY'S CHATAPP</p>

                    <p id="home4">PaskyChat</p>


                    <div id="signup-wrap">
                    <div id="signup-box">
                        <h2 style={{textShadow: "2px 1px 4px #666"}}>Regiser for Free now!</h2>
                    </div>
                    <i class="fas fa-long-arrow-alt-down"></i>
                    </div>

                    <div id="home-register">
                        <button><Link className="register-link" to="/signup">Register</Link></button>
                    </div>

                </div>

               
            </div>
         );
    }
}
 
export default Home;