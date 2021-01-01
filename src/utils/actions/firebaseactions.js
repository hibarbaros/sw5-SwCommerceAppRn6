import firebase from '../../config/firebase';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

export function getReferenceFromFirebase(reference) {
  const ref = firebase.database().ref(reference);
  return ref.once('value').then(function (snapshot) {
    return snapshot.val();
  });
}

export async function useGetToken(user) {
  await messaging()
    .getToken()
    .then((token) => {
      console.tron.error('test', token);
      return saveTokenToDatabase(token, user);
    });
}

async function saveTokenToDatabase(token, user) {
  const userId = user ? user : null;
  await database().ref('tokens').set({
    token: {
      token,
      userId,
    },
  });
}

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
    console.tron.error('Authorization status:', authStatus);
  }
};

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.tron.error('Your Firebase Token is:', fcmToken);
  } else {
    console.tron.error('Failed', 'No token received');
  }
};
