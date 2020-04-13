import { fireDb } from '~/plugins/firebase.js'

function fireCollRef(collection) {
  return fireDb.collection(collection);
}

function fireDocRef(collection, doc) {
  return fireDb.collection(collection).doc(doc);
}

async function fireGet(collection, doc) {
  const snap = await fireDocRef(collection, doc).get();
  return snap.data();
}

async function fireSet(collection, doc, data) {
  await fireDocRef(collection, doc).set(data);
}

async function fireAdd(collection, data) {
  await fireCollRef(collection).add(data);
}

async function fireDelete(collection, doc) {
  fireDocRef(collection, doc).delete();
}

async function fireUpdate(collection, doc, data) {
  await fireDocRef(collection, doc).update(data);
}

export {
  fireGet,
  fireSet,
  fireAdd,
  fireCollRef,
  fireDocRef,
  fireDelete,
  fireUpdate
};
