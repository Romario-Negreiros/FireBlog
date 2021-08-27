// Modules or libs content
import { FC, useEffect, useCallback} from 'react';
import { useParams, useHistory } from 'react-router';
import { firebaseAuth } from '../../lib/firebase';
// Components
import { Container, Post, Link } from './styles';

const ManagePosts: FC = () => {

    const { userID } = useParams<{ userID: string }>();
    console.log(userID)
    const history = useHistory();
    const user = firebaseAuth.currentUser;
    console.log(user)
    const userNotLogged = useCallback(() => {
        history.push('/login');
    }, [history]);

    useEffect(() => {
        if (!user) userNotLogged();
    }, [user, userNotLogged]);

    return (
        <Container>
            <Post>
                <h2>Lorem ipsum dolor sit.</h2>
                <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex.
                </small>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus quos nobis earum voluptas. Voluptatem ab
                    voluptatibus, laborum quam a quisquam voluptatum excepturi
                    rerum quae assumenda sit praesentium fugit ullam nisi alias
                    nostrum aut quod! Excepturi facilis voluptates
                    necessitatibus aperiam assumenda.
                </p>
                <Link to="/">
                    Nadnadnadna
                </Link>
            </Post><Post>
                <h2>Lorem ipsum dolor sit.</h2>
                <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex.
                </small>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus quos nobis earum voluptas. Voluptatem ab
                    voluptatibus, laborum quam a quisquam voluptatum excepturi
                    rerum quae assumenda sit praesentium fugit ullam nisi alias
                    nostrum aut quod! Excepturi facilis voluptates
                    necessitatibus aperiam assumenda.
                </p>
                <Link to="/">
                    Nadnadnadna
                </Link>
            </Post><Post>
                <h2>Lorem ipsum dolor sit.</h2>
                <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex.
                </small>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus quos nobis earum voluptas. Voluptatem ab
                    voluptatibus, laborum quam a quisquam voluptatum excepturi
                    rerum quae assumenda sit praesentium fugit ullam nisi alias
                    nostrum aut quod! Excepturi facilis voluptates
                    necessitatibus aperiam assumenda.
                </p>
                <Link to="/">
                    Nadnadnadna
                </Link>
            </Post><Post>
                <h2>Lorem ipsum dolor sit.</h2>
                <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex.
                </small>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus quos nobis earum voluptas. Voluptatem ab
                    voluptatibus, laborum quam a quisquam voluptatum excepturi
                    rerum quae assumenda sit praesentium fugit ullam nisi alias
                    nostrum aut quod! Excepturi facilis voluptates
                    necessitatibus aperiam assumenda.
                </p>
                <Link to="/">
                    Nadnadnadna
                </Link>
            </Post><Post>
                <h2>Lorem ipsum dolor sit.</h2>
                <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex.
                </small>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus quos nobis earum voluptas. Voluptatem ab
                    voluptatibus, laborum quam a quisquam voluptatum excepturi
                    rerum quae assumenda sit praesentium fugit ullam nisi alias
                    nostrum aut quod! Excepturi facilis voluptates
                    necessitatibus aperiam assumenda.
                </p>
                <Link to="/">
                    Nadnadnadna
                </Link>
            </Post><Post>
                <h2>Lorem ipsum dolor sit.</h2>
                <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex.
                </small>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus quos nobis earum voluptas. Voluptatem ab
                    voluptatibus, laborum quam a quisquam voluptatum excepturi
                    rerum quae assumenda sit praesentium fugit ullam nisi alias
                    nostrum aut quod! Excepturi facilis voluptates
                    necessitatibus aperiam assumenda.
                </p>
                <Link to="/">
                    Nadnadnadna
                </Link>
            </Post><Post>
                <h2>Lorem ipsum dolor sit.</h2>
                <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex.
                </small>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus quos nobis earum voluptas. Voluptatem ab
                    voluptatibus, laborum quam a quisquam voluptatum excepturi
                    rerum quae assumenda sit praesentium fugit ullam nisi alias
                    nostrum aut quod! Excepturi facilis voluptates
                    necessitatibus aperiam assumenda.
                </p>
                <Link to="/">
                    Nadnadnadna
                </Link>
            </Post><Post>
                <h2>Lorem ipsum dolor sit.</h2>
                <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex.
                </small>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus quos nobis earum voluptas. Voluptatem ab
                    voluptatibus, laborum quam a quisquam voluptatum excepturi
                    rerum quae assumenda sit praesentium fugit ullam nisi alias
                    nostrum aut quod! Excepturi facilis voluptates
                    necessitatibus aperiam assumenda.
                </p>
                <Link to="/">
                    Nadnadnadna
                </Link>
            </Post>
        </Container>
    );
};

export default ManagePosts;
