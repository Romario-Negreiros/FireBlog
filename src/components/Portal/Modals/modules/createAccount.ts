import { Inputs } from "../types";

import { toast } from 'react-toastify';
import { firebaseAuth } from "../../../../lib/firebase";

const createAccount = async (
    data: Inputs,
    setError: (error: string) => void,
    setIsModalVisible: (isModalVisible: boolean) => void,
) => {
    try {
        await firebaseAuth.createUserWithEmailAndPassword(data.email, data.password);
        toast.success('User created!');
        setIsModalVisible(false);
    } catch(err) {
        setError(err.message);
    }
}

export default createAccount;