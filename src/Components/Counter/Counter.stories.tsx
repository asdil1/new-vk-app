import type { Meta, StoryObj } from "@storybook/react";
import { Counter } from './Counter';

const meta: Meta<typeof Counter> = {
    title: 'Components/Counter',
    component: Counter,
    argTypes: {
        variants: {
            control: { type: 'select' },
            options: ['primary', 'secondary'],
        },
        size: {
            control: { type: 'number' },
        },
        quantity: {
            control: { type: 'text' },
        },
        pulse: {
            control: { type: 'boolean' },
        },
        stroke: {
            control: { type: 'boolean' },
        },
        strokeStyle: {
            control: { type: 'select' },
            options: ['dynamic', 'surface', 'base', 'secondary'],
        },
    },
};
export default meta;

type Story = StoryObj<typeof Counter>;

export const PrimaryXS: Story = {
    args: {
        variants: 'primary',
        size: 8,
        quantity: '2',
        pulse: true,
        stroke: false,
        strokeStyle: 'base'
    }
};

export const PrimaryS: Story = {
    args: {
        variants: 'primary',
        size: 12,
        quantity: '5',
        pulse: false,
        stroke: true,
        strokeStyle: 'base',
    }
}

export const PrimaryM: Story = {
    args: {
        variants: 'primary',
        size: 16,
        quantity: '100',
        pulse: false,
        stroke: true,
        strokeStyle: 'base',
    }
}

export const PrimaryL: Story = {
    args: {
        variants: 'primary',
        size: 20,
        quantity: 'abcd',
        pulse: false,
        stroke: true,
        strokeStyle: 'base',
    }
}

export const PrimaryXL: Story = {
    args: {
        variants: 'primary',
        size: 20,
        quantity: '5',
        pulse: false,
        stroke: false,
        strokeStyle: 'base',
    }
}