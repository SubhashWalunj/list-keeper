import { ListKeys } from "@/constants/Query";
import Item from "@/models/item";
import List from "@/models/list";
import { setList, updateItemsToFirebase } from "@/utility/firebase";
import {
  filterUniqueItemsByName,
  initList,
  removeItem,
  sortItems,
} from "@/utility/list";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useItemMoveToNextMutation = () => {
  const queryClient = useQueryClient();
  const nextList: List = queryClient.getQueryData(ListKeys.nextList())!;
  return useMutation({
    mutationFn: async (item: Item) => {
      item.purchased = false;
      const currentList: List = queryClient.getQueryData(
        ListKeys.currentList()
      )!;
      await updateItemsToFirebase(currentList.items, "current");

      const listData: List | undefined = queryClient.getQueryData(
        ListKeys.nextList()
      );
      if (!nextList && listData) {
        return setList("next", listData);
      } else {
        return updateItemsToFirebase(listData!.items, "next");
      }
    },
    // When mutate is called:
    onMutate: async (item) => {
      item.purchased = false;
      // Cancel any outgoing refetch
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ListKeys.currentList() });
      await queryClient.cancelQueries({ queryKey: ListKeys.nextList() });

      // Snapshot the currentList
      const currentList: List = queryClient.getQueryData(
        ListKeys.currentList()
      )!;

      // Get items in updated state
      const itemsToUpdate = removeItem(currentList.items, item);

      // Optimistically update to the new value
      queryClient.setQueryData(ListKeys.currentList(), (old: List) => ({
        ...old,
        items: itemsToUpdate,
      }));

      const nextList: List = queryClient.getQueryData(ListKeys.nextList())!;

      if (!nextList) {
        const newList = initList(item);
        queryClient.setQueryData(ListKeys.nextList(), newList);
      } else {
        // Optimistically update to the new value
        queryClient.setQueryData(ListKeys.nextList(), (old: List) => ({
          ...old,
          items: sortItems(filterUniqueItemsByName([item, ...old.items])),
        }));
      }

      // Return a context object with the snapshot value
      return { currentList, nextList };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, _, context) => {
      console.log("onError", err);
      queryClient.setQueryData(ListKeys.currentList(), context?.currentList);
      queryClient.setQueryData(ListKeys.nextList(), context?.nextList);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ListKeys.currentList() });
      queryClient.invalidateQueries({ queryKey: ListKeys.nextList() });
    },
  });
};

export default useItemMoveToNextMutation;
