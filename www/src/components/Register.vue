<template>
    <v-container>
        <v-card class="secondary">
            <v-card-text>
                <form @submit.prevent="register()">
                    <v-container>
                        <v-row>
                            <v-col xs5 offset-xs1>
                                <v-text-field v-model="firstName" label="Frist Name" dark required></v-text-field>
                            </v-col>
                            <v-col xs5>
                                <v-text-field v-model="lastName" label="Last Name" dark required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col xs8 offset-xs2>
                                <v-text-field v-model="userName" label="User Name" dark required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col xs8 offset-xs2>
                                <v-text-field v-model="email" label="Email" dark required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>>
                            <v-col xs8 offset-xs2>
                                <v-text-field v-model="password" label="Enter your password" hint="At least 8 characters" min="8" append-icon="remove_red_eye"
                                    counter type="password" dark required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col xs8 offset-xs2>
                                <v-text-field v-model="checkPassword" label="Enter your password" hint="At least 8 characters" min="8" append-icon="remove_red_eye"
                                    counter v-bind:rules="[pwcheck()]" type="password" dark required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col xs8 offset-xs2>
                                <v-btn type="submit" flat dark class="btn--dark-flat-focused">Register</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </form>
            </v-card-text>
        </v-card>
        <v-snackbar :timeout="timeout" :top="'top'" :right="'right'" :left="'left'" v-model="snackbar">
            {{regMsg}}
        </v-snackbar>
        <v-snackbar :timeout="timeout" :top="'top'" :right="'right'" :left="'left'" v-model="registerToast">
            {{registerMsg}}
        </v-snackbar>
    </v-container>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                top: true,
                right: true,
                regMsg: '',
                test: 'Hello',
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
                checkPassword: '',
                snackbar: false,
            }
        },
        computed:{
            registerToast(){
                return this.$root.store.state.registerToast
            },
            registerMsg(){
                return this.$root.store.state.registerMsg
            },
            timeout(){
                return this.$root.store.state.timeout
            }
        },
        methods: {
            register() {
                if (this.password === this.checkPassword && this.password.length >= 8 && this.password.length <= 25) {
                    var body = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        userName: this.userName,
                        email: this.email,
                        password: this.password,
                        admin: true,
                        superUser: true
                    }
                    this.$root.store.actions.register(body)
                } else if (this.password != this.checkPassword) {
                    this.snackbar = true
                    this.regMsg = 'Your Passwords don\'t Match!'
                } else if (this.password.length < 8 || this.password.length > 25) {
                    this.snackbar = true
                    this.regMsg = 'Your password must be between 8 and 25 Characters!'
                }
            },
            pwcheck() {
                if (this.password === this.checkPassword) {
                    return true
                } else {
                    return 'Password\'s Don\'t Match!'
                }

            }
        },
    }

</script>

<style scoped>

</style>