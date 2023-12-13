import React from 'react'

const Button = ({ label, disabled, outline, small, Icon, onClick }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`relative disabled:opacity-70 
            disabled:cursor-not-allowed rounded-lg 
            hover:opacity-80 transition w-full
            ${outline ? 'bg-white border-black text-black' : 'bg-rose-500 border-rose-500 text-white'}
            ${small ? 'py-1 text-sm font-light border-[1px]' : 'py-3 text-md font-semibold border-2'}
            `}
        >
            {Icon && (
                <Icon className="absolute left-4 top-3" size={24} />
            )}
            {label}
        </button>
    )
}

export default Button