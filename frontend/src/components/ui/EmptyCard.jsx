export default function EmptyCard({
  title = "Data tidak tersedia",
  description = "Belum ada data untuk ditampilkan",
  action,
}) {
  return (
    <div className="h-[380px] w-[260px] rounded-3xl 
                    flex flex-col items-center justify-center
                    text-center bg-white/10 p-6 text-white">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm opacity-80 mt-1">{description}</p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
