import firebase from "firebase/app";

export default {
  actions: {
    // eslint-disable-next-line
    async login({dispatch, commit}, {email, password}) {
      try {
        commit('clearError');
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async register ({dispatch, commit}, {email, password, name}) {
      try {
        commit('clearError');
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    // eslint-disable-next-line
    async logout({dispatch, commit}) {
      try {
        await firebase.auth().signOut();
        commit('clearInfo');
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }
}