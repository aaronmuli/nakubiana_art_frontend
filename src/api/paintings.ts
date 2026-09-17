import { Painting } from "@/models/painting";

const url = `${import.meta.env.VITE_HOST}`

async function addPainting(painting: Painting) {
    try {
        const formData = new FormData();
        formData.append("title", painting.title);
        formData.append("year", painting.year);
        formData.append("medium", painting.medium);
        formData.append("dimensions", painting.dimensions);
        formData.append("category", painting.category);
        formData.append("description", painting.description);
        formData.append("image", painting.image);

        const response = await fetch(`${url}/add`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

async function trashPainting(id: string) {
    try {
        const response = await fetch(`${url}/delete/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

async function updatePainting(painting: Painting, id: string) {
    try {
        const formData = new FormData();
        formData.append("title", painting.title);
        formData.append("year", painting.year);
        formData.append("medium", painting.medium);
        formData.append("dimensions", painting.dimensions);
        formData.append("category", painting.category);
        formData.append("description", painting.description);
        if (painting.image) {
            formData.append("image", painting.image);
        }

        const response = await fetch(`${url}/update/${id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

async function getPaintings() {
    try {
        const response = await fetch(`${url}/paintings`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export { 
    getPaintings, 
    addPainting, 
    trashPainting,
    updatePainting
};