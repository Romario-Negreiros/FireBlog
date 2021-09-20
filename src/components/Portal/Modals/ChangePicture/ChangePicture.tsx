// Modules or libs content
import { FC, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { firebaseStorage } from '../../../../lib/firebase';
// Images
import UploadFile from '../../../../assets/file-upload-solid.svg';
import FileUploaded from '../../../../assets/check-circle-solid.svg';
// Components
import { ToastContainer } from 'react-toastify';
import { Background } from '../../../../global/styles';
import { Form, Close, Container } from '../CreateAccount/styles';
import { Fieldset } from '../../../../pages/Login/styles';
import { Progress, Label, Input, Icon, InputFileLabel } from './styles';
// Types
import { Props } from '../ChangeAccountName/types';
// Context
import userContext from '../../../../context/UserContext';

const ChangePicture: FC<Omit<Props, 'formerName' | 'firebaseUid'>> = ({
    setIsModalVisible,
    uid,
}) => {
    const context = useContext(userContext);
    const [hasFile, setHasFile] = useState<boolean>(false);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const input = document.querySelector('.image') as HTMLInputElement;
        if (input.files) {
            const image = input.files[0];
            const task = firebaseStorage
                .child('userimages')
                .child(uid)
                .put(image);
            task.on(
                'state_changed',
                snapshot => {
                    const percentage =
                        (snapshot.bytesTransferred / 100) * snapshot.totalBytes;
                    const progressBar = document.querySelector(
                        '#file_progress'
                    ) as HTMLProgressElement;
                    const label = document.querySelector(
                        '#label_for_progress'
                    ) as HTMLLabelElement;
                    progressBar.value = percentage;
                    label.innerText = String(percentage) + '%';
                },
                err => {
                    if (err instanceof Error) {
                        toast.error('Failed to update image: ' + err.message);
                    }
                },
                async () => {
                    try {
                        const downloadURL = await firebaseStorage
                            .child('userimages')
                            .child(uid)
                            .getDownloadURL();
                        if (context?.userData) {
                            context.setUserData({
                                ...context.userData,
                                profileImg: downloadURL as string,
                            });
                            toast.success('Image updated')
                            setIsModalVisible(false);
                        }
                    } catch (err) {
                        if (err instanceof Error) {
                            toast.error(
                                'Something unnexpected happened, please try again! ' +
                                    err.message
                            );
                        }
                    }
                }
            );
        } else {
            toast.error('You need to choose a image!');
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
                        Go back
                    </Close>
                    <Form onSubmit={event => handleSubmit(event)}>
                        <Fieldset>
                            <InputFileLabel>
                                <Input
                                    type="file"
                                    className="image"
                                    id="image"
                                    name="image"
                                    accept=".jpg,.jpeg,.png,.svg"
                                    onChange={(
                                        event: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        event.currentTarget.files
                                            ? setHasFile(true)
                                            : setHasFile(false);
                                    }}
                                ></Input>
                                Choose picture
                                <Icon
                                    src={hasFile ? FileUploaded : UploadFile}
                                ></Icon>
                            </InputFileLabel>
                            <Label
                                htmlFor="fileprogress"
                                id="label_for_progress"
                            ></Label>
                            <Progress
                                id="file_progress"
                                value="0"
                                max="100"
                            ></Progress>
                        </Fieldset>
                        <button type="submit">Change picture</button>
                    </Form>
                </Container>
            </Background>
        </>
    );
};

export default ChangePicture;
