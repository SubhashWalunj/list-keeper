import Item from "./item";

type List = {
  fulfilled: boolean;
  createdAt: number;
  updatedAt: number;
  lastUpdateBy: string;
  items: Item[];
};

export type ListTypes = "CURRENT" | "NEXT";

export default List;
