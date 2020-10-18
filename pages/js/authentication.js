import axios from 'axios';

/**
 * Signs the user in.
 * 
 * @param {object} userData - an object containing user credentials.
 * 
 * @returns JWT token.
 */
async function signInUser(userData) {
    let response = null;

    try {
        response = await axios.post('https://doggo.co.ua/auth/local', {
            identifier: userData.email,
            password: userData.password
        });

        return response;
    } catch (error) {
        return error;
    }
}

function signUpUser() { }

export { signInUser };