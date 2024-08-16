import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

export const isBiometricsAvailable = () => new Promise(async (resolve, reject) => {

    const rnBiometrics = new ReactNativeBiometrics()

    rnBiometrics.isSensorAvailable()
        .then((resultObject) => {
            const { available, biometryType } = resultObject
            if (available && biometryType === BiometryTypes.TouchID) {
                return resolve(true);
            } else if (available && biometryType === BiometryTypes.FaceID) {
                return resolve(true);
            } else if (available && biometryType === BiometryTypes.Biometrics) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        })
});

export const unlockPhone = () => new Promise(async (resolve, reject) => {

    const rnBiometrics = new ReactNativeBiometrics()

    rnBiometrics.isSensorAvailable()
        .then((resultObject) => {
            const { available, biometryType } = resultObject
            if (available && biometryType === BiometryTypes.TouchID) {
                const status = accessBiometrics();
                return resolve(status);
            } else if (available && biometryType === BiometryTypes.FaceID) {
                const status = accessBiometrics();
                return resolve(status);
            } else if (available && biometryType === BiometryTypes.Biometrics) {
                const status = accessBiometrics();
                return resolve(status);
            } else {
                return reject('Biometrics not available');
            }
        })
});

export const accessBiometrics = () => new Promise(async (resolve, reject) => {

    const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
        .then((resultObject) => {
            const { success } = resultObject

            if (success) {
                console.log('successful biometrics provided')
                return resolve(true);
            } else {
                console.log('user cancelled biometric prompt')
                return resolve(false);
            }
        })
        .catch((error) => {
            console.log('biometrics failed', error)
            return resolve(false);
        })
});