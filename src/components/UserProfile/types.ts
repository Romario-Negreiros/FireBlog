import { UserData as Type } from "../../context/UserContext";

export interface UserData extends Type {
    firebaseUid: string;
    isProfilePrivate: boolean;
}

export interface UserInfo {
    user: UserData | null;
    posts_created: number;
    posts_average_rate: string;
    total_comments: number;
    total_likes_in_comments: number;
}
