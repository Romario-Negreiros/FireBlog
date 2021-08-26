// Modules or libs content
import { FC } from 'react';
// Components
import { LoaderSpin, LoadingMessage } from './styles';

const Loader: FC = () => {
    return (
        <>
            <LoaderSpin />
            <LoadingMessage>Loading</LoadingMessage>
        </>
    );
};

export default Loader;
