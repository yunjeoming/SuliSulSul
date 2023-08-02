import { forwardRef } from 'react';

type Props = {
  isShow: boolean;
  checkPassword: () => void;
};

const ReviewPassword = forwardRef<HTMLInputElement, Props>(({ isShow, checkPassword }, ref) => {
  return isShow ? (
    <div className="flex items-center mt-4 text-sm">
      <input type="password" className="flex-grow p-2 mr-2" placeholder="비밀번호를 입력해주세요" ref={ref} />
      <button className="border px-4 py-2" onClick={checkPassword}>
        확인
      </button>
    </div>
  ) : null;
});

export default ReviewPassword;
