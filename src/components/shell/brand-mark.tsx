type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span
      aria-hidden
      className={`grid size-8 shrink-0 grid-cols-2 gap-[3px] rounded-lg bg-foreground p-[5px] ${className}`}
    >
      <span className="rounded-[2px] bg-white/92" />
      <span className="rounded-[2px] bg-lime" />
      <span className="rounded-[2px] bg-white/92" />
      <span className="rounded-[2px] bg-white/35" />
    </span>
  );
}
