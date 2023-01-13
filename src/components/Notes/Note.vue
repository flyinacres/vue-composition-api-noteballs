<template>

    <div 
        class="card mb-4">
        <div class="card-content">
            <div class="content">
                {{ note.content }}
                
                <div class="has-text-right has-text-grey-light mt-2">
                    <small>{{ characterLength }}</small>
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <RouterLink 
                href="#" 
                :to="`/editNote/${note.id}`"
                class="card-footer-item">
                Edit
            </RouterLink>
            <a 
                @click.prevent="handleDeleteClicked(note.id)"
                href="#" 
                class="card-footer-item">
                Delete
            </a>
        </footer>
        <ModalDeleteNote 
            :noteId="note.id"
            v-model="modals.deleteNote"
            v-if="modals.deleteNote"/>
    </div>

</template>

<script setup>

import { reactive, computed } from 'vue'
import { useStoreNotes } from '@/stores/storeNotes'
import  ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'

const props = defineProps({
    note: {
        type: Object,
        required: true
        }
})

const storeNotes = useStoreNotes()

const characterLength = computed(() => {
    const len = props.note.content.length
    if ( len === 1) return len + ' character'
    return len + ' characters'
})

const handleDeleteClicked = (idToDelete) => {
    modals.deleteNote = true
}

const modals = reactive({
    deleteNote: false
})
</script>