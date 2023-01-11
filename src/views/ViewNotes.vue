<template>
    <div class="notes">

        <div class="card has-background-success-dark p-4 mb-5">
            <div class="field">
                <div class="control">
                    <textarea 
                        class="textarea" 
                        placeholder="Add a new note"/>
                </div>
            </div>

            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button class="button is-link has-background-success">Add  New Note</button>
                </div>
            </div>
        </div>

        <div 
            v-for="i in 3" 
            class="card mb-4">
            <div class="card-content">
                <div class="content">
                Veniam mollit exercitation incididunt commodo consectetur officia enim exercitation nostrud cillum elit veniam et. Magna qui esse aute magna. Aliquip ullamco mollit tempor deserunt magna consectetur dolor do ut veniam cillum in qui consequat. Qui elit adipisicing exercitation eu tempor et ad culpa nostrud est. Sint cupidatat laboris velit do sit et minim incididunt laboris veniam. Eu sunt ullamco incididunt deserunt est dolore voluptate non ut voluptate.
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a>
            </footer>
        </div>
    </div>
</template>