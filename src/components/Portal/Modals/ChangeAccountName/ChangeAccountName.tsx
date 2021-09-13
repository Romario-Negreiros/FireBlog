// Modules or libs content
import { FC } from 'react';
// Images
import { Background } from '../../../../global/styles';
// Types
import { Props } from './types';
import { InputWrapper } from '../CreateAccount/styles';

const ChangeAccountName: FC<Props> = ({ setIsModalVisible, formerName }) => {
    return (
        <Background>
            <h2>Change your name</h2>
            <InputWrapper>
                <input name="name" required></input>
            </InputWrapper>
            <button onClick={() => setIsModalVisible(false)}>Confirm</button>
        </Background>
    );
};

export default ChangeAccountName;
