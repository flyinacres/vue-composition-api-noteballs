<template>
    <div class="notes">

        <AddEditNote 
            ref="addEditNoteRef"
            placeHOlder="Add a new note"
            v-model="newNote">
            <template #buttons>
                <button 
                    @click="addNote"
                    :disabled="!newNote"
                    class="button is-link has-background-success">
                    Add New Note
                </button>            
            </template>
        </AddEditNote>

        <progress v-if="!storeNotes.notesLoaded" class="progress is-large is-success" max="100"/>

        <!-- Only show this if the progress bar is not showing -->
        <template
            v-else>         
            <Note 
                v-for="note in storeNotes.notes" 
                :key ="storeNotes.notes.id"
                :note="note"
            />
            <div v-if="!storeNotes.notes.length" 
                class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
            No notes here yet...
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'
import { useWatchCharacters } from '@/use/useWatchCharacters'

const newNote = ref('')
const addEditNoteRef = ref(null)

const storeNotes = useStoreNotes()

const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addEditNoteRef.value.focusTextArea()
}

useWatchCharacters(newNote, 100)

</script>