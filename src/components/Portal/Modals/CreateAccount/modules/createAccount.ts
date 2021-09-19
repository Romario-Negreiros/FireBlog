// Modules or libs content
import { firebaseAuth, firebaseDatabase } from '../../../../../lib/firebase';
import { History } from 'history';
import { toast } from 'react-toastify';
// Types
import { Inputs } from '../types';
// Context
import { UserData } from '../../../../../context/UserContext';

const createAccount = async (
    setUserData: (userData: UserData | null) => void,
    data: Inputs,
    setError: (error: string) => void,
    setIsModalVisible: (isModalVisible: boolean) => void,
    history: History<unknown> | string[]
) => {
    try {
        const response = await firebaseAuth.createUserWithEmailAndPassword(
            data.email,
            data.password
        );
        if (response.user?.uid) {
            try {
                firebaseDatabase.child('users').child(response.user.uid).push({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    isProfilePrivate: false,
                });
                toast.success('User created!');
                setIsModalVisible(false);
                setUserData({
                    name: data.name,
                    email: data.email,
                    userID: response.user.uid,
                });
                history.push('/home');
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            }
        }
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        }
    }
};

export default createAccount;
