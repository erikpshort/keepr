<template>
    <v-toolbar class="orange accent-4 ">
        <v-toolbar-items>
            <v-toolbar-item v-show="!authenticated">
                <a  class=" zzz" @click="login()">Login</a>
            </v-toolbar-item>
            <v-toolbar-item v-show="!authenticated">
                <a  class=" zzz" @click="register()">Register</a>
            </v-toolbar-item>
            <v-toolbar-item v-show="authenticated">
                <a class=" zzz" @click="logout()">Logout</a>
            </v-toolbar-item>
        </v-toolbar-items>
        <v-toolbar-title>
            <img height="50px" src="../assets/decklogo.png" @click="goHome()">
        </v-toolbar-title>
        <v-toolbar-items>
            <v-toolbar-item>
                <a v-show="authenticated" @click="showAddCardModal=!showAddCardModal" class=" zzz">
                    Add a Card
                    </a>
            </v-toolbar-item>
            <v-toolbar-item>
                <a v-show="authenticated" @click="showAddDeckModal=!showAddDeckModal" class=" zzz">
                    Add a Deck
                    </a>
            </v-toolbar-item>
            <v-toolbar-item>
                <h4 v-show="authenticated" @click="goDashboard()" class=" zzz">
                    Hello, {{user.firstName}}
                </h4>
            </v-toolbar-item>
        </v-toolbar-items>
        <qModal v-if="showAddCardModal"></qModal>
        <dModal v-if="showAddDeckModal"></dModal>
    </v-toolbar>
</template>

<script>
    import qModal from './AddCard'
    import dModal from './AddDeck'
    export default {
        name: 'navBar',
        components: { qModal, dModal },
        data() {
            return {
                showAddCardModal: false,
                showAddDeckModal: false,
            }
        },
        mounted() {
            this.$root.store.actions.authenticate()
        },
        methods: {
            goHome() {
                this.$router.push('/mainpage')
            },
            goDashboard() {
                this.$router.push('/dashboard')
            },
            logout() {
                this.$root.store.actions.logout()
            },
            login() {
                this.$router.push('/login')
            },
            register(){
                this.$router.push('/register')
            }
        },
        computed: {
            authenticated() {
                return this.$root.store.state.authenticated
            },

            user() {
                return this.$root.store.state.user
            }
        }
    }

</script>

<style scoped>
    .zzz {
        display: fixed;
        justify-content: center;
        align-content: center;
        align-items: center;
        z-index: 9999;
        color: #183a56;
    }
</style>