<template>
    <div class="card has-background-success-dark p-4 mb-5">
        <div class="field">
            <div class="control">
                <textarea 
                    :value="props.modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"
                    class="textarea" 
                    ref="textAreaRef"
                    placeholder="Add a new note"/>
            </div>
        </div>

        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <slot name="buttons"/>

            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const textAreaRef = ref(null)

const focusTextArea = () => {
    textAreaRef.value.focus()
}

defineExpose({
    focusTextArea
})
</script>