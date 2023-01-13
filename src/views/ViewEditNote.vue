<template>
    <div class="edit-note">
        <AddEditNote 
            v-model="noteContent"
            bgColor="link"
            placeHolder="Edit note"
            label="Edit Note"
            ref="addEditNoteRef">
            <template #buttons>
                <button 
                    @click="$router.back()"
                    class="button is-link is-light mr-2">
                    Cancel
                </button> 
                <button 
                    @click="handleSaveClicked"
                    :disabled="!noteContent"
                    class="button is-link has-background-link">
                    Save Note
                </button>            
            </template>
        </AddEditNote>    
    </div>
</template>

<script setup>
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import {ref} from 'vue'
import {useRoute, useRouter} from  'vue-router'
import {useStoreNotes} from '@/stores/storeNotes'
import {storeToRefs} from 'pinia'

const storeNotes = useStoreNotes()
const noteContent = ref('')
const route = useRoute()
const router = useRouter()

noteContent.value = storeNotes.getNoteContent(route.params.id)

const handleSaveClicked = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/')
}
</script>