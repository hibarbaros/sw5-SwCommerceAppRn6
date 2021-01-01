import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCtLl645C2MnTB8aDTHhLQD7j6uFnSWU3w',
  authDomain: 'swapp-eec92.firebaseapp.com',
  databaseURL: 'https://swapp-eec92.firebaseio.com',
  projectId: 'swapp-eec92',
  storageBucket: 'swapp-eec92.appspot.com',
  messagingSenderId: '338477165318',
  appId: '1:338477165318:web:dd3d4c29613f4119c34c87',
  measurementId: 'G-SVY0W7SLQY',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics()

export default firebase;
