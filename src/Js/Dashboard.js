import React, { Component } from 'react';

import { connect} from "react-redux";
import { checkUserState  ,fetchMessages , addMessage} from "../Actions/actions";

import firebase from "../firebase";

class Dashboard extends Component {
    state = {
        userName: "",
        message: "",
        user: null,
        messagesData: ""
     }

     componentWillMount(){
     
         
        if(Object.keys(this.props.user).length === undefined || Object.keys(this.props.user).length === 0){
            this.props.history.push("/");
        }
         else {
          
            this.setState({
                user: this.props.user
            })

         

            let dbRef = firebase.database().ref("users/");
            dbRef.on("value",(snapshot) => {
            let items = snapshot.val();
                
            console.log(this.props.user);
                for(let x in items){
                    if(items[x].uid === this.props.user.uid){
                        this.setState({
                            userName: items[x].name
                        })
                    }
                }
            })


            let dbRefs = firebase.database().ref("/messages");
            dbRefs.on("value",(snapshot) => {
                    console.log("calling again!");
                    let messages = snapshot.val();
                    let newArray = [];
    
                    for(let x in messages){
                        newArray.push({
                            id: x,
                            name: messages[x].name,
                            message: messages[x].message,
                            uid: messages[x].uid
                        })
    
                        console.log(newArray);
    
                        // this.props.dispatch({
                        //     type: "FETCH_MESSAGES",
                        //     payload: newArray
                        // })
                    }    
                    
                    this.setState({
                        messagesData: newArray
                    })
            })            
        }
     }
    

 

     handleChange = (e) => {
         this.setState({
             [e.target.name]: e.target.value
         })
      
     }

   

   componentDidUpdate(){
    let messageBoard = document.getElementById("message-board");
    messageBoard.scrollTop = messageBoard.scrollHeight;
    
   }


     submitMessage = (e) => {
         
         e.preventDefault();
         let { message , userName } = this.state;


         if(message === ""){
             return;
         }

        this.props.addMessage(userName,message , this.state.user.uid);
         
        this.setState({
            message: ""
        })
       

        
     }

    render() { 
        console.log(this.state);
        
        let messageArray = [];
        let messages;
        for(let x in this.state.messagesData){
            messageArray.push(this.state.messagesData[x]);
        }

            // console.log(messageArray);
         
 
                    messages = messageArray.map((message) => {
                return (
                    <div className={this.state.user.uid === message.uid ? "message-wrap-left" : "message-wrap-right"}>
                        <div className={this.state.user.uid === message.uid ? "message-left" : "message-right" }>
                        <h4 className="message-name">{message.name}</h4>
                        <p className="message-message">{message.message}</p>
                        </div>
                    </div>
                )
            })

            console.log(messages);
            
            
        
         

        return ( 
            <div id="dashboard">
                <div id="dashboard-container">
                    <h2>Hello {this.state.userName}</h2>
              
                <div id="message-board">
                 {messages }
                </div>


                  <div id="add-message">
                      <form>
                      <div id="add-message-lg">
                        <input value={this.state.message} onChange={this.handleChange} name="message" id="input" className="form-control" placeholder="Write your message" />
                        <button id="add-btn" onClick={this.submitMessage} >Chat</button>
                        </div>

                       
                        <input value={this.state.message} onChange={this.handleChange} name="message" id="input1" className="form-control" placeholder="Write your message" /><br/>

                        <button  id="add-btn1" onClick={this.submitMessage} >Chat</button>
                      

                      </form>
                  </div>


                </div>
            </div>
         );
    }
}
 


const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        messages: state.message.messages
    }
}

export default connect(mapStateToProps, { checkUserState , addMessage , fetchMessages })(Dashboard);