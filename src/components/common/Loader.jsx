import { Loader2 } from 'lucide-react';

export default function Loader({ fullScreen = false }) {
  const containerClass = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-bgDark/80 backdrop-blur-sm z-50"
    : "flex justify-center items-center p-8";

  return (
    <div className={containerClass}>
      <Loader2 className="animate-spin text-primary w-10 h-10" />
    </div>
  );
}
