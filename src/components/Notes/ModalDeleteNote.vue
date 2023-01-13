<template>
    <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
        <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button 
            @click="closeModal"
            class="delete" 
            aria-label="close">
        </button>
        </header>
        <section class="modal-card-body">
            Are you sure you want to delete this note? {{ noteId }}
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
            <button 
                @click="closeModal"
                class="button">
                Cancel
            </button>
            <button 
                class="button is-danger"
                @click="handleDelete(noteId)">
                Delete
            </button>
        </footer>
    </div>
    </div>
</template>


<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref, onMounted, onUnmounted} from 'vue'
import { useStoreNotes } from '@/stores/storeNotes'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    noteId: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const storeNotes = useStoreNotes()

const closeModal = () => {
    emit('update:modelValue', false)
}

const modalCardRef = ref(null)

onClickOutside(modalCardRef, closeModal)

const handleKeyboard = e => {
    if (e.key === 'Escape') {
        closeModal()
    }    
}

// Specifically need to call closeModal or I get weird behavior when deleting
// the top-most notes first.  The note deletes, but the delete modal for the next
// note immediately takes its place.
const handleDelete = (id) => {
    storeNotes.deleteNote(id)
    closeModal()
}

// Listen for the escape key
onMounted(() => {
    document.addEventListener('keyup', handleKeyboard)
})

// Remove the listener or it will be there forever
onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyboard)
})
</script>