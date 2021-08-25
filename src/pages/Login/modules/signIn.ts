import { History } from 'history';
import { firebaseAuth } from '../../../lib/firebase';
import { Inputs } from '../types';

const signIn = async (
    setUserID: (userID: string) => void,
    data: Inputs,
    setError: (error: string) => void,
    history: History<unknown> | string[]
) => {
    try {
        const response = await firebaseAuth.signInWithEmailAndPassword(
            data.email,
            data.password
        );
        if (response.user) {
            setUserID(response.user.uid);
            history.push('/');
        }
    } catch (err) {
        setError(err.message)
    }
};

export default signIn;