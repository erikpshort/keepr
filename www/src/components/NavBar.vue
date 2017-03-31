<template>
    <v-toolbar class="orange accent-4 ">
        <v-toolbar-items>
            <v-toolbar-item v-show="!authenticated">
                <a  class="white--text zzz" @click="login()">Login</a>
            </v-toolbar-item>
            <v-toolbar-item v-show="!authenticated">
                <a  class="white--text zzz" @click="register()">Register</a>
            </v-toolbar-item>
            <v-toolbar-item v-show="authenticated">
                <a class="white--text zzz" @click="logout()">Logout</a>
            </v-toolbar-item>
        </v-toolbar-items>
        <v-toolbar-title>
            <img width="50px" height="50px" src="../assets/logo.jpg" @click="goHome()">
        </v-toolbar-title>
        <v-toolbar-items>
            <v-toolbar-item>
                <a @click="showAddCardModal=!showAddCardModal" class="white--text zzz">
                    Add a Card
                    </a>
            </v-toolbar-item>
            <v-toolbar-item>
                <a @click="showAddDeckModal=!showAddDeckModal" class="white--text zzz">
                    Add a Deck
                    </a>
            </v-toolbar-item>
            <v-toolbar-item>
                <h4 v-show="authenticated" @click="goDashboard()" class="white--text zzz">
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
    }
</style>