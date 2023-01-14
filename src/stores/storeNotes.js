// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collection, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/js/firebase.js'

// The collection I will be using for all my firebase work
const notesCollectionRef = collection(db, 'notes')

export const useStoreNotes = defineStore('storeNotes', {
state: () => {
    return { 
    notes: []
    }
},
actions: {
    async getNotes() {
        const unsubscribe = onSnapshot(notesCollectionRef, (querySnapshot) => {
            let notes = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let id = doc.id
                let content = doc.data().content
                let note = {
                        id,
                        content: content
                    }
                notes.push(note)
            })
            this.notes = notes
});
    },
    
    async addNote(newNoteContent) {
        let currentDate = new Date().getTime(),
            id = currentDate.toString()

        let note = {
            id,
            content: newNoteContent
        }

        await setDoc(doc(notesCollectionRef, id), {
            content: newNoteContent
            })
    },
        
    async deleteNote(idToDelete) {
        await deleteDoc(doc(notesCollectionRef, idToDelete))
        //this.notes = this.notes.filter(note => note.id !== idToDelete )
    },

    updateNote(id, content) {
        let index = this.notes.findIndex(note => note.id === id )
        this.notes[index].content = content
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