import { FC } from 'react';
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
