import axios from 'axios';

export async function getUserProfile(accessToken) {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}