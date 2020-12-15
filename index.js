const createStore = (rootReducer, initialState) => {
    let state = rootReducer(initialState, {type: '__INIT__'})
    const subscribers = []

    return{
        dispatch(action){   
           state =  rootReducer(state,action)
           subscribers.forEach(v => v())
        },
        subscribe(callback){
            subscribers.push(callback)
        },
        getState(){
            return state
        }
    }
}

const INCREMENT ="INCREMENT"
const DECREMENT = "DECREMENT"

const rootReducer = (state,action) => {
    switch(action.type){
        case INCREMENT:
            return {...state, counter:state.counter+1}
        case DECREMENT:
            return {...state, counter:state.counter-1}
        default: 
            return state
    }
}

const store = createStore(rootReducer,{
    counter: 0
})

console.log(store)

store.subscribe(()=> console.log(store.getState()))

store.dispatch({type:INCREMENT})
store.dispatch({type:INCREMENT})
store.dispatch({type:DECREMENT})
