import './Counter.styl';
import {FC} from "react";


type CounterVariants = 'primary' | 'secondary';
type CounterSize = 8 | 12 | 16 | 20 | 24;
type StrokeStyle = 'dynamic' | 'surface' | 'base' | 'secondary';

export interface CounterProps {
    variants: CounterVariants;
    size: CounterSize;
    quantity?: string;
    stroke?: boolean;
    strokeStyle?: StrokeStyle;
    pulse?: boolean;
}

export const Counter: FC<CounterProps> & {
    CounterBadge: typeof CounterBadge;
    CounterPulse: typeof CounterPulse;
} = ({
    variants,
    size,
    quantity = '0',
    stroke = false,
    strokeStyle = 'dynamic',
    pulse = false,
}) => {

    const maxWidth = quantity.length >= 3 ? size + 10 : quantity.length + size;

    return (
        <div className={`
            counter
            counter--${variants}
            counter--size-${size}
            ${stroke ? `counter--stroke counter--bordercolor-${strokeStyle}` : ''}`}
            style={{
                width: (quantity.length === 1 || size <= 12) ? size : Math.min(maxWidth, size * 2)
            }}
        >
            {quantity && <Counter.CounterBadge quantity={quantity} size={size} />}
            {pulse && <Counter.CounterPulse size={size}/>}
        </div>
    );
};


interface CounterBadgeProps {
    quantity: string;
    size: CounterSize;
}

const CounterBadge: FC<CounterBadgeProps> = ({ quantity, size }) => {
    if (size <= 12) return null;

    const formatedValue = formatQuantity(quantity);

    return <span className="counter--badge">{formatedValue}</span>;
};

const formatQuantity = (value: string) : string => {
    if (parseInt(value) > 99) return '99+'
    return value.length > 3 ? value.slice(0, 3) : value;
}


interface CounterPulseProps {
    size: CounterSize;
}

const CounterPulse: FC<CounterPulseProps> = ({ size }) => {
    if (size > 12) return null;
    return (
        <>
            <div className='counter--pulse'>
                <div className="counter--pulse-container">
                    <div className="pulse one" style={{width: size, height: size}}></div>
                    <div className="pulse two" style={{width: size, height: size}}></div>
                </div>
            </div>
        </>
    );
}

Counter.CounterBadge = CounterBadge;
Counter.CounterPulse = CounterPulse;