import { firebaseDatabase } from '../../../lib/firebase';
import { UserData } from '../../../context/UserContext';

interface Response {
    email: string;
    name: string;
}

const getCurrentUser = async (userID: string): Promise<UserData> => {
    const userData: Partial<UserData> = {};
    const response = await firebaseDatabase.child('users').child(userID).get();
    const emailAndName: Response = Object.values(response.val())[0] as Response;
    userData['userID'] = userID;
    userData['email'] = emailAndName.email;
    userData['name'] = emailAndName.name;
    return userData as UserData;
};

export default getCurrentUser;
