import { createContext, Dispatch, SetStateAction } from 'react';

export interface UserData {
    userID: string;
    name: string;
    email: string;
    profileImg?: string;
}

interface User {
    userData: UserData | null;
    setUserData: Dispatch<SetStateAction<UserData | null>>;
}

const userContext = createContext<User | null>(null);

export default userContext;
