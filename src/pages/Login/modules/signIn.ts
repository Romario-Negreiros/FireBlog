import { firebaseAuth } from '../../../firebase';
import Inputs from '../types/Inputs';

const signIn = async (
    setUserID: (userID: string) => void,
    data: Inputs,
    setError: (error: string) => void
) => {
    try {
        const response = await firebaseAuth.signInWithEmailAndPassword(
            data.email,
            data.password
        );
        if (response.user) setUserID(response.user.uid);
    } catch (err) {
        setError(err.message)
    }
};

export default signIn;
