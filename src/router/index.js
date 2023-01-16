import { createRouter, createWebHashHistory } from 'vue-router'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'
import { useStoreAuth } from '@/stores/storeAuth'

const routes = [
    { 
        path: '/',
        name: 'notes',
        component: ViewNotes
    },
    { 
        path: '/editNote/:id',
        name: 'edit-notes',
        component: ViewEditNote
    },
    { 
        path: '/stats',
        name: 'stats',
        component: ViewStats
    },
    { 
        path: '/auth',
        name: 'auth',
        component: ViewAuth
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    const storeAuth = useStoreAuth()

    // stop logged out user from going anywhere
    if (
        // make sure the user is authenticated
        !storeAuth.user.id &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'auth'
    ) {
        // redirect the user to the login page
        return { name: 'auth' }
    }

    // stop logged in user from going to auth--not really a good idea
    if (storeAuth.user.id && to.name === 'auth') {
        return false
    }
})

export default router