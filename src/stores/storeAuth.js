// stores/counter.js
import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword  } from 'firebase/auth'

export const useStoreAuth = defineStore('storeAuth', {
state: () => {

},
actions: {
    registerUser(credentials) {
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log("reg error " + error.message)
            })
    },
    loginUser(credentials) {
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log('login error' + error.message)
            })
    },
    logoutUser() {
        signOut(auth).then(() => {
            console.log('signed out')
        }).catch((error) => {
            console.log('logout error ' + error.message)
        })
    }
},

})