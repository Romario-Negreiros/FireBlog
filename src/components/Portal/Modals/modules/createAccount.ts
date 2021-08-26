import { Inputs } from '../types';

import { toast } from 'react-toastify';
import { firebaseAuth, firebaseDatabase } from '../../../../lib/firebase';

const createAccount = async (
    data: Inputs,
    setError: (error: string) => void,
    setIsModalVisible: (isModalVisible: boolean) => void
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
                });
                toast.success('User created!');
                setIsModalVisible(false);
            } catch (err) {
                setError(err.message);
            }
        }
    } catch (err) {
        setError(err.message);
    }
};

export default createAccount;
