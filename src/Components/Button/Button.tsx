import {createContext, FC, ReactNode, useContext, useState} from "react";
import {Counter, CounterProps} from "../Counter/Counter";
import './Button.styl'

type ButtonVariants = 'primary' | 'secondary';
type ButtonSize = 28 | 36 | 56;
type ButtonState = 'enabled' | 'pressed' | 'loading' | 'disabled';

interface ButtonContextProps {
    variants: ButtonVariants;
    size: ButtonSize;
}

const ButtonContext = createContext<ButtonContextProps | null>(null);
export const useButtonContext = () => useContext(ButtonContext);

interface ButtonProps {
    variants: ButtonVariants;
    size: ButtonSize;
    state?: ButtonState;
    focused?: boolean;
    children?: ReactNode;
    onClick?: () => void;
}

export const Button: FC<ButtonProps> & {
    Label: typeof Label;
    Loader: typeof Loader;
    Counter: typeof ButtonCounter;
} = ({
    variants,
    size,
    state = 'enabled',
    focused = false,
    children,
    onClick,
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        if (isLoading || state === 'disabled') return;

        setIsLoading(true); // Включаем загрузку

        try {
            await onClick?.();
        } finally {
            setTimeout(() => setIsLoading(false), 2000);
        }
    };

    const isDisabled = state === 'disabled';

    return (
        <ButtonContext.Provider value={{variants, size}}>
            <button
                className={`
                    button
                    button--${variants}
                    button--size-${size}
                    ${state === 'pressed' ? 'button--pressed' : ''}
                    ${focused ? 'button--focused' : ''}
                    ${(isLoading || state === 'loading') ? 'button--loading': ''}
                `}
                onClick={handleClick}
                disabled={isDisabled}
            >
                <div className="button--content">
                    {children}
                </div>
                {(isLoading || state === 'loading') && (
                    <>
                        <Button.Loader/>
                        <div className="button--shimmer"></div>
                    </>
                )}
            </button>

        </ButtonContext.Provider>
    );
}


interface LabelProps {
    children: ReactNode;
}

const Label: FC<LabelProps> = ({ children }) => {
    const context = useButtonContext();
    if (!context) {
        throw new Error("Button.Label must be used inside a Button component.");
    }

    return <span className="button--label">{children}</span>;
};


const Loader: FC = () => {
    const context = useButtonContext();
    if (!context) {
        throw new Error("Button.Loader must be used inside a Button component.");
    }

    const getSize = () => {
        const sizes: Record<ButtonSize, { width: number; height: number }> = {
            28: { width: 16, height: 16 },
            36: { width: 20, height: 20 },
            56: { width: 24, height: 24 },
        };

        return sizes[context.size];
    }

    return (
        <>
            <div className="button--loader" style={{width: getSize().width, height: getSize().height}}>
                <svg width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                            strokeDasharray="31.4 31.4" transform="rotate(-90 25 25)">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
                                          values="0 25 25;360 25 25"/>
                    </circle>
                </svg>
            </div>
        </>
    );
};


type ButtonCounterProps = Omit<CounterProps, 'variants' | 'size'>

const ButtonCounter: FC<ButtonCounterProps> = (props) => {
    const context = useButtonContext();
    if (!context) {
        throw new Error("Button.Counter must be used inside a Button component.");
    }

    const getCounterSize = () => {
        if (context.size <= 28) return 16;
        if (context.size <= 36) return 20;
        return 24;
    }

    return <Counter {...props} variants={context.variants} size={getCounterSize()}/>;
};


Button.Counter = ButtonCounter;
Button.Label = Label;
Button.Loader = Loader;