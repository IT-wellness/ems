import React from 'react';
import LoginForm from './LoginForm';
import loginBannerImage from '../assets/LoginBanner.png';

const LoginPage = () => {
    return (
        <div
            className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
            style={{ backgroundImage: `url(${loginBannerImage})` }}
        >
            {/* Optional light overlay */}
            <div className="absolute inset-0 bg-[#F6EEF3]/20 z-0" />

            {/* Login form container */}
            <div className="relative z-10 p-8 w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
