// Modules or lib content
import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
// Components
import { NavBar, Home, CreatePosts, ManagePosts } from '../../components/index';
const Main: FC = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route path="/home/create/:userID">
                    <CreatePosts />
                </Route>
                <Route path="/home/manage/:userID">
                    <ManagePosts />
                </Route>
            </Switch>
        </>
    );
};

export default Main;
