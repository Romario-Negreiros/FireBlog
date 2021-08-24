import { FC } from 'react';
import { createPortal } from 'react-dom';

const Portal: FC = (props) => {
    return createPortal(props.children, document.querySelector('#modal') as HTMLDivElement)
}

export default Portal;