import axios from 'axios';

export async function getUserProfile(accessToken) {
    if (!accessToken) {
    throw new Error("Access token is required to fetch user profile");
  }

  try {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
      timeout: 5000
    });
    return response.data;
} catch (error) {
    console.error('[GraphService] Failed to fetch user profile:', error.message);
    throw new Error('Failed to retrieve user profile from Microsoft Graph');
}
}