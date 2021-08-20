import React from 'react';

const Header = ({ text }) => {
    return (
        <header>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900">
                    {text}
                </h1>
            </div>
        </header>
    )
}

export default Header;