// stores/counter.js
import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth'

export const useStoreAuth = defineStore('storeAuth', {
state: () => {
    return {
        user: {}
    }
},
actions: {
    init() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user.id = user.uid
                this.user.email = user.email
                console.log('user logged in ' + user)
            } else {
                console.log('user logged out ' + user)
            }
        });
    },
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
            
        }).catch((error) => {
            console.log('logout error ' + error.message)
        })
    }
},

})