import React, { MouseEventHandler } from 'react';
import Modal from '.';
import { Styles } from '../../constants/Styles';

type Props = {
  content: string;
  onClose: () => void;
  onLeftFn: () => void;
  onRightFn: MouseEventHandler<HTMLButtonElement>;
  closeBtnName?: string;
  okBtnName?: string;
};

const TwoBtnsModal: React.FC<Props> = ({
  content = '',
  onClose,
  onLeftFn,
  onRightFn,
  closeBtnName = '취소',
  okBtnName = '확인',
}) => {
  return (
    <Modal onClose={onClose}>
      <div className="p-4">{content}</div>
      <div className="flex">
        <button type="button" className={`${Styles.BUTTON_DEFAULT} mr-2`} onClick={onLeftFn}>
          {closeBtnName}
        </button>
        <button type="submit" className={`${Styles.BUTTON_DEFAULT}`} onClick={onRightFn}>
          {okBtnName}
        </button>
      </div>
    </Modal>
  );
};

export default TwoBtnsModal;
