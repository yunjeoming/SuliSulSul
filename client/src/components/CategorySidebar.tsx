import React, { useEffect, useState } from 'react';
import { Category } from '../types/alcohol';
import { CategoryUtils } from '../utils/Category';
import { useNavigate } from 'react-router-dom';

const CategorySidebar = ({ onClose }: { onClose?: () => void }) => {
  const [category, setCategory] = useState<Category[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const categoryData = await CategoryUtils.getCategory();
      categoryData && setCategory(categoryData);
    })();
  }, []);

  const handleClick = (categoryName: string) => {
    navigate(`/c/${categoryName}`);
    onClose && onClose();
  };

  return (
    <ul className="text-center">
      {category.map((c) => (
        <li
          key={c.id + c.name}
          className="p-2 hover:bg-sky-700 hover:text-slate-200 hover:cursor-pointer"
          onClick={() => handleClick(c.name)}
        >
          {c.name}
        </li>
      ))}
    </ul>
  );
};

export default CategorySidebar;
