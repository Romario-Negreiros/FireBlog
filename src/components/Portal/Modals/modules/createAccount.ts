import { Inputs } from "../types";

import { firebaseAuth } from "../../../../firebase";

const createAccount = async (
    data: Inputs,
    setError: (error: string) => void
) => {
    try {
        const response = await firebaseAuth.createUserWithEmailAndPassword(data.email, data.password)
        console.log(response);
    } catch(err) {
        setError(err.message)
    }
}

export default createAccount;