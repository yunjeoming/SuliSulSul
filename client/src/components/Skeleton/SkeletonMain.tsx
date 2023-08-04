import SkeletonTitle from './SkeletonTitle';

const SkeletonMain = () => {
  return (
    <div className='flex flex-col gap-8'>
      <OneSection />
      <OneSection />
      <OneSection />
    </div>
  );
};

const OneSection = () => {
  return (
    <div className='flex flex-col gap-2'>
      <SkeletonTitle />
      <div className="flex gap-2">
        <div className="w-28 h-28 bg-zinc-200 rounded-md m-2"></div>
        <div className="w-28 h-28 bg-zinc-200 rounded-md m-2"></div>
        <div className="w-28 h-28 bg-zinc-200 rounded-md m-2"></div>
      </div>
    </div>
  );
};

export default SkeletonMain;
