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

export const generateID = () => {
    return firestore.collection("polls").doc().id;
};

export const createPoll = (uid, docID, data) => {
    return firestore
        .collection("polls")
        .doc(docID)
        .set({ pollID: docID, ...data }, { merge: true })
        .then(() => {
            if (data.ipChecking) {
                firestore.collection("votes").doc(docID).set({
                    pollID: docID,
                    ipList: [],
                });
            }
            if (uid) {
                firestore
                    .collection("users")
                    .doc(uid)
                    .update({
                        pollsCreated:
                            firebase.firestore.FieldValue.arrayUnion(docID),
                    });
            }
        });
};

export const addVote = async (id, uid, option, ipChecking) => {
    const data = await getPoll(id).then((doc) => doc.data());
    const ip = data.ipChecking
        ? await fetch("https://api.ipify.org")
              .then((data) => data.text())
              .catch(null)
        : null;
    const localVotes = JSON.parse(localStorage.getItem("userVotes")) || [];
    let userVoted;
    if (uid) {
        userVoted = await firestore
            .collection("users")
            .doc(uid)
            .get()
            .then((doc) => doc.data())
            .then((data) => data?.pollsVoted.includes(id));
    }

    const addCount = async () => {
        const index = data.options.findIndex((item) => item.option === option);
        data.options[index].count += 1;
        return firestore
            .collection("polls")
            .doc(id)
            .set({ ...data }, { merge: true })
            .then(() => {
                if (uid) {
                    firestore
                        .collection("users")
                        .doc(uid)
                        .update({
                            pollsVoted:
                                firebase.firestore.FieldValue.arrayUnion(id),
                        });
                }
                if (data.ipChecking) {
                    firestore
                        .collection("votes")
                        .doc(id)
                        .update({
                            ipList: firebase.firestore.FieldValue.arrayUnion(
                                ip
                            ),
                        });
                }
                if (!localVotes.includes(id)) {
                    localVotes.push(id);
                    localStorage.setItem(
                        "userVotes",
                        JSON.stringify(localVotes)
                    );
                }
            });
    };
    const hasIPVoted = () => {
        return firestore
            .collection("votes")
            .where("pollID", "==", id)
            .where("ipList", "array-contains", ip)
            .get()
            .then((querySnapshot) => querySnapshot.empty);
    };

    if (uid && !userVoted) {
        addCount();
    } else if (!localVotes.includes(id) && !ip && !userVoted) {
        addCount();
    } else if (
        (await hasIPVoted()) &&
        !localVotes.includes(id) &&
        ip &&
        !userVoted
    ) {
        addCount();
    } else {
        console.error("You have already voted in this poll.");
        return {
            code: "already-voted",
            message: "You have already voted in this poll.",
        };
    }
    return { code: "success" };
};

export const getPoll = (id) => {
    return firestore.collection("polls").doc(id).get();
};

export const getUserPolls = (userID) => {
    if (userID) {
        return firestore
            .collection("polls")
            .where("authorID", "==", userID)
            .get()
            .then((querySnapshot) => {
                let userPolls = [];
                querySnapshot.forEach((doc) => userPolls.push(doc.data()));
                return userPolls.sort((a, b) =>
                    a.dateCreated.seconds <= b.dateCreated.seconds ? 1 : -1
                );
            });
    }
};

export const deletePoll = (uid, pollID) => {
    return firestore
        .collection("polls")
        .doc(pollID)
        .delete()
        .then(() => {
            firestore
                .collection("votes")
                .doc(pollID)
                .delete()
                .then(() => {
                    if (uid) {
                        firestore
                            .collection("users")
                            .doc(uid)
                            .update({
                                pollsCreated:
                                    firebase.firestore.FieldValue.arrayRemove(
                                        pollID
                                    ),
                                pollsVoted:
                                    firebase.firestore.FieldValue.arrayRemove(
                                        pollID
                                    ),
                            });
                    }
                });
        });
};

export default firestore;
