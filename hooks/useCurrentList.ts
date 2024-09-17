import { ListKeys } from "@/constants/Query";
import List from "@/models/list";
import db from "@/utility/firebase";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

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
}

const useCurrentListData = () =>
  useQuery({
    queryKey: ListKeys.currentList(),
    queryFn: () => fetchCurrentList(),
  });

export default useCurrentListData;
