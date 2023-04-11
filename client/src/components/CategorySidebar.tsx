import React, { useEffect, useState } from 'react';
import { Category } from '../types/alcohol';
import { CategoryUtils } from '../utils/Category';

const CategorySidebar = () => {
  const [category, setCategory] = useState<Category[]>([]);
  useEffect(() => {
    (async () => {
      const categoryData = await CategoryUtils.getCategory();
      categoryData && setCategory(categoryData);
    })();
  }, []);

  return (
    <div className="absolute w-full bg-slate-300 py-2 h-[calc(100vh-4rem)]">
      <ul className="text-center">
        {category.map((c) => (
          <li key={c.id + c.name} className="p-2 hover:bg-sky-700 hover:text-slate-200 hover:cursor-pointer">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
