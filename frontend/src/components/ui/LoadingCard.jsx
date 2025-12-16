export default function LoadingCard({
  title = "Memuat data...",
  description = "Mohon tunggu sebentar",
}) {
  return (
    <div
      className="
        h-[380px] w-[260px]
        sm:h-[440px] sm:w-[320px]
        rounded-3xl bg-white/10
        animate-pulse p-4
        flex flex-col justify-end
        text-white
      "
    >
      {/* skeleton image */}
      <div className="flex-1 rounded-xl bg-white/10 mb-4" />

      {/* title */}
      <div className="h-4 w-2/3 bg-white/30 rounded mb-2" />

      {/* description */}
      <div className="h-3 w-1/2 bg-white/20 rounded" />

      {/* actual text (sr-only for accessibility) */}
      <span className="sr-only">{title}</span>
      <span className="sr-only">{description}</span>
    </div>
  );
}
