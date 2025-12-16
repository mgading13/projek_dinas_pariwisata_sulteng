export default function ErrorCard({
  title = "Terjadi kesalahan",
  message,
  onRetry,
}) {
  return (
    <div className="h-[380px] w-[260px] rounded-3xl 
                    flex flex-col items-center justify-center
                    bg-red-500/10 p-6 text-white text-center">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm opacity-80 mt-1">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-white/20 rounded-lg"
        >
          Coba lagi
        </button>
      )}
    </div>
  );
}
