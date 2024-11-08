// TODO : NOT USE SEPERATE DATABASE LOGIC FOR BETTER DECOUPLED .
// WILL DO IN SECOND ITERATION.

import { Model } from "mongoose";

class DatabaseCrud {
  model: Model<any>;

  constructor(model: Model<any>) {
    this.model = model;
  }

  /**NOTE: Fetch all products with off-set pagination */
  async findAllDocument(
    page: number,
    limit: number
  ): Promise<any[]> {
    try {
      const data = await this.model
        .find()
        .limit(limit)
        .skip((page - 1) * limit);
      return data;
    } catch (error) {
      throw new Error("Failed to retrieve data from the database");
    }
  }

  /**NOTE: Get count of products */
  async countDocument(): Promise<number> {
    try {
      const count = await this.model.countDocuments();
      return count;
    } catch (error) {
      throw new Error("Failed to count  data from the database");
    }
  }

  /**NOTE: Single Product by ID*/
  async findSingleDocument(
    id: string
  ): Promise<any | object | null> {
    try {
      const data = await this.model.findOne({ _id: id });
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**NOTE: Create a product */
  async createDocument(
    requestData: any
  ): Promise<any | object> {
    const { title, price, description, category, image, rate, count } =
      requestData;
    try {
      const savedProduct = await this.model.create({
        title,
        price,
        description,
        category,
        image,
        rating: {
          rate,
          count,
        },
      });
      return savedProduct;
    } catch (error) {
      throw error;
    }
  }

  /**NOTE: Delete a recipe */
  async deleteDocument(id: string): Promise<boolean | string> {
    try {
      const productExist = await this.model.findById({ _id: id });
      if (productExist) {
        const data = await this.model.deleteOne({ _id: id });

        if (data.acknowledged) {
          return true;
        }
      }
      return false;
    } catch (error) {
      throw new Error("Failed to get data from the database");
    }
  }

  /**NOTE: Update a recipe */
  async updateDocument(
    id: string,
    updatedData: any
  ): Promise<any | object | null> {
    try {
      const result = await this.model.findOneAndUpdate(
        { _id: id },
        updatedData
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default DatabaseCrud;
