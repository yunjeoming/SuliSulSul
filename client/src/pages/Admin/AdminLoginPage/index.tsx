import { FormEvent, useCallback, useRef, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminLoginPage = () => {
  const { doLogIn } = useAuth();
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (!idRef.current || !passwordRef.current) return;

      const id = idRef.current.value;
      const password = passwordRef.current.value;

      if (id === process.env.REACT_APP_ADMIN_ID && password === process.env.REACT_APP_ADMIN_PASSWORD) {
        doLogIn();
      } else {
        idRef.current.focus();
        setIsError(true);
      }
    },
    [doLogIn],
  );

  return (
    <div className="flex flex-col gap-16 items-center h-full pt-44">
      <div className="text-center text-2xl">술이술술 관리자 페이지 🍺</div>
      <form className="w-full flex flex-col gap-4 px-12" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="inputId" className="text-stone-500 text-sm">
            ID
          </label>
          <input ref={idRef} id="id" type="text" className="rounded-lg py-2 pl-4 border" placeholder="ID" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="inputPassword" className="text-stone-500 text-sm">
            PASSWARD
          </label>
          <input
            ref={passwordRef}
            id="password"
            type="password"
            className="rounded-lg py-2 pl-4 border"
            placeholder="PASSWARD"
          />
        </div>
        {isError && <div className="text-sm text-red-500 pl-2">ID, PASSWORD를 확인해주세요</div>}
        <button
          type="submit"
          className="w-full mt-4 rounded-lg p-3 cursor-pointer bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-default"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
