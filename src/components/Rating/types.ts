import { UserData } from '../../context/UserContext';

export type Rate = {
    userid: string;
    rate: string;
}[];

export interface Props {
    setRate: (rate: Rate) => void;
    rate: Rate;
    user: UserData;
}
