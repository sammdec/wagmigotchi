export default function Star(props) {
  const { className } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 82 82"
      className={className}
    >
      <path
        fill="currentcolor"
        d="M81.5 72.501h-9v9h9v-9Zm-9-9h-9v9h9v-9Zm-9-9h-9.001v9H63.5v-9ZM27.499 18.5h-9v9h9v-9Zm-9-9H9.49899v9H18.499v-9ZM9.49899.5H.498993v9H9.49899v-9Zm0 72.001H.498993v9H9.49899v-9Zm9.00001-9H9.49899v9H18.499v-9Zm9-9h-9v9h9v-9Z"
      />
      <path
        fill="currentcolor"
        d="M45.5 27.5V.5h-9v27h-9v9H.498993v9.001H27.5v9h9v27h9v-27h8.999v-9H81.5V36.5H54.499v-9H45.5Z"
      />
      <path
        fill="currentcolor"
        d="M63.5 18.5h-9.001v9H63.5v-9Zm9-9h-9v9h9v-9Zm9-9h-9v9h9v-9Z"
      />
    </svg>
  )
}
