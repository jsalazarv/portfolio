import { Badge } from "@/common/components/ui/badge";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap items-center">
      <span className="text-sm font-medium text-muted-foreground">
        Categorías:
      </span>

      <Badge
        variant={selectedCategory === null ? "default" : "outline"}
        className="cursor-pointer"
        onClick={() => onSelectCategory(null)}
      >
        Todas
      </Badge>

      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
