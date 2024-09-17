import { ListKeys } from "@/constants/Query";
import List from "@/models/list";
import { addToArchive, updateItemsToFirebase } from "@/utility/firebase";
import { filterUniqueItemsByName, initList } from "@/utility/list";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useListMarkAsDone = () => {
  const queryClient = useQueryClient();
  let currentList: List = queryClient.getQueryData(ListKeys.currentList())!;

  return useMutation({
    mutationFn: async () => {
      currentList.fulfilled = true;
      currentList.updatedAt = Date.now();
      await addToArchive(currentList);
      const latestCurrentListItems = queryClient.getQueryData<List>(
        ListKeys.currentList()
      )!.items;
      await updateItemsToFirebase([], "next");
      return updateItemsToFirebase(latestCurrentListItems, "current");
    },
    // When mutate is called:
    onMutate: async () => {
      // Cancel any outgoing refetch
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ListKeys.currentList() });
      await queryClient.cancelQueries({ queryKey: ListKeys.nextList() });

      // Snapshot the previous value
      currentList = queryClient.getQueryData(ListKeys.currentList())!;

      // Get the next list
      const nextList = queryClient.getQueryData<List>(ListKeys.nextList());

      const nextListItems = nextList?.items || [];

      const newCurrentListItems = filterUniqueItemsByName([...nextListItems]);

      // update current list to next items plus non-purchased items
      queryClient.setQueryData(ListKeys.currentList(), (old: List) => ({
        ...old,
        items: newCurrentListItems,
      }));

      // Snapshot the previous value
      if (!nextList) {
        const newList = initList();
        queryClient.setQueryData(ListKeys.nextList(), newList);
      } else {
        // Optimistically update to the new value
        queryClient.setQueryData(ListKeys.nextList(), (old: List) => ({
          ...old,
          items: [],
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

export default useListMarkAsDone;
