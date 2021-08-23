import { FC } from 'react';
// import { firebaseDatabase } from '../../firebase';

import { Container } from './styles';

import Props from './types/Props';

const Blog: FC<Props> = ({ userID }) => {

    // if(userID) firebaseDatabase.child('users').child(userID).child('posts').push({title: 'hello world', content: 'banana', category: 'sports'})

    return (
        <Container>
            
        </Container>
    )
}

export default Blog