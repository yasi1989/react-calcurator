type ButtonProps = {
  isNumber: boolean;
  placeholder: string;
  onClick: (placeholder: string) => void;
  disabled?: boolean;
};

const CustomButton = ({ isNumber, placeholder, onClick, disabled=false }: ButtonProps) => {
  const buttonStyle = isNumber
    ? { bgColor: disabled ? "bg-gray-400" : "bg-gray-300" }
    : { bgColor: disabled ? "bg-gray-400" : "bg-yellow-300" };
  return (
    <button
      className={`p-6 rounded-md text-2xl ${buttonStyle.bgColor} shadow-md w-full ${disabled ? "cursor-not-allowed" : ""}`}
      onClick={() => onClick(placeholder)}
      disabled={disabled}
    >
      {placeholder}
    </button>
  );
};

export default CustomButton;
