import type { IconProps } from '.'

export const CreateIcon = ({
  color = '#FFFFFF',
  height = 24,
  width = 24
}: IconProps) => (
  <svg
    fill="FFFFFF"
    height={height}
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0a2.4 2.4 0 0 1 2.4 2.4v7.2h7.2a2.4 2.4 0 0 1 0 4.8h-7.2v7.2a2.4 2.4 0 0 1-4.8 0v-7.2H2.4a2.4 2.4 0 0 1 0-4.8h7.2V2.4A2.4 2.4 0 0 1 12 0Z"
      fill={color}
    />
  </svg>
)
