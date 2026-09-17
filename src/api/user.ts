import { ProfileModel, ContactModel } from "../models/user";

const url = `${import.meta.env.VITE_HOST}/profile`

async function loginUser(email: string, password: string) {
   try{
        
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);

        const response = await fetch(`${url}/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            },
            body: formData,
        });

        let res = await response.json();
        return res;
   }
   catch (error) {
        throw error;
   }
}

async function UpdateUser(profile: ProfileModel) {
    try {
        const formData = new FormData();
        formData.append('id', profile.id);
        formData.append('name', profile.name);
        formData.append('about', profile.about);
        formData.append('photo', profile.photo);
        
        const response = await fetch(`${url}/update`, {
            method: 'PATCH',
            headers: {
            'Accept': 'application/json',
            },
            body: formData,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

async function UpdateContact(contact: ContactModel) {
    const formData = new FormData();
    formData.append('id', contact.id);
    formData.append('email', contact.email);
    formData.append('phone', contact.phone);
    formData.append('password', contact.password);
    formData.append('location', contact.location);
    formData.append('instagram', contact.instagram);
    formData.append('facebook', contact.facebook);

    try {
        const response = await fetch(`${url}/contact/update`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        });
        const res = await response.json();
        return res;
    } catch (error) {
        throw error;
    }

}

async function ProfileData() {
    try {
        const response = await fetch(`${url}/profile`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        })

        const res = await response.json();
        if(!res) throw "Something went wrong!"

        return res;
    } catch (error) {
        throw error;
    }
}

export { UpdateContact, UpdateUser, loginUser, ProfileData };

