import { FC, useState } from 'react';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import { Route, Switch } from 'react-router-dom';

const App: FC = () => {

    const [userID, setUserID] = useState<string>('');

    return (
        <div>
        <Switch>
            <Route exact path="/">
                <Main userID={userID} />
            </Route>
            <Route path="/login">
                <Login setUserID={setUserID}/>
            </Route>
            <Route path="/createAccount">
                <CreateAccount />
            </Route>
        </Switch>
        </div>
    )
}

export default App