import Inputs from '../types/Inputs';
import { firebaseAuth } from '../../../firebase';

const createAccount = async (
    setUserID: (userID: string) => void,
    data: Inputs,
    setError: (error: string) => void
) => {
    try {
        const response = await firebaseAuth.createUserWithEmailAndPassword(
            data.email,
            data.password
        );
        if (response.user) setUserID(response.user.uid);
    } catch (err) {
        setError(err.message);
    }
};

export default createAccount;
