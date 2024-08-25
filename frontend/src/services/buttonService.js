const api_url = '/api/buttons';

export const getAll = async () => {
    const response = await fetch(api_url);
    return response.json();
}

export const getButton = async (id) => {
    const response = await fetch(`${api_url}/${id}`);
    return response.json();
}

export const createButton = async (data) => {
    const response = await fetch(api_url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export const editButton = async (id, data) => {
    const response = await fetch(`${api_url}/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export const deleteButton = async (id) => {
    await fetch(`${api_url}/${id}`, {
        method: "DELETE"
    });
}

export const isMaxButtonsCount = async () => {
    const response = await fetch(api_url);
    const responseJSON = await response.json();
    return responseJSON.length >= 9;
}