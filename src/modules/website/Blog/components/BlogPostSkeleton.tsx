import { Skeleton } from "@/common/components/ui/Skeleton";

export function BlogPostSkeleton() {
  return (
    <article className="mx-auto w-full md:max-w-3xl space-y-8 py-8">
      <Skeleton className="h-9 w-32" />

      <Skeleton className="w-full h-64 md:h-96 rounded-2xl" />

      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-4/5" />

        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />

        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-8 w-48 mt-6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="flex gap-2 pt-8 border-t">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </article>
  );
}
