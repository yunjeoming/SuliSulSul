const SkeletonGrade = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="basis-1/2 flex flex-col items-center gap-2">
        <div className="w-12 h-6 bg-zinc-200 rounded-md"></div>
        <div className="w-28 h-6 bg-zinc-200 rounded-md"></div>
      </div>
      <div className="basis-1/2 flex flex-col items-center gap-2">
        <div className="w-28 h-2 bg-zinc-200 rounded-md"></div>
        <div className="w-28 h-2 bg-zinc-200 rounded-md"></div>
        <div className="w-28 h-2 bg-zinc-200 rounded-md"></div>
        <div className="w-28 h-2 bg-zinc-200 rounded-md"></div>
        <div className="w-28 h-2 bg-zinc-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonGrade;
