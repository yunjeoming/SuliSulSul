export type InfiniteScrollOptionsType = {
  isLoading: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isSuccess: boolean;
  isFetchingNextPage: boolean;
};

export type RefObjType = {
  alcoholNmRef: HTMLInputElement | null;
  categoryNmRef: HTMLSelectElement | null;
  volRef: HTMLInputElement | null;
  expRef: HTMLSelectElement | null;
  descriptionRef: HTMLTextAreaElement | null;
};

export type SidebarType = {
  category: boolean;
  search: boolean;
};

export type ModalType = 'password' | 'fail' | 'suc' | 'edit' | 'delete';

export type ModalStateType = {
  isOpen: boolean;
  content: string;
  type: ModalType | null;
};
