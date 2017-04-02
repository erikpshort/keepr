<template>
    <v-container>
        <br>
        <br>
        <h3>{{test}}</h3>
        <br>
        <br>
        <br>
        <br>

        <v-card class="secondary bigger">
            <v-card-text>
                <form @submit.prevent="logIn()">
                    <v-container>
                        <v-row>
                            <v-col xs8 offset-xs2>
                                <v-text-field v-model="name" label="User Name / Email" dark></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col xs8 offset-xs2>
                                <v-text-field v-model="password" type="password" label="Password" dark></v-text-field>
                            </v-col>
                            <v-col xs8 offset-xs2>
                                <v-btn type="submit" flat dark class="btn--dark-flat-focused">Log In</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </form>
            </v-card-text>
        </v-card>
        <v-snackbar :timeout="timeout" :top="'top'" :right="'right'" v-model="registerToast">
            {{ registerMsg }}
        </v-snackbar>
    </v-container>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                test: 'Glad to see you again!',
                name: '',
                password: '',
                timeout: 3000,
            }
        },
        computed:{
            registerToast(){
                return this.$root.store.state.registerToast
            },
            registerMsg(){
                return this.$root.store.state.registerMsg
            }
        },
        methods: {
            logIn() {
                this.$root.store.state.registerToast = false
                if (this.name.includes('@') && this.name.includes('.com')) {
                    var body = {
                        email: this.name,
                        password: this.password
                    }
                    this.$root.store.actions.logIn(body)
                } else {
                    var body = {
                        userName: this.name,
                        password: this.password
                    }
                    this.$root.store.actions.logIn(body)
                }
            }
        }
    }

</script>

<style scoped>

</style>