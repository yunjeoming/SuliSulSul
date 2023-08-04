const SkeletonAlcoholItem = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-24 h-24 bg-zinc-200 rounded-md m-2"></div>
      <div className="flex flex-col gap-2">
        <div className="w-32 h-4 bg-zinc-200 rounded-md"></div>
        <div className="w-48 h-4 bg-zinc-200 rounded-md"></div>
        <div className="w-48 h-4 bg-zinc-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonAlcoholItem;
