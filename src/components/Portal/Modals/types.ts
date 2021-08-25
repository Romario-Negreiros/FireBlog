export type Inputs = {
    name: string,
    email: string,
    password: string,
    confirmpwd: string,
}

export interface Props {
    setIsModalVisible: (isModalVisible: boolean) => void
}