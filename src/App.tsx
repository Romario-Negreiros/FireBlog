// Modules or lib content
import { FC, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
// Components
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
// Context
import userContext, { UserData } from './context/UserContext';

const App: FC = () => {

    const [userData, setUserData] = useState<UserData | null>(null);
    const history = useHistory();

    useEffect(() => {
        history.push('/home')    
    }, [history])

    return (
        <>
            <userContext.Provider value={{ userData, setUserData }}>
                <Switch>
                    <Route path="/home">
                        <Main />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </userContext.Provider>
        </>
    );
};

export default App;
