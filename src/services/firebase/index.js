import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/storage';
import pickBy from 'lodash.pickby';
import negate from 'lodash.negate';
import isNil from 'lodash.isnil';

// Setup

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export default firebase;
export { app };
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const messaging = firebase.messaging();
export const storage = firebase.storage();

messaging.usePublicVapidKey(process.env.REACT_APP_FIREBASE_VAPID_KEY);


// Helpers

/**
 * @function getDocument
 * @param  {FirebaseFirestore.DocumentReference} ref
 * @param  {?Object} fallback
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export async function getDocument(ref, fallback) {
  let snapshot = await ref.get();

  if (!snapshot.exists) {
    if (fallback) {
      await ref.set(fallback);
      snapshot = await ref.get();
    } else {
      snapshot = null;
    }
  }

  return { id: snapshot.id, ...(snapshot ? snapshot.data() : {}) };
}

/**
 * @function push
 * @param  {FirebaseFirestore.CollectionReference} collectionRef
 * @param  {Object<any>} data
 * @return {Promise<FirebaseFirestore.DocumentReference}
 */
export async function push(collectionRef, data) {
  return collectionRef.add(pickBy(data, negate(isNil)));
}

/**
 * @function set
 * @param  {FirebaseFirestore.DocumentReference} documentRef
 * @param  {Object<any>} data
 * @return {Promise<FirebaseFirestore.DocumentReference>}
 */
export async function set(documentRef, data) {
  return documentRef.set(pickBy(data, negate(isNil)));
}

/**
 * @function remove
 * @param  {FirebaseFirestore.DocumentReference} documentRef
 * @return {Promise<void>}
 */
export async function remove(documentRef) {
  return documentRef.remove();
}

/**
 * @function update
 * @param  {FirebaseFirestore.DocumentReference} doc
 * @param  {any} data
 * @param  {?Boolean} create
 * @return {Promise<FirebaseFirestore.DocumentReference>}
 */
export async function update(doc, data, create = false) {
  if (!create) {
    return doc.update(pickBy(data, negate(isNil)));
  }

  const snapshot = await doc.get();

  if (snapshot.exists) {
    return doc.update(pickBy(data, negate(isNil)));
  }

  return doc.set(pickBy(data, negate(isNil)));
}

/**
 * @function exists
 * @param  {FirebaseFirestore.DocumentReference} ref
 * @return {Promise<Boolean>}
 */
export async function exists(ref) {
  const snapshot = await ref.get();

  return snapshot.exists;
}

/**
 * @function hasEntries
 * @param  {FirebaseFirestore.CollectionReference} ref
 * @return {Promise<Boolean>}
 */
export async function hasEntries(ref) {
  const querySnapshot = await ref.get();

  return !querySnapshot.empty;
}

/**
 * @function hasEntries
 * @param  {FirebaseFirestore.CollectionReference} ref
 * @return {Promise<Array<any>>}
 */
export async function getEntries(ref) {
  const querySnapshot = await ref.get();

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/**
 * @function subscribeToDoc
 * @param  {FirebaseFirestore.DocumentReference} doc
 * @param  {Function} handler
 * @return {Function} unsubscribe
 */
export async function subscribeToDoc(doc, handler) {
  return doc.onSnapshot((value) => handler({
    id: value.id,
    ...value.data(),
  }));
}

/**
 * @function subscribeToCollection
 * @param  {FirebaseFirestore.CollectionReference} ref
 * @param  {Function} handler
 * @return {Function} unsubscribe
 */
export async function subscribeToCollection(ref, handler) {
  return ref.onSnapshot((snapshot) => handler(
    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  ));
}

/**
 * @function count
 * @param  {FirebaseFirestore.CollectionReference} ref
 * @return {Promise<Number>}
 */
export async function count(ref) {
  const querySnapshot = await ref.get();

  return querySnapshot.docs.length;
}
