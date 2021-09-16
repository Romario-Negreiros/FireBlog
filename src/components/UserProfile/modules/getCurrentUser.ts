import { firebaseDatabase } from '../../../lib/firebase';
import { UserData } from '../types';

interface user {
    email: string;
    name: string;
}

interface Response {
    databaseID: user[];
}

const getCurrentUser = async (username: string): Promise<UserData | null> => {
    const userData: Partial<UserData> = {};
    const response = await firebaseDatabase.child('users').get();
    const getEntries = Object.entries(response.val());
    const getUsers: [string, string[], user[]][] = getEntries.map(entry => [
        entry[0],
        Object.keys(entry[1] as Response),
        Object.values(entry[1] as Response),
    ]);
    getUsers.forEach(user => {
        if (user[2][0].name === username) {
            userData['firebaseUid'] = user[1][0];
            userData['userID'] = user[0];
            userData['email'] = user[2][0].email;
            userData['name'] = user[2][0].name;
        }
    });
    if (userData.userID === undefined) return null;
    else return userData as UserData;
};

export default getCurrentUser;
