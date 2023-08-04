import SkeletonAlcoholItem from "./SkeletonAlcoholItem"
import SkeletonGrade from "./SkeletonGrade"
import SkeletonReviewItem from "./SkeletonReviewItem"

const SkeletonReviewList = () => {
  return (
    <div className="flex flex-col gap-8">
      <SkeletonAlcoholItem />
      <SkeletonGrade />
      <SkeletonReviewItem />
      <SkeletonReviewItem />
      <SkeletonReviewItem />
    </div>
  )
}

export default SkeletonReviewList