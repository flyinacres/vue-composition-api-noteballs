<template> 

    <nav 
        class="navbar is-success is-expanded" 
        role="navigation" 
        aria-label="main navigation">
        
        <div class="container is-max-desktop px-2">
            <div class="navbar-brand">
                
                <div class="navbar-item is-size-4 is-family-monospace">
                    Noteballs
                </div>

                <a 
                    @click.prevent="showMobileNav = !showMobileNav"
                    role="button" 
                    ref="navBarBurger"
                    class="navbar-burger" 
                    :class="{ 'is-active' : showMobileNav }"
                    aria-label="menu" 
                    aria-expanded="false" 
                    data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div 
                ref="navbarMenuRef"
                id="navbarBasicExample" 
                class="navbar-menu"
                :class="{ 'is-active' : showMobileNav }">
                <div class="navbar-end">
                    <RouterLink 
                        @click="showMobileNav = false"
                        to="/"
                        class="navbar-item"
                        active-class="is-active">
                        Notes
                    </RouterLink>

                    <RouterLink 
                        @click="showMobileNav = false"
                        to="/stats"
                        class="navbar-item"
                        active-class="is-active">
                        Stats
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>

</template>


<script setup>
import {ref} from 'vue'
import { onClickOutside } from '@vueuse/core'

// Need this to access the ref in the template. True for all the refs
const navbarMenuRef = ref(null)
const showMobileNav = ref(false)
const navBarBurger = ref(false)


onClickOutside(navbarMenuRef, 
    () => { showMobileNav.value = false },
    { 
        ignore: [navBarBurger]
    }
)

</script>

<style>
@media (max-width: 1023px) {
    .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
    }
}

</style>