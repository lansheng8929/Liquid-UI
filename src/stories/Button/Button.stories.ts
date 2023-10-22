import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "./Button"

const meta = {
  title: "Liquid-UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: "Button",
  },
}

export const Secondary: Story = {
  args: {
    variants: "Secondary",
    label: "Button",
  },
}


