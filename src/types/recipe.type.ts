export interface Recipe {
    _id: string;
    title: string;
    ingredients: string[];
    steps: string;
    image: string;
    preparationTime: number;
    rating: number;
    ratingCount: number;
    createdBy: string;
    createdAt: string;
  }
  