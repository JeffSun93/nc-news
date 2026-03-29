const ArticleCardSkeleton = () => {
  return (
    <li className="bg-white/[0.84] border border-[rgba(17,34,48,0.12)] rounded-2xl p-5 shadow-[0_12px_32px_rgba(15,35,53,0.12)] overflow-hidden">
      {/* Image placeholder */}
      <div className="w-full aspect-[16/9] rounded-xl bg-gray-200 animate-pulse mb-4" />

      <div className="space-y-2">
        {/* Topic badge */}
        <div className="h-3.5 w-20 rounded bg-gray-200 animate-pulse mb-1" />

        {/* Title */}
        <div className="space-y-1.5">
          <div className="h-5 w-full rounded bg-gray-200 animate-pulse" />
          <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse" />
        </div>

        {/* Author + time */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="h-7 w-28 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-3.5 w-16 rounded bg-gray-200 animate-pulse" />
        </div>

        {/* Votes + comments */}
        <div className="flex items-center gap-3 pt-3 border-t border-[rgba(17,34,48,0.08)]">
          <div className="h-7 flex-1 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-7 flex-1 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </div>
    </li>
  );
};

export default ArticleCardSkeleton;
