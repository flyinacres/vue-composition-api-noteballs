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
                    class="button is-link is-light">
                    Cancel
                </button> 
                <button 
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
import {useStoreNotes} from '@/stores/storeNotes'
import {storeToRefs} from 'pinia'

const storeNotes = useStoreNotes()
const noteContent = ref('')

const {getNoteContent} = storeToRefs(storeNotes)
noteContent.value = getNoteContent.value




</script>