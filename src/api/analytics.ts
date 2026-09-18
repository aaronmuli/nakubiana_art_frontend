const url = import.meta.env.VITE_HOST

async function home() {
    const _ = await fetch(`${url}/home`,{
        method: "GET",
        credentials: "include"
    });
}

async function gallery() {
    const _ = await fetch(`${url}/gallery`,{
        method: "GET",
        credentials: "include"
    });
}

async function about() {
    const _ = await fetch(`${url}/about`,{
        method: "GET",
        credentials: "include"
    });
}

async function contact() {
    const _ = await fetch(`${url}/contact`,{
        method: "GET",
        credentials: "include"
    });
}

async function getAnalytics() {
    try {
        const response = await fetch(`${url}/analytics`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            }
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

export {
    home,
    gallery,
    about,
    contact,
    getAnalytics
}