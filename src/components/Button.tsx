import { ReactNode } from "react"

interface ButtonProps {
    children: ReactNode,
    className?: string,
    onClick?: () => void;
}

export function Button({ children, className, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    )
}