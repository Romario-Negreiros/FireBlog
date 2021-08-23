import { FC, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Blog from './Blog/Blog';
import Login from './Login/Login';

const App: FC = () => {
    const [userID, setUserID] = useState<string>('');
    const history = useHistory();

    useEffect(() => {

        if(userID) history.push('/blog')
        else history.push('/login')

    }, [userID, history])

    return (
        <>
            <Switch>
                <Route path="/blog">
                    <Blog userID={userID} />
                </Route>
                <Route path="/login">
                    <Login setUserID={setUserID} />
                </Route>
            </Switch>
        </>
    );
};

export default App;
