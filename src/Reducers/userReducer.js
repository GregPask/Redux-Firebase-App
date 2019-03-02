const initialState = {
    user: {}
}



const userReducer = (state = initialState, action) => {
    switch(action.type){
       


        case "USER_STATE":
        console.log("user staste");
        console.log(action.payload)
        state.user = action.payload;

        return {
            ...state
        }


        default: 
        return initialState;
    }
}


export default userReducer;