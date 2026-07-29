import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function InfoRow({
  label,
  value,
  copyable = false,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-black/5 pb-3">
      <p className="font-medium">{label}</p>

      <div className="flex items-center gap-2">
        <p className="text-gray-500 break-all">{value}</p>

        {copyable && (
          <button
            onClick={handleCopy}
            title="Copy"
            className="text-gray-400 hover:text-[#ff5700] transition-colors cursor-pointer"
          >
            {copied ? (
              <Check size={18} />
            ) : (
              <Copy size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}