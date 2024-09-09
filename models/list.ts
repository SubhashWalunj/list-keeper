type List = {
  fulfilled: boolean;
  createdAt: string;
  updatedAt: string;
  lastUpdateBy: string;
  items: Item[];
};

export type ListTypes = "CURRENT" | "NEXT";

export default List;
