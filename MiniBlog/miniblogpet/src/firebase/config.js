import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAlJWujDu16ak9TM8AvsKmYJY51296ZIGk',
  authDomain: 'blogfamiliapet.firebaseapp.com',
  projectId: 'blogfamiliapet',
  storageBucket: 'blogfamiliapet.appspot.com',
  messagingSenderId: '517632204322',
  appId: '1:517632204322:web:e5ad1cc67772f109ac347b',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }
