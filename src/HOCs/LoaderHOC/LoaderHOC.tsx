// Modules or libs content
import { FC, ComponentType } from 'react';
// Components
import { Loader } from '../../components';
import { CenteredContainer } from '../../global/styles';
// Types
import { HOCProps } from './types';

const LoaderHOC = <P extends object>(
    WrappedComponent: ComponentType<P>
): FC<P & HOCProps> => {
    // P Represents the props of the component passed into the HOC
    return ({ isLoaded, error, ...props }: HOCProps) => {
        // Here a component to return from the HOC is defined
        // And specifies that this component includes the props from the component
        // passed in the HOC.
        if (!isLoaded) {
            return (
                <CenteredContainer>
                    <Loader />
                </CenteredContainer>
            );
        } else if (error) {
            return (
                <CenteredContainer>
                    <p>{error}</p>
                </CenteredContainer>
            );
        } else {
            return <WrappedComponent {...(props as P)} />;
        }
    };
};

export default LoaderHOC;

/*
React.ComponentType<P> is an alias for React.FunctionComponent<P> | React.ClassComponent<P>, 
meaning the component that is passed into the HOC can be either a function component or class component.


*/
