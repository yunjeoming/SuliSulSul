import axios from 'axios';
import { Category } from '../types/alcohol';

export class CategoryUtils {
  private static category: Category[] | undefined;

  static async getCategory() {
    if (!this.category) {
      const category = await this.loadCategory();
      category && this.setCategory(category);
    }
    return this.category;
  }

  private static async loadCategory() {
    return axios
      .get('/selectCateList')
      .then((res) => {
        return res.data as Category[];
      })
      .catch((err) => console.error(err));
  }

  private static setCategory(category: Category[]) {
    this.category = category;
  }
}
