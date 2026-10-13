function DashboardCard({
  title,
  value,
  accent = "#B7C396",
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#CCCCCC] bg-[#FEFEFE] p-6 shadow-sm transition-all duration-200 hover:shadow-md">

      <div
        className="absolute left-0 top-0 h-full w-2"
        style={{ backgroundColor: accent }}
      />

      <div className="pl-4">

        <p className="text-sm font-medium tracking-wide text-[#666666] uppercase">
          {title}
        </p>

        <h2 className="mt-4 text-4xl font-bold text-[#2F2F2F]">
          {value}
        </h2>

      </div>

    </div>
  );
}

export default DashboardCard;