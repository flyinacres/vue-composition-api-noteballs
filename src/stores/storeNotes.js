// stores/counter.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreNotes = defineStore('storeNotes', () =>{

const notes = ref([])

function addNote(newNote) {

    let currentDate = new Date().getTime()
    let id = currentDate.toString()

    let note = {
        id: id,
        content: newNote
    }

    notes.value.unshift(note)
}

function deleteNote(idToDelete) {
    notes.value = notes.value.filter(
        note => {
            return note.id != idToDelete
        }
    )
}

return { notes, addNote, deleteNote }

})