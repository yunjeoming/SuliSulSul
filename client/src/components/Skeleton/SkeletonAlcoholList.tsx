import SkeletonAlcoholItem from './SkeletonAlcoholItem';
import SkeletonTitle from './SkeletonTitle';

const SkeletonAlcoholList = () => {
  return (
    <div className='flex flex-col gap-4'>
      <SkeletonTitle />
      <SkeletonAlcoholItem />
      <SkeletonAlcoholItem />
      <SkeletonAlcoholItem />
      <SkeletonAlcoholItem />
      <SkeletonAlcoholItem />
    </div>
  );
};

export default SkeletonAlcoholList;
