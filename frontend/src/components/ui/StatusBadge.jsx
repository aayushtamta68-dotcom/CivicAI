function StatusBadge({ status }) {
  const styles = {
    Submitted: "bg-[#F4F1E8] text-[#8A6D3B]",
    Pending: "bg-[#F4F1E8] text-[#8A6D3B]",
    "In Progress": "bg-[#E7EEF4] text-[#3B6C8A]",
    Resolved: "bg-[#E7F2EA] text-[#49714E]",
    Rejected: "bg-[#F3E8E8] text-[#8A4D4D]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-[#EDECEC] text-[#666666]"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;