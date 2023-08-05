import { FC, Fragment } from 'react';
import Modal from '.';

type Props = {
  isOpen: boolean;
  content: string;
  onClose: () => void;
};

const OneBtnModal: FC<Props> = ({ isOpen, content = '', onClose }) => {
  const lines = content.split('\n');
  return isOpen ? (
    <Modal onClose={onClose}>
      <div className="p-6">
        {lines.map((line, index) => (
          <Fragment key={line + index}>
            {line}
            <br />
          </Fragment>
        ))}
      </div>
      <button className="w-full border-t p-2 hover:bg-gray-200" onClick={onClose}>
        확인
      </button>
    </Modal>
  ) : null;
};

export default OneBtnModal;
