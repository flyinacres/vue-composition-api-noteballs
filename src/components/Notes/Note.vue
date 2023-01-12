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
            <a href="#" class="card-footer-item">Edit</a>
            <a 
                @click.prevent="handleDeleteClicked(note.id)"
                href="#" 
                class="card-footer-item">Delete</a>
        </footer>
    </div>

</template>

<script setup>

import {computed} from 'vue'
import { useStoreNotes } from '@/stores/storeNotes'

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
    storeNotes.deleteNote(idToDelete)
}


</script>