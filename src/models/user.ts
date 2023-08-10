export interface User {
    email: string
    token: string
    username: string
    bio: string
    image: string
}
export interface Login {
    email: string;
    password: string;
}

export interface UpdateUser {
    image: string;
    username: string;
    bio: string;
    email: string;
    password: string;
}
