import { ListKeys } from "@/constants/Query";
import List from "@/models/list";
import db from "@/utility/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

async function fetchCurrentList(): Promise<List | null> {
  const querySnapshot = await getDocs(collection(db, "currentList"));
  let currentList: List | null = null;
  querySnapshot.forEach((doc) => {
    currentList = doc.data() as List;
  });

  console.log(currentList);

  return {
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
  };
}

const useCurrentListData = () =>
  useQuery({
    queryKey: ListKeys.currentList(),
    queryFn: () => fetchCurrentList(),
  });

export default useCurrentListData;
