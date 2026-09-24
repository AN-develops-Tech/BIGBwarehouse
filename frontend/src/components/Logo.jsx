import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ lightTheme = false }) => {
    return (
        <div className="flex flex-col select-none">
            <div className="flex items-baseline font-black leading-none drop-shadow-sm">
                <span className={`text-4xl tracking-tighter ${lightTheme ? 'text-white' : 'text-brand-blue'}`}>
                    BIG
                </span>
                <span className="text-4xl text-brand-orange tracking-tighter animate-logo-b ml-[1px]">
                    B
                </span>
            </div>
            <span className={`text-[0.65rem] font-bold tracking-widest mt-0.5 ${lightTheme ? 'text-white' : 'text-gray-700'}`}>
                WAREHOUSE PARK
            </span>
        </div>
    );
};

export default Logo;
