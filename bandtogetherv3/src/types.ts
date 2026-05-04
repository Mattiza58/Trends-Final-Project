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
    yrs_experience: string;
    songs?: Song[];
    bands?: Band[];
    onEditClick?: () => void;
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    genre: string;
    year: number;
    imageUrl: string;
}

export interface Band {
    id: string;
    name: string;
    imageUrl: string;
}

export interface FirestoreUserProfile {
    firstName: string;
    lastName: string;
    username: string;
    age: string;
    gender: string;
    location: string;
    instruments: string[];
    genres: string[];
    experience: string;
    email: string | null;
    songs?: string[];
    bands?: string[];
}