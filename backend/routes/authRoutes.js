import express from 'express';
import msalClient from '../utils/msalConfig.js';
import { getUserProfile } from '../utils/graphService.js';
import employeeModel from '../models/Employee.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const redirectUri = 'http://localhost:5000/auth/redirect';

async function resolveEmail(identifier) {
    const candidate = identifier.trim();

    if (candidate.includes('@')) return candidate.toLowerCase();
    const employee = await employeeModel.findOne({ 'employeeCode': candidate.toUpperCase() }).lean();
    // console.log(employee.email.toLowerCase());
    return employee ? employee.email.toLowerCase() : null;
}

router.get('/login', async (req, res) => {
    const { identifier } = req.query;

    if (!identifier) {
        return res.status(400).json({ message: 'identifier query-param missing' });
    }
    console.log("ID: ", identifier);
    try {
        const email = await resolveEmail(identifier);
        if (!email) {
            return res.status(404).json({ message: 'Unknown employee code or email' });
    }

    const authCodeUrlParams = {
        scope: ['User.Read'],
        redirectUri: redirectUri,
        loginHint: email
    };

        const authCodeUrl = await msalClient.getAuthCodeUrl(authCodeUrlParams);
        return res.redirect(authCodeUrl);
    } catch (error) {
        console.error('Error generating auth code URL:', error);
        return res.status(500).json({ message: 'Error generating auth code URL', error: error.message });
    }
});

router.get('/redirect', async (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ['User.Read'],
        redirectUri
    };

    try {
        const authResult = await msalClient.acquireTokenByCode(tokenRequest);
        const profile = await getUserProfile(authResult.accessToken);
        const email = (profile.mail || profile.userPrincipalName || '').toLowerCase();

        const employee = await employeeModel.findOne({ email });
        if (!employee) {
            return res.redirect(`http://localhost:5173/login?error=not_found`);
        }
        
        const jwtToken = jwt.sign(
            { id: employee._id, email: employee.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.redirect(`http://localhost:5173/dashboard?token=${jwtToken}`);
    } catch (error) {
        console.error('Error during MS login:', error);
        return res.redirect(`http://localhost:5173/login?error=auth_failed`);
    }
});

export default router;