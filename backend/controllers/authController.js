import jwt from 'jsonwebtoken';
import msalClient from '../utils/msalConfig.js';
import { getUserProfile } from '../utils/graphService.js';
import UserRoleMap from '../models/UserRoleMap.js';
import Employee from '../models/Employee.js';
import logger from '../utils/logger.js';
import config from '../config.js';
import { validationResult } from 'express-validator';

const { frontendUrl, backendUrl } = config;
const redirectUri = `${backendUrl}/auth/redirect`;

async function resolveEmail(identifier) {
  const candidate = identifier.trim();

  if (candidate.includes('@')) {
    return candidate.toLowerCase();
  }
  const employee = await Employee.findOne({ employeeCode: candidate.toUpperCase() });
  return employee?.contactEmail?.toLowerCase() || null;
}

export async function loginHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { identifier } = req.query;

  try {
    const email = await resolveEmail(identifier);
    if (!email) {
      return res.status(404).json({ message: 'Unknown employee code or email' });
    }

    const authCodeUrlParams = {
      scopes: ['User.Read'],
      redirectUri,
      loginHint: email
    };

    const authCodeUrl = await msalClient.getAuthCodeUrl(authCodeUrlParams);
    return res.redirect(authCodeUrl);
  } catch (error) {
    logger.error('Auth code URL generation failed', { error, identifier });
    return res.status(500).json({
      message: 'Authentication service unavailable',
      referenceId: req.id || 'unknown'
    });
  }
}

/**
 * Handler for /auth/redirect
 * Exchanges auth code for tokens, fetches profile,
 * verifies employee in DB, then issues JWTs and redirects.
 */
export async function redirectHandler(req, res) {
  if (!req.query.code) {
    logger.warn('Missing auth code in redirect');
    return res.redirect(`${frontendUrl}/login?error=invalid_request`);
  }

  const tokenRequest = {
    code: req.query.code,
    scopes: ['User.Read'],
    redirectUri
  };

  try {
    const authResult = await msalClient.acquireTokenByCode(tokenRequest);

    const profile = await getUserProfile(authResult.accessToken);
    const msGraphUserId = profile.id;
    const email = (profile.mail || profile.userPrincipalName || '').toLowerCase();

    const user = await UserRoleMap.findOne({ 
      $or: [
        { msGraphUserId }, 
        { email }
      ], 
      isActive: true 
    }).populate('employee');

    if (!user) {
      return res.redirect(`${frontendUrl}/login?error=not_found`);
    }

    const jwtPayload = {
      id: user._id,
      msGraphUserId: user.msGraphUserId,
      email: user.email,
      role: user.role,
      employee: user.employee ? user.employee._id : null
    };

   const jwtToken = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
        issuer: 'wellness-extract-auth'
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    await UserRoleMap.findByIdAndUpdate(user._id, { refreshToken });
    return res.redirect(`${frontendUrl}/dashboard?token=${jwtToken}&refreshToken=${refreshToken}`);
  } catch (error) {
    logger.error('MSAL authentication failed', { error });
    return res.redirect(`${frontendUrl}/login?error=auth_failed`);
  }
}