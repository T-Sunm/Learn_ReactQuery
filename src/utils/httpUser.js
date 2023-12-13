export async function createNewUser(userData) {
    let url = "http://localhost:3000/createUser";
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        },
    });



    if (!response.ok) {
        const error = new Error("An error occurred while fetching the events");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { events } = await response.json();
    console.log(events)
    return events;
}

export async function Login(userData) {

    let url = "http://localhost:3000/login";
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log(userData)



    if (!response.ok) {
        const error = new Error("An error occurred while fetching the events");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const result = await response.json();
    return result.userWithoutPassword;
}