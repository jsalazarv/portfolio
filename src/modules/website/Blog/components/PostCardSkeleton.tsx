import { Skeleton } from "@/common/components/ui/Skeleton";
import { Card } from "@/common/components/ui/card";

export function PostCardSkeleton() {
  return (
    <Card padding="compact" className="flex flex-col h-full">
      <Skeleton className="w-full aspect-video rounded-lg mb-4" />

      <div className="flex-1 space-y-3">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        <div className="flex gap-2 pt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </Card>
  );
}
