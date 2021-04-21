import {firestoreDB} from '../../config/firebase';
import database from '@react-native-firebase/database';

export async function getReferenceFromFirebase(collection, doc) {
  const ref = await firestoreDB.collection(collection).doc(doc).get();
  const result = ref.data();
  if (result) {
    return result.data;
  } else {
    return false;
  }
}

export async function setReferenceFromFirebase(collection, doc, data) {
  const ref = firestoreDB.collection(collection).doc(doc);
  return ref
    .set({data}, {merge: true})
    .then(() => {
      return true;
    })
    .catch((error) => {
      return error;
    });
}
