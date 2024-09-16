import { ListKeys } from "@/constants/Query";
import List, { ListTypes } from "@/models/list";
import db from "@/utility/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";

const populateItem = (item: Item): Item => ({
  ...item,
  createdAt: Date.now(),
  createdBy: "Unknown", // TODO: Populate with user data
  lastUpdatedBy: "Unknown",
  moved: false,
  removed: false,
  updatedAt: Date.now(),
  purchased: false,
});

const initList = (item: Item): List => ({
  createdAt: Date.now(),
  fulfilled: false,
  lastUpdateBy: "Unknown",
  updatedAt: Date.now(),
  items: [populateItem(item)],
});

async function addItem(listType: ListTypes, data: Item) {
  const document = listType === "CURRENT" ? "current" : "next";
  const populatedItem = populateItem(data);

  await updateDoc(doc(db, "Lists", document), {
    items: arrayUnion(populatedItem),
  });
}

function setList(listType: ListTypes, data: List) {
  console.log("setList", data);
  const document = listType === "CURRENT" ? "current" : "next";
  return setDoc(doc(db, "Lists", document), data);
  // return new Promise(() => {});
}

const useItemAddMutation = (type: ListTypes) => {
  const queryClient = useQueryClient();
  const key = type === "CURRENT" ? ListKeys.currentList() : ListKeys.nextList();
  const currentList = queryClient.getQueryData(key);
  return useMutation({
    mutationFn: (item: Item) => {
      console.log("mutationFn", item);
      let listData: List | undefined = queryClient.getQueryData(key);
      console.log("listData", listData);
      if (!currentList) {
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
    onError: (err, newItem, context) => {
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
