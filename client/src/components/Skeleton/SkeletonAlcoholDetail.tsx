import SkeletonTitle from "./SkeletonTitle";

const SkeletonAlcoholDetail = () => {
  return (
    <div className="flex flex-col gap-8">
      <SkeletonTitle/>
      <div className="w-full h-48 bg-zinc-200 rounded-md"></div>
      <div>
        <div className="w-80 h-4 bg-zinc-200 rounded-md mb-2"></div>
        <div className="w-64 h-4 bg-zinc-200 rounded-md mb-2"></div>
        <div className="w-full h-4 bg-zinc-200 rounded-md mb-2"></div>
      </div>
    </div>
  );
};

export default SkeletonAlcoholDetail;
