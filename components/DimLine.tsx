// Dimension-line motif: 1px rule with end ticks + optional mono measurement label.
// Pure markup — usable from server and client components.
export default function DimLine({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={className} aria-hidden>
      <div className="dim-line" />
      {label && (
        <p className="mt-2 font-grotesk text-[10px] tracking-[0.25em] text-concrete">{label}</p>
      )}
    </div>
  );
}
