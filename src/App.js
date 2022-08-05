import { useContext, useReducer } from 'react';
import Context from './state/store';
import reducer from './state/reducer';
import Router from './views/container/Router';

const App = () => {
    const initialState = useContext(Context);
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Context.Provider value={{ state, dispatch }}>
        <Router />
    </Context.Provider>
}
export default App;
