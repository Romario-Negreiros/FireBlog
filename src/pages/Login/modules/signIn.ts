// Modules or libs content
import {
    firebaseAuth,
    firebaseDatabase,
    firebaseStorage,
} from '../../../lib/firebase';
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
            const { uid } = response.user;
            try {
                const response = await firebaseDatabase
                    .child('users')
                    .child(uid)
                    .get();
                const user = Object.values(
                    response.val()
                )[0] as DatabaseResponse;
                setUserData({ ...user, userID: uid });
                history.goBack();
                try {
                    const profileImgURL = await firebaseStorage
                        .child('userimages')
                        .child(uid)
                        .getDownloadURL();
                    setUserData({
                        ...user,
                        userID: uid,
                        profileImg: (profileImgURL as string)
                            ? (profileImgURL as string)
                            : '',
                    });
                } catch (err) {
                    console.log(err);
                }
            } catch (err) {
                if (err instanceof Error) setError(err.message);
            }
        }
    } catch (err) {
        if (err instanceof Error) setError(err.message);
    }
};

export default signIn;
