// Modules or lib content
import { FC, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
// Components
import { NavBar, Home, CreatePosts, ManagePosts, EditPosts, Post, PostsForCategory, UserProfile } from '../../components/index';
// Types
import Props from './types';

const Main: FC<Props> = ({ toggleTheme }) => {

    const [hasPostsChanged, setHasPostsChanged] = useState<boolean>(false);

    return (
        <>
            <NavBar hasPostsChanged={hasPostsChanged} setHasPostsChanged={setHasPostsChanged} toggleTheme={toggleTheme} />
            <Switch>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route path="/home/create">
                    <CreatePosts setHasPostsChanged={setHasPostsChanged} />
                </Route>
                <Route path="/home/manage">
                    <ManagePosts />
                </Route>
                <Route path="/home/edit">
                    <EditPosts setHasPostsChanged={setHasPostsChanged} />
                </Route>
                <Route path="/home/posts/:postID">
                    <Post />
                </Route>
                <Route path="/home/categories/:category">
                    <PostsForCategory />
                </Route>
                <Route path="/home/user/:username">
                    <UserProfile />
                </Route>
            </Switch>
        </>
    );
};

export default Main;
