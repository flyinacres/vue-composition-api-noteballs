<template>
    <div class="notes">

        <div class="card has-background-success-dark p-4 mb-5">
            <div class="field">
                <div class="control">
                    <textarea 
                        v-model="newNote"
                        class="textarea" 
                        ref="newNoteRef"
                        placeholder="Add a new note"/>
                </div>
            </div>

            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button 
                        @click="addNote"
                        :disabled="!newNote"
                        class="button is-link has-background-success">Add  New Note</button>
                </div>
            </div>
        </div>

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
import { useStoreNotes } from '@/stores/storeNotes'

const newNote = ref('')

// Even though I added the ref on the text component, I still have to add this ref or it
// cannot be accessed
const newNoteRef = ref(null)

const storeNotes = useStoreNotes()

const addNote = () => {
    storeNotes.addNote(newNote.value)
    
    newNote.value = ''
    newNoteRef.value.focus()
}

</script>