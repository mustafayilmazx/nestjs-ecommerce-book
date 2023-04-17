export const fieldQbs = {
  title: (title: string) => {
    return title ? { title: { $regex: title, $options: 'i' } } : undefined;
  },
  authors: (authors: string) => {
    return authors ? { authors: { $regex: authors, $options: 'i' } } : undefined;
  },
  maxPrice: (maxPrice: number) => {
    return maxPrice ? { price: { $lte: maxPrice } } : undefined;
  },
  minPrice: (minPrice: number) => {
    return minPrice ? { price: { $gte: minPrice } } : undefined;
  },
  rating: (rating: number) => {
    return rating ? { average_rating: { $gte: rating } } : undefined;
  },
  maxPage: (maxPage: number) => {
    return maxPage ? { num_pages: { $lte: maxPage } } : undefined;
  },
  minPage: (minPage: number) => {
    return minPage ? { num_pages: { $gte: minPage } } : undefined;
  }
};
