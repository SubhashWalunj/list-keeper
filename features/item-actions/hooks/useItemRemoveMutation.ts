import { ListKeys } from "@/constants/Query";
import Item from "@/models/item";
import List, { ListTypes } from "@/models/list";
import { updateItemsToFirebase } from "@/utility/firebase";
import { removeItem } from "@/utility/list";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useItemRemoveMutation = (type: ListTypes) => {
  const queryClient = useQueryClient();
  const key = type === "current" ? ListKeys.currentList() : ListKeys.nextList();
  return useMutation({
    mutationFn: (item: Item) => {
      const list: List = queryClient.getQueryData(key)!;
      return updateItemsToFirebase(list.items, type);
    },
    // When mutate is called:
    onMutate: async (item) => {
      // Cancel any outgoing refetch
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: key });

      // Snapshot the previous value
      const previousList: List = queryClient.getQueryData(key)!;

      // Get items in updated state
      const itemsToUpdate = removeItem(previousList.items, item);

      // Optimistically update to the new value
      queryClient.setQueryData(key, (old: List) => ({
        ...old,
        items: itemsToUpdate,
      }));

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

export default useItemRemoveMutation;
