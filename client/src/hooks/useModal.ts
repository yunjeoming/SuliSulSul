import { useCallback, useState } from 'react';

const useModal = () => {
  const initModalState = {
    content: '',
    isOpenModal: false,
    showOneBtn: true,
    isAdded: false,
    targetRef: null,
  };

  const [modal, setModal] = useState<{
    content: string;
    isOpenModal: boolean;
    showOneBtn: boolean;
    isAdded: boolean;
    targetRef: HTMLElement | null;
  }>(initModalState);

  const onCloseModal = useCallback(() => {
    setModal((state) => ({
      ...state,
      isOpenModal: false,
      showOneBtn: true,
      targetRef: null,
    }));

    if (modal.targetRef) {
      modal.targetRef.focus();
    }
  }, [modal.targetRef]);

  return { initModalState, modal, setModal, onCloseModal };
};

export default useModal;
