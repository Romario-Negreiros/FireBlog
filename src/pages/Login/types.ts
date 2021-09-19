export type Inputs = {
    email: string,
    password: string
}

export interface Props {
    setUserID: (userID: string) => void,
}

export interface DatabaseResponse {
    name: string,
    email: string,
    password: string,
}

