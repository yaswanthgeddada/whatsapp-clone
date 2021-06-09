import { storage } from "./firebase";

export const addImageToStorageBucket = async (
  image,
  setIsLoading,
  setProgressValue,
  setImageUrl,
  path,
  updatePic
) => {
  const imageName = Date.now() + image.name;
  setIsLoading(true);

  const uploadTask = storage.ref(`${path}/${imageName}`).put(image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // console.log(snapshot.bytesTransferred);
      setProgressValue((snapshot.bytesTransferred / image.size) * 100);
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref(path)
        .child(imageName)
        .getDownloadURL()
        .then((url) => {
          // console.log(url);
          setImageUrl(url);
          setIsLoading(false);
          updatePic(url);
        });
    }
  );
};
