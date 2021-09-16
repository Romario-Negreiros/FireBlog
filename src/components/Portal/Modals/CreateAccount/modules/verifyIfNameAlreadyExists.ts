import { DatabaseResponse } from "../../../../../pages/Login/types";

const verifyIfNameAlreadyExists = async (usersData: DatabaseResponse[][], name: string): Promise<boolean> => {
    return usersData.some(user => user[0].name === name ? true : false);
};

export default verifyIfNameAlreadyExists;