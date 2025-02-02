import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { Counter } from "./Counter";

describe('Counter Component', () => {
    test('renders with default props', () => {
        render(<Counter size={16} variants="primary" quantity="2" />);
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('renders with quantity variant', () => {
        render(<Counter variants='primary' size={8} quantity='2'/>);
        expect(screen.queryByText('2')).toBeNull();

        render(<Counter variants='primary' size={16} quantity='2'/>);
        expect(screen.getByText('2')).toBeInTheDocument();

        render(<Counter variants='secondary' size={24} quantity='abcd'/>);
        expect(screen.getByText('abc')).toBeInTheDocument();

        render(<Counter variants='primary' size={24} quantity='123'/>);
        expect(screen.getByText('99+')).toBeInTheDocument();
    });


    test('renders stroke variant', () => {
        render(<Counter size={16} variants="primary" quantity="2" stroke strokeStyle="base" />);
        const counter = screen.getByText('2').parentElement;
        expect(counter).toHaveClass('counter--stroke');
        expect(counter).toHaveClass('counter--bordercolor-base');
    });

    test('renders pulse variant for small sizes', () => {
        const { container } = render(<Counter size={8} variants="primary" quantity="2" pulse />);
        expect(container.querySelector('.counter--pulse')).toHaveClass('counter--pulse');
    });

    test('renders pulse variant for big sizes', () => {
        const { container } =  render(<Counter size={16} variants="primary" pulse />);
        expect(container.querySelector('.counter--pulse')).toBeNull();
    });
});