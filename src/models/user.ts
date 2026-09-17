
export type ContactModel = {
    id: string;
    email: string;
    phone: string;
    password: string;
    location: string;
    instagram: string;
    facebook: string;  
}

export type ProfileModel = {
    id: string;
    photo: File | string;
    name: string;
    about: string;
    // contact: ContactModel;
}