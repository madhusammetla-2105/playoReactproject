export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-bgDark hover:bg-hoverGreen",
    secondary: "bg-darkGreen text-textWhite hover:bg-accentGreen",
    outline: "border border-primary text-primary hover:bg-primary hover:text-bgDark",
    ghost: "text-textGray hover:text-textWhite hover:bg-cardBg"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
