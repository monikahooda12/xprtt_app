import { firebase } from '@react-native-firebase/database';

export const getFirebaseRef = (reference) => {
    return firebase
        .app()
        .database('https://jmbfx-751c8-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref(reference);
}
