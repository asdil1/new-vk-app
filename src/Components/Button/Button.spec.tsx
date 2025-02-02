import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {

    test("renders with default props", () => {
        render(
            <Button variants="primary" size={36}>
                <Button.Label>Click Me</Button.Label>
            </Button>
        );
        expect(screen.getByText("Click Me")).toBeInTheDocument();
    });

    test("renders disabled state", () => {
        render(
            <Button variants="primary" size={36} state="disabled">
                <Button.Label>Disabled</Button.Label>
            </Button>
        );
        const button = screen.getByText("Disabled").closest("button");
        expect(button).toBeDisabled();
    });

    test("renders pressed state", () => {
        render(
            <Button variants="primary" size={36} state="pressed">
                <Button.Label>Pressed</Button.Label>
            </Button>
        );
        const button = screen.getByText("Pressed").closest("button");
        expect(button).toHaveClass("button--pressed");
    });

    test("renders loading state", () => {
        render(
            <Button variants="primary" size={36} state="loading">
                <Button.Label>Loading</Button.Label>
            </Button>
        );
        expect(screen.getByText("Loading")).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveClass("button--loading");
    });

    test("calls onClick when clicked", async () => {
        const onClickMock = jest.fn();
        render(
            <Button variants="primary" size={36} onClick={onClickMock}>
                <Button.Label>Click Me</Button.Label>
            </Button>
        );

        fireEvent.click(screen.getByText("Click Me"));

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test("does not call onClick when disabled", () => {
        const onClickMock = jest.fn();
        render(
            <Button variants="primary" size={36} state="disabled" onClick={onClickMock}>
                <Button.Label>Disabled</Button.Label>
            </Button>
        );

        fireEvent.click(screen.getByText("Disabled"));

        expect(onClickMock).not.toHaveBeenCalled();
    });

    test("renders Counter component inside Button", () => {
        const { container } = render(
            <Button variants="primary" size={36}>
                <Button.Label>Label</Button.Label>
                <Button.Counter quantity="123"/>
            </Button>
        );
        expect(screen.getByText("Label")).toBeInTheDocument();
        expect(container.querySelector('.counter')).toHaveClass('counter');
        expect(container.querySelector('.counter')).toHaveTextContent('99+');
    });

    test("renders Loader component inside Button when loading", () => {
        render(
            <Button variants="primary" size={36} state="loading">
                <Button.Label>Loading</Button.Label>
            </Button>
        );
        expect(screen.getByRole("button")).toHaveClass("button--loading");
    });

});
