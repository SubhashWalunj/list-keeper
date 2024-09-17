import { ListKeys } from "@/constants/Query";
import List from "@/models/list";
import db from "@/utility/firebase";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

async function fetchNextList(): Promise<List | null> {
  try {
    const querySnapshot = await getDoc(doc(db, "Lists", "next"));
    const nextList = querySnapshot.data() as List;
    if (nextList.items) {
      return nextList;
    }
    return null;
  } catch (e) {
    console.log("error", e);
  }
  return null;
}

const useNextListData = () =>
  useQuery({
    queryKey: ListKeys.nextList(),
    queryFn: () => fetchNextList(),
  });

export default useNextListData;
