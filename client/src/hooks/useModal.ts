import { useCallback, useState } from 'react';

const initModalState = {
  content: '',
  isOpenModal: false,
  showOneBtn: true,
  isAdded: false,
  targetRef: null,
};

const useModal = () => {
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

  const updateInitModalState = useCallback(() => {
    setModal(initModalState);
  }, []);

  return { initModalState, modal, setModal, onCloseModal, updateInitModalState };
};

export default useModal;
