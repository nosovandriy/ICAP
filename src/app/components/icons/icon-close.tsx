export const CloseIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <g id="Group 1419">
        <path
          id="Vector 29"
          d="M14.9492 5.05029L5.04972 14.9498"
          stroke="#ff0d00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          id="Vector 30"
          d="M14.9492 14.9497L5.04973 5.05021"
          stroke="#ff0d00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
