import Item from "@/models/item";
import List from "@/models/list";
import { produce } from "immer";

export function populateItem(item: Item): Item {
  return {
    ...item,
    createdAt: Date.now(),
    createdBy: "Unknown", // TODO: Populate with user data
    lastUpdatedBy: "Unknown",
    removed: false,
    updatedAt: Date.now(),
    purchased: false,
  };
}

export function initList(item?: Item): List {
  return {
    createdAt: Date.now(),
    fulfilled: false,
    lastUpdateBy: "Unknown",
    updatedAt: Date.now(),
    items: item ? [populateItem(item)] : [],
  };
}

export function updatedItems(items: Item[], item: Item) {
  return produce(items, (draft) => {
    const index = draft.findIndex((i) => i.name === item.name);
    draft[index] = item;
  });
}

export function removeItem(items: Item[], item: Item) {
  return produce(items, (draft) => {
    const index = draft.findIndex((i) => i.name === item.name);
    if (index !== -1) {
      draft.splice(index, 1);
    }
  });
}

export function filterUniqueItemsByName(items: Item[]): Item[] {
  const seen = new Set();
  return items.filter((item) => {
    const duplicate = seen.has(item.name);
    seen.add(item.name);
    return !duplicate;
  });
}

export const sortItems = (items: Item[]) =>
  items.sort((a, b) => {
    // Sort purchased: false on top
    if (a.purchased !== b.purchased) {
      return a.purchased ? 1 : -1;
    }
    // If both are either purchased: true or purchased: false, sort by name
    return a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
