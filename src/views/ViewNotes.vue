<template>
    <div class="notes">

        <AddEditNote 
            ref="addEditNoteRef"
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

        <Note 
            v-for="note in storeNotes.notes" 
            :key ="storeNotes.notes.id"
            :note="note"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'


const newNote = ref('')
const addEditNoteRef = ref(null)

const storeNotes = useStoreNotes()

const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addEditNoteRef.value.focusTextArea()
}

</script>