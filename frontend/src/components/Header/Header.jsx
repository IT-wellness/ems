import React from "react";
import { Bell, ArrowLeft, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ title="MyWellness", showBack=false, className="", onMenuClick = () => {} }) => {
    const navigate = useNavigate();
    
    return (
        <header className={`flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200 ${className}`}>
            <div className="flex items-center space-x-4">
                
                {!showBack && (
                    <button
                        className="md:hidden text-gray-600 focus:outline-none"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                )}
                
                {showBack ? (
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-600 hover:underline space-x-1"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Back</span>
                        </button>
                ): (
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-700 text-white h-10 w-10 flex items-center justify-center rounded">
                    <span className="text-xl font-bold">🏢</span>
                </div>
                <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
            </div>
                
                )}

                </div>
                
            <div className="flex items-center space-x-4">
                <button className="relative">
                    <Bell className="h-6 w-6 text-gray-600" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">3</span>
                </button>

                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-white">
                    SK
                </div>

                <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">Sawan Khanna</div>
                    <div className="text-xs text-gray-500">Admin</div>
                </div>

                <div className="cursor-pointer">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </header>
    )
}

export default Header;