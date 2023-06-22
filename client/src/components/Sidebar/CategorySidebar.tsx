import React, { FC } from 'react';
import { Category } from '../../types/alcohol';
import { useNavigate } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';

type Props = {
  onClose?: () => void;
};

const CategorySidebar: FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const category = useCategory();

  const handleClick = (category: Category) => {
    navigate(`/c/${category.cateNm}`, { state: category });
    onClose && onClose();
  };

  return (
    <ul className="text-center">
      {category?.map((c) => (
        <li
          key={c.cateNo + c.cateNm}
          className="p-2 hover:bg-sky-700 hover:text-slate-200 hover:cursor-pointer"
          onClick={() => handleClick(c)}
        >
          {c.cateNm}
        </li>
      ))}
    </ul>
  );
};

export default CategorySidebar;
