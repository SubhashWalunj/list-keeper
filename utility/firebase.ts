import Item from "@/models/item";
import List, { ListTypes } from "@/models/list";
import { initializeApp } from "firebase/app";
import {
  arrayUnion,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function updateItemsToFirebase(data: Item[], listType: ListTypes) {
  await updateDoc(doc(db, "Lists", listType), {
    items: data,
  });
}

export function setList(listType: ListTypes, data: List) {
  return setDoc(doc(db, "Lists", listType), data);
}

export async function addToArchive(list: List) {
  await updateDoc(doc(db, "Lists", "archived"), {
    lists: arrayUnion(list),
  });
}

export default db;
