const initialState = {
  messages: ""
}



const messageReducer = (state = initialState, action) => {
    switch(action.type){
       

        case "FETCH_MESSAGES":       
        state.messages = action.payload
       
        return {
            ...state
        }

        default: 
        return initialState;
    }
}

export default messageReducer;