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
