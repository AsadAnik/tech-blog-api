// Service for Category
import Category, { ICategory } from '../models/Category';

class CategoryService {
    /**
     * ---- Get Categories ----
     * @returns 
     */
    static async getCates(): Promise<ICategory[] | Boolean> {
        const cates = await Category.find().sort({createdAt: 1});
        if (!cates.length) return false;
        return cates;
    }

    /**
     * ---- Create Category ----
     * @param cateData 
     * @returns 
     */
    static async createCate(cateData: ICategory): Promise<ICategory | Boolean> {
        const cate = new Category(cateData);
        if (!cate) return false;
        await cate.save();
        return cate;
    }

     /**
     * ---- Update Category ----
     * @param id
     * @param cateData 
     * @returns 
     */
     static async updateCate(id: string, cateData: ICategory): Promise<ICategory | Boolean> {
        const updatedCate = await Category.findByIdAndUpdate(id, cateData, { new: true });
        if (!updatedCate) return false;
        return updatedCate;
    }

    /**
     * ---- Update Category ----
     * @param id
     * @param cateData 
     * @returns 
     */
    static async deleteCate(id: string): Promise<ICategory | Boolean> {
        const deletedCate = await Category.findByIdAndDelete(id);
        if (!deletedCate) return false;
        return deletedCate;
    }
}

export default CategoryService;
        