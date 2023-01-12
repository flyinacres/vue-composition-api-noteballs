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

        <div 
            v-for="note in notes" 
            :key ="notes.id"
            class="card mb-4">
            <div class="card-content">
                <div class="content">
                    {{ note.content }}
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a>
            </footer>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const newNote = ref('')

// Even though I added the ref on the text component, I still have to add this ref or it
// cannot be accessed
const newNoteRef = ref(null)
const notes = ref([

]
)

const addNote = () => {

    let currentDate = new Date().getTime()
    let id = currentDate.toString()

    let note = {
        id: id,
        content: newNote.value
    }

    notes.value.unshift(note)
    newNote.value = ''
    newNoteRef.value.focus()
}


</script>