import { ListKeys } from "@/constants/Query";
import List, { ListTypes } from "@/models/list";
import db from "@/utility/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

export async function addItem(listType: ListTypes, data: Item) {
  const querySnapshot = await getDocs(
    collection(db, listType === "CURRENT" ? "currentList" : "nextList")
  );
  let currentList: List | null = null;
  querySnapshot.forEach((doc) => {
    currentList = doc.data() as List;
  });

  return currentList;
}

const useItemAddMutation = (type: ListTypes) => {
  const queryClient = useQueryClient();
  const key = type === "CURRENT" ? ListKeys.currentList() : ListKeys.nextList();
  return useMutation({
    mutationFn: (data: Item) => addItem(type, data),
    // When mutate is called:
    onMutate: async (newItem) => {
      // Cancel any outgoing refetch
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: key });

      // Snapshot the previous value
      const previousList = queryClient.getQueryData(key);

      // Optimistically update to the new value
      queryClient.setQueryData(key, (old: List) => ({
        ...old,
        items: [...old.items, newItem],
      }));

      // Return a context object with the snapshot value
      return { previousList };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newReport, context) => {
      queryClient.setQueryData(key, context?.previousList);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

export default useItemAddMutation;
