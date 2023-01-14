// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/js/firebase.js'



export const useStoreNotes = defineStore('storeNotes', {
state: () => {
    return { 
    notes: [
        // {
        // id: 'id1',
        // content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem ipsa commodi sint ut ullam culpa nulla molestiae sunt quia qui maxime.'
        // },
        // {
        // id: 'id2',
        // content: 'This is a shorter note! Woo!'
        // }
    ]
    }
},
actions: {
    async getNotes() {
        const querySnapshot = await getDocs(collection(db, 'notes'))
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let id = doc.id
            let content = doc.data().content
            let note = {
                    id,
                    content: content
                }
            this.notes.push(note)
        });
    },
    
    addNote(newNoteContent) {
        let currentDate = new Date().getTime(),
            id = currentDate.toString()

        let note = {
            id,
            content: newNoteContent
        }

        this.notes.unshift(note)
        },
        
    deleteNote(idToDelete) {
        this.notes = this.notes.filter(note => note.id !== idToDelete )
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