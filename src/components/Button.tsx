import * as React from 'react'

interface IButton {
    children: React.ReactNode, 
    onClick?: () => void,
    type?: 'button' | 'submit' | 'reset', 
}

const Button: React.FC<IButton> = ({children, onClick, type}) => {
    return (
        <button type={type} onClick={onClick}>{children}</button>
    )
}

export default Button;