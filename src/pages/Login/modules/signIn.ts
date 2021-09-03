// Modules or libs content
import { firebaseAuth, firebaseDatabase } from '../../../lib/firebase';
// Types
import { Inputs, DatabaseResponse } from '../types';
import { History } from 'history';
// Context
import { UserData } from '../../../context/UserContext';

const signIn = async (
    setUserData: (userData: UserData | null) => void,
    data: Inputs,
    setError: (error: string) => void,
    history: History
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
                history.goBack();
            } catch (err) {        
                if (err instanceof TypeError) setError(err.message);
            }
        } 
    } catch (err) {
        if (err instanceof TypeError) setError(err.message);
    }
};

export default signIn;
