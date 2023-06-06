import React, { FC, useEffect, useState } from 'react';
import { Category } from '../types/alcohol';
import { CategoryUtils } from '../utils/Category';
import { useNavigate } from 'react-router-dom';

type Props = {
  onClose?: () => void;
};

const CategorySidebar: FC<Props> = ({ onClose }) => {
  const [category, setCategory] = useState<Category[]>([{ cateNo: 999, cateNm: 'all' }]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const categoryData = await CategoryUtils.getCategory();
      categoryData && setCategory((state) => [...state, ...categoryData]);
    })();
  }, []);

  const handleClick = (category: Category) => {
    navigate(`/c/${category.cateNm}`, { state: category });
    onClose && onClose();
  };

  return (
    <ul className="text-center">
      {category.map((c) => (
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
