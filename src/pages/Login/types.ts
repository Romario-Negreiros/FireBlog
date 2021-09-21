export interface Inputs extends Omit<DatabaseResponse, 'name'>{}

export interface Props {
    setUserID: (userID: string) => void,
}

export interface DatabaseResponse {
    name: string,
    email: string,
    password: string,
}

