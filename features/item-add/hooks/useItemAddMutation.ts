import { ListKeys } from "@/constants/Query";
import Item from "@/models/item";
import List, { ListTypes } from "@/models/list";
import { setList, updateItemsToFirebase } from "@/utility/firebase";
import {
  filterUniqueItemsByName,
  initList,
  populateItem,
  sortItems,
} from "@/utility/list";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useItemAddMutation = (type: ListTypes) => {
  const queryClient = useQueryClient();
  const key = type === "current" ? ListKeys.currentList() : ListKeys.nextList();
  const list = queryClient.getQueryData(key);
  return useMutation({
    mutationFn: (_: Item) => {
      const listData: List | undefined = queryClient.getQueryData(key);
      if (!list && listData) {
        return setList(type, listData);
      } else {
        return updateItemsToFirebase(listData!.items, type);
      }
    },
    // When mutate is called:
    onMutate: async (newItem) => {
      // Cancel any outgoing refetch
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: key });

      // Snapshot the previous value
      const previousList = queryClient.getQueryData(key);

      if (!previousList) {
        const newList = initList(newItem);
        queryClient.setQueryData(key, newList);
      } else {
        // Optimistically update to the new value
        queryClient.setQueryData(key, (old: List) => ({
          ...old,
          items: sortItems(
            filterUniqueItemsByName([populateItem(newItem), ...old.items])
          ),
        }));
      }

      // Return a context object with the snapshot value
      return { previousList };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, _, context) => {
      console.log("onError", err);
      queryClient.setQueryData(key, context?.previousList);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

export default useItemAddMutation;
