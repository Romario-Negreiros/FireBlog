import { History } from 'history';
import { UserData } from '../../../context/UserContext';
import { firebaseAuth, firebaseDatabase } from '../../../lib/firebase';
import { Inputs, DatabaseResponse } from '../types';

const signIn = async (
    setUserData: (userData: UserData | null) => void,
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
            const userId = response.user.uid;
            try {
                const response = await firebaseDatabase
                    .child('users')
                    .child(userId)
                    .get();
                const user = Object.values(response.val())[0] as DatabaseResponse;
                setUserData({...user, userID: userId });
                history.push('/');
            } catch (err) {
                setError(err.message);
            }
        } 
    } catch (err) {
        setError(err.message);
    }
};

export default signIn;
