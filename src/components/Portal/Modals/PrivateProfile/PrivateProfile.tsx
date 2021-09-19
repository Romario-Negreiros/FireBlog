// Modules or libs content
import { FC } from 'react';
import { firebaseDatabase } from '../../../../lib/firebase';
import { toast } from 'react-toastify';
// Components
import { ToastContainer } from 'react-toastify';
import { Background } from '../../../../global/styles';
import { Container } from './styles';
import { Close } from '../CreateAccount/styles';
// Types
import { Props as ImportedProps } from '../ChangeAccountName/types';

interface Props extends ImportedProps {
    currentState: boolean;
}

const PrivateProfile: FC<Omit<Props, 'formerName'>> = ({
    setIsModalVisible,
    uid,
    firebaseUid,
    currentState,
}) => {
    const setProfileState = async (state: boolean): Promise<void> => {
        if (state === currentState) return;
        else {
            try {
                await firebaseDatabase
                    .child('users')
                    .child(uid)
                    .child(firebaseUid)
                    .update({
                        isProfilePrivate: state,
                    });
                toast.success('Updated information!');
                setIsModalVisible(false);
            } catch (err) {
                if (err instanceof Error) {
                    toast.error(
                        'An error occurred while trying to update the information, please try again!: ' +
                            err
                    );
                }
            }
        }
    };

    return (
        <>
            <ToastContainer
                autoClose={2000}
                closeButton={false}
                style={{ fontSize: '16px' }}
            />
            <Background>
                <Container>
                    <Close onClick={() => setIsModalVisible(false)}>
                        Close modal
                    </Close>
                    <h2>Private Profile?</h2>
                    <button onClick={() => setProfileState(true)}>Yes</button>
                    <button onClick={() => setProfileState(false)}>No</button>
                </Container>
            </Background>
        </>
    );
};

export default PrivateProfile;
