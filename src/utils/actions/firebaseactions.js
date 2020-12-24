import firebase from '../../config/firebase';

export function getReferenceFromFirebase(reference) {
  const ref = firebase.database().ref(reference);
  return ref.once('value').then(function (snapshot) {
    return snapshot.val();
  });
}
