import { ListKeys } from "@/constants/Query";
import List, { ListTypes } from "@/models/list";
import db from "@/utility/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { produce } from "immer";

const initList = (item: Item): List => ({
  createdAt: Date.now(),
  fulfilled: false,
  lastUpdateBy: "Unknown",
  updatedAt: Date.now(),
  items: [item],
});

async function addItem(listType: ListTypes, data: Item) {
  const document = listType === "CURRENT" ? "current" : "next";

  // Atomically add a new region to the "regions" array field.
  await updateDoc(doc(db, "Lists", document), {
    items: arrayUnion(data),
  });
}

function setList(listType: ListTypes, data: List) {
  console.log("setList", data);
  const document = listType === "CURRENT" ? "current" : "next";
  return setDoc(doc(db, "Lists", "current"), data);
  // return new Promise(() => {});
}

const useItemAddMutation = (type: ListTypes) => {
  const queryClient = useQueryClient();
  const key = type === "CURRENT" ? ListKeys.currentList() : ListKeys.nextList();
  let isInitList = false;
  return useMutation({
    mutationFn: (item: Item) => {
      console.log("mutationFn", item);
      let listData: List | undefined = queryClient.getQueryData(key);
      if (isInitList) {
        listData = initList(item);
        return setList(type, listData);
      } else {
        return addItem(type, item);
      }
    },
    // When mutate is called:
    onMutate: async (newItem) => {
      console.log("onMutate", newItem);
      // Cancel any outgoing refetch
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: key });

      // Snapshot the previous value
      const previousList = queryClient.getQueryData(key);

      if (!previousList) {
        isInitList = true;
        const newList = initList(newItem);
        queryClient.setQueryData(key, newList);
      } else {
        // Optimistically update to the new value
        queryClient.setQueryData(key, (old: List) => ({
          ...old,
          items: [...old.items, newItem],
        }));
      }

      // Return a context object with the snapshot value
      return { previousList };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newReport, context) => {
      console.log("onError", err);
      queryClient.setQueryData(key, context?.previousList);
    },
    // Always refetch after error or success:
    onSettled: () => {
      console.log("onSettled");
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

export default useItemAddMutation;
