import { X } from "lucide-react";


export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="cursor-pointer hover:bg-gray-100 rounded-full p-1.5"
          >
            <X />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
