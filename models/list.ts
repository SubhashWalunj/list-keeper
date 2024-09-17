import Item from "./item";

type List = {
  fulfilled: boolean;
  createdAt: number;
  updatedAt: number;
  lastUpdateBy: string;
  items: Item[];
};

export type ListTypes = "current" | "next";

export default List;
