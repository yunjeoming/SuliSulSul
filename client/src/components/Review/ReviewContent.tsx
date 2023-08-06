import { FC, Fragment } from 'react';

type Props = {
  content?: string;
};

const ReviewContent: FC<Props> = ({ content }) => {
  if (!content) {
    return null;
  }

  const lines = content.split('\n');
  return (
    <div className="text-sm">
      {lines.map((line, index) => (
        <Fragment key={line + index}>
          {line}
          <br />
        </Fragment>
      ))}
    </div>
  );
};

export default ReviewContent;
