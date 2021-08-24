import { FC } from 'react';

import { NavBar, Home } from '../../components/index';

import { Props } from './types';

const App: FC<Props> = ({ userID }) => {


    return (
        <>
            <NavBar />
            <Home />
            <p>{userID}</p>
        </>
    )
}

export default App