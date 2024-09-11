import { ListKeys } from "@/constants/Query";
import List from "@/models/list";
import db from "@/utility/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

async function fetchCurrentList(): Promise<List | null> {
  try {
    const querySnapshot = await getDoc(doc(db, "Lists", "current"));
    const currentList = querySnapshot.data() as List;
    if (currentList.items) {
      return currentList;
    }
    return null;
  } catch (e) {
    console.log("error", e);
  }
  return null;

  /* return {
    createdAt: new Date().toDateString(),
    fulfilled: true,
    items: [
      {
        createdAt: new Date().toDateString(),
        createdBy: "abc",
        lastUpdatedBy: "xyz",
        moved: false,
        name: "Sugar",
        purchased: false,
        quantity: 1,
        removed: false,
        unit: "abc",
        updatedAt: new Date().toDateString(),
      },
      {
        createdAt: new Date().toDateString(),
        createdBy: "abc",
        lastUpdatedBy: "xyz",
        moved: false,
        name: "Coffee",
        purchased: false,
        quantity: 1,
        removed: false,
        unit: "abc",
        updatedAt: new Date().toDateString(),
      },
    ],
    updatedAt: new Date().toDateString(),
    lastUpdateBy: "xyz",
  }; */
}

const useCurrentListData = () =>
  useQuery({
    queryKey: ListKeys.currentList(),
    queryFn: () => fetchCurrentList(),
  });

export default useCurrentListData;
