interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 border border-muted-foreground/30 px-3 py-2 font-mono text-sm focus-within:border-primary/60 transition-colors duration-200">
      <span className="text-primary shrink-0 select-none">{">"}_</span>
      <input
        type="search"
        placeholder={placeholder ?? "SEARCH::"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/40 placeholder:tracking-widest placeholder:uppercase focus:outline-none text-xs tracking-wider"
      />
    </div>
  );
}
