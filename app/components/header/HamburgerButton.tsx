import { cn } from "@/lib/utils";

export function HamburgerButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="xl:hidden p-2 text-[var(--red)] focus:outline-none"
      aria-label="Toggle menu"
    >
      <div className="w-5 h-4 relative flex flex-col justify-between">
        <span className={cn("w-full h-0.5 bg-current transition-all duration-300", isOpen && "rotate-45 translate-y-1.5")} />
        <span className={cn("w-full h-0.5 bg-current transition-all duration-300", isOpen && "opacity-0")} />
        <span className={cn("w-full h-0.5 bg-current transition-all duration-300", isOpen && "-rotate-45 -translate-y-1.5")} />
      </div>
    </button>
  );
}
