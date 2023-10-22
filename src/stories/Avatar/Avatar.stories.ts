import type { Meta, StoryObj } from "@storybook/react"

import { Avatar } from "./Avatar"

const meta = {
  title: "Liquid-UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const noSrc: Story = {
  args: {},
}

export const Primary: Story = {
  args: {
    src: "https://picsum.photos/200/300",
  },
}

export const Secondary: Story = {
  args: { src: "https://picsum.photos/200/300", variants: "Secondary" },
}
