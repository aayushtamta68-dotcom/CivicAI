function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-[#F3E8E8] text-[#8A4D4D]",
    Medium: "bg-[#F4F1E8] text-[#8A6D3B]",
    Low: "bg-[#E7F2EA] text-[#49714E]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        styles[priority] || "bg-[#EDECEC] text-[#666666]"
      }`}
    >
      {priority}
    </span>
  );
}

export default PriorityBadge;