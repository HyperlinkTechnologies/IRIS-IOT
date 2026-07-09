export default function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-black/5 pb-3">
      <p className="font-medium">{label}</p>

      <p className="text-gray-500 break-all">{value}</p>
    </div>
  );
}
