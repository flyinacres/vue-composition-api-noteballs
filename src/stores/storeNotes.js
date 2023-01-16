// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collection, onSnapshot, 
    addDoc, doc, deleteDoc, updateDoc, 
    query, orderBy  } from 'firebase/firestore'
import { db } from '@/js/firebase.js'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef
let notesCollectionQuery

export const useStoreNotes = defineStore('storeNotes', {
state: () => {
    return { 
    notes: [],
    notesLoaded: false
    }
},
actions: {
    init() {
        const storeAuth = useStoreAuth()

        notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
        notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
        this.getNotes()
    },

    async getNotes() {
        this.notesLoaded = false
        const unsubscribe = onSnapshot(notesCollectionQuery, (querySnapshot) => {
            let notes = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let date = doc.data().date
                let id = doc.id
                let content = doc.data().content
                let note = {
                        id,
                        date,
                        content: content
                    }
                notes.push(note)
            })
            
            this.notes = notes
            this.notesLoaded = true
        })
        
    },
    
    async addNote(newNoteContent) {
        let currentDate = new Date().getTime(),
            dateString = currentDate.toString()

        const docRef = await addDoc(notesCollectionRef, {
            date: dateString,
            content: newNoteContent
            })
    },
        
    async deleteNote(idToDelete) {
        await deleteDoc(doc(notesCollectionRef, idToDelete))
    },

    async updateNote(id, content) {
        //let index = this.notes.findIndex(note => note.id === id )
        await updateDoc(doc(notesCollectionRef, id), {
            content: content
            })
    }
},
getters: {
    getNoteContent: (state) => {
        return (id) => {
            return state.notes.filter(note => note.id === id )[0].content
        }
    },

    totalNotesCount: (state) => {
        return state.notes.length
    },

    totalCharactersCount: (state) => {
        let count = 0
        state.notes.forEach(note => {
            count += note.content.length
        })
    return count
    }
}
})