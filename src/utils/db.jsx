import firebase from "./firebase";

const firestore = firebase.firestore();

export const createUser = (uid, data) => {
    firestore
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                firestore
                    .collection("users")
                    .doc(uid)
                    .set({ userID: uid, ...data }, { merge: true });
            }
        });
};

export const createPoll = (uid, data) => {
    const doc = firestore.collection("polls").doc();
    firestore
        .collection("polls")
        .doc(doc.id)
        .set({ pollID: doc.id, ...data }, { merge: true });
    if (uid) {
        firestore
            .collection("users")
            .doc(uid)
            .update({
                pollsCreated: firebase.firestore.FieldValue.arrayUnion(doc.id),
            });
    }
};

export default firestore;
