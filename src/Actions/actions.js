import firebase from "../firebase";

// USER ACTIONS ================================================ 


export const checkUserState = () => {
    return dispatch => {
        console.log("Checking user state");
        firebase.auth().onAuthStateChanged((user) => {
            // console.log(user);
            if(user){
               
                dispatch({
                    type: "USER_STATE",
                    payload: user
                })
            }

            else {
             
                dispatch({
                    type: "USER_STATE",
                    payload: user
                })
            }
        })
    }
}



export const signupUser = (name,email,password) => {
    return dispatch => {
    

        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((user) => {
            
            let dbRef = firebase.database().ref("users/");
            let data = {
                name,
                uid: user.user.uid
            };

            dbRef.push(data);

        })
        .catch((err) => {
            // console.log(err.message);
        });

    }
}




// MESSAGE DATA ==============================================



export const fetchMessages = () => {
    return dispatch => {
        console.log("fetching messages...");

        let dbRef = firebase.database().ref("/messages");

        dbRef.on("value",(snapshot) => {
            

                let messages = snapshot.val();
                let newArray = [];

                for(let x in messages){
                    newArray.push({
                        id: x,
                        name: messages[x].name,
                        message: messages[x].message,
                        uid: messages[x].uid
                    })

                    dispatch({
                        type: "FETCH_MESSAGES",
                        payload: newArray
                    })
                }           
        })
    }
}




export const addMessage = (name,message,uid) => {
    return dispatch => {
       
        let dbRef = firebase.database().ref("/messages");
        let data = {
            name,
            message,
            uid,
        }
        dbRef.push(data);
    }
}