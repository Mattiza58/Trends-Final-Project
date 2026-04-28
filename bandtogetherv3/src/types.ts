export interface User {
    userID: string;
    name: string;
    email: string;
    authToken?: string;
}

export interface UserProps{
    name: string;
    user_name: string;
    followers: number;
    following: number;
    location: string;
    instruments: string;
    genres: string;
    yrs_experience: string
}