// Modules or lib content
import { FC, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
// Components
import { NavBar, Home, CreatePosts, ManagePosts, EditPosts, Post, PostsForCategory } from '../../components/index';
const Main: FC = () => {

    const [hasPostsChanged, setHasPostsChanged] = useState<boolean>(false);

    return (
        <>
            <NavBar hasPostsChanged={hasPostsChanged} setHasPostsChanged={setHasPostsChanged} />
            <Switch>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route path="/home/create/:userID">
                    <CreatePosts setHasPostsChanged={setHasPostsChanged} />
                </Route>
                <Route path="/home/manage/:userID">
                    <ManagePosts />
                </Route>
                <Route path="/home/edit/:userID">
                    <EditPosts setHasPostsChanged={setHasPostsChanged} />
                </Route>
                <Route path="/home/posts/:postID">
                    <Post />
                </Route>
                <Route path="/home/categories/:category">
                    <PostsForCategory />
                </Route>
            </Switch>
        </>
    );
};

export default Main;
