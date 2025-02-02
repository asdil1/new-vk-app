import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button.tsx";

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variants: {
            control: { type: 'select' },
            options: ['primary', 'secondary'],
        },
        size: {
            control: { type: 'select' },
            options: [28, 36, 56],
        },
        state: {
            control: { type: 'select' },
            options: ['enabled', 'pressed', 'loading', 'disabled'],
        },
        focused: {
            control: { type: 'boolean' },
        },
        children: {
            control: { type: 'select'},
            options: ['label', 'counter', 'both'],
            mapping: {
                label: <Button.Label>Click me</Button.Label>,
                counter: <Button.Counter quantity="10" />,
                both: (
                    <>
                        <Button.Label>Click me</Button.Label>
                        <Button.Counter quantity="10" />
                    </>
                ),
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '150px', margin: '0 auto', padding: '20px', border: '1px solid #ccc' }}>
                <Story />
            </div>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const PrimaryXS: Story = {
    args: {
        variants: 'primary',
        size: 28,
        state: 'enabled',
        focused: false,
        children: 'Primary S',
    },
};

export const PrimaryS: Story = {
    args: {
        variants: 'primary',
        size: 36,
        state: 'enabled',
        focused: false,
        children: 'Primary S',
    },
};

export const PrimaryM: Story = {
    args: {
        variants: 'primary',
        size: 56,
        state: 'enabled',
        focused: false,
        children: 'Primary M',
    },
};

export const SecondaryXS: Story = {
    args: {
        variants: 'secondary',
        size: 28,
        state: 'enabled',
        focused: false,
        children: 'Secondary XS',
    },
};

export const LoadingState: Story = {
    args: {
        variants: 'primary',
        size: 36,
        state: 'loading',
        focused: false,
        children: 'Loading...',
    },
};

export const DisabledState: Story = {
    args: {
        variants: 'secondary',
        size: 56,
        state: 'disabled',
        focused: false,
        children: 'Disabled',
    },
};

export const FocusedState: Story = {
    args: {
        variants: 'primary',
        size: 36,
        state: 'enabled',
        focused: true,
        children: 'Focused',
    },
};