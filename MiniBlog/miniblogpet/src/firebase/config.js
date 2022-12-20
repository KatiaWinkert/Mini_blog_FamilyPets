import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAFwG4miQCqaK-7KDvnJ5U3PhutEvHXIug',
  authDomain: 'blog-familia-pet.firebaseapp.com',
  projectId: 'blog-family-pet',
  storageBucket: 'blog-familia-pet.appspot.com',
  messageSenderId: '   851141111628 ',
  appId: '1:851141111628:web:fdb37aec334dadead269e9',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }
