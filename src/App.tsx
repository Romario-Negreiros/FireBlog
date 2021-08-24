import { FC, useState } from 'react';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
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
        </Switch>
        </div>
    )
}

export default App