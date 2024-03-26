import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

import { firebaseConfig } from "../config/firebase.ts";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (file: File) => {
  const storageRef = ref(storage, `images/${file.name}`);
  const imagesRef = ref(storage, "images/");
  await uploadBytes(storageRef, file);

  const images = await listAll(imagesRef);

  const image = images.items.filter((imageRef) => {
    if (imageRef.name === file.name) {
      return imageRef;
    }
  })[0];

  const imageUrl = await getDownloadURL(image);

  return imageUrl;
};

export { storage, uploadImage };
