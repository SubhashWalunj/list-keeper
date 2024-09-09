export const ListKeys = {
  all: ["lists"] as const,
  currentList: () => [...ListKeys.all, "current"] as const,
  nextList: () => [...ListKeys.all, "next"] as const,
};
