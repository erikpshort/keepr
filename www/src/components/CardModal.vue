<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper" @click="modalChecker(), wrapper=false">
                <div class="modal-container" @click="wrapper=true">
                    <v-card-row class="blue-grey darken-1">
                        <v-card-title>
                            <h2 class="white--text center">{{card.title}}</h2>
                            <v-spacer></v-spacer>
                            <v-menu id="space" bottom left origin="top right" transition="v-scale-transition">
                                <v-btn icon="icon" slot="activator" class="white--text">
                                    <v-icon>more_vert</v-icon>
                                </v-btn>
                                <v-list>
                                    <v-list-item v-for="deck in decks" :key="deck._id" @click="addCardToDeck(deck)">
                                        <v-list-tile>
                                            <v-list-tile-title>{{deck.title}}</v-list-tile-title>
                                        </v-list-tile>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-card-title>
                    </v-card-row>
                    <v-card-row>
                        <img :src="card.imageUrl" :alt="card.imageDesc" :title="card.imageDesc" class="center">
                    </v-card-row>
                    <v-card-text class="blue-grey darken-3 white--text">
                        <div>{{card.description}}</div>
                    </v-card-text>
                    <v-card-row actions class="blue-grey darken-1 white--text">
                        <v-card-text v-show="!card.cardId">
                            <i class="material-icons">remove_red_eye</i> <br>{{card.viewCount}}
                        </v-card-text>
                        <v-card-text v-show="!card.cardId">
                            <i class="material-icons">screen_share</i> <br>{{card.keepCount}}
                        </v-card-text>
                        <v-card-text>
                            <v-icon v-bind:title="card.author">person_pin</v-icon><br>{{card.author}}
                        </v-card-text>
                    </v-card-row>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'CardModal',
        data() {
            return {
                wrapper: false
            }
        },
        computed: {
            user() {
                return this.$root.store.state.user
            },
            card() {
                return this.$root.store.state.currentCard
            },
            decks() {
                return (this.$root.store.state.decks.filter(deck => {
                    return deck.cardId.some((cardId) => {
                        if (deck.userId === this.$root.store.state.user._id) {
                            if (cardId === this.$root.store.state.currentCard._id) {
                                return false
                            } else {
                                return true
                            }
                        } else {
                            return false
                        }
                    })
                }))
            },
        },
        methods: {
            modalChecker() {
                if (this.wrapper) { }
                else {
                    var cardId = this.$root.store.state.currentCard._id
                    var body = {
                        viewCount: (this.card.viewCount + 1),
                    }
                    this.$root.store.actions.changeCard(body, cardId)
                    this.$parent.showCardModal = false
                }
            },
            addCardToDeck(deck) {
                var cardId = this.$root.store.state.currentCard._id
                var body = {
                    keepCount: (this.card.keepCount + 1),
                }
                var id = deck._id
                deck.cardId = [...new Set([...deck.cardId, this.card._id])]
                this.$root.store.actions.changeCard(body, cardId)
                this.$root.store.actions.addCardToDeck(deck, id)
            }
        }
    }

</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }
    
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    
    img {
        width: 100%;
        max-height: 70vh
    }
    
    .modal-container {
        width: 75vh;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    
    .modal-body {
        margin: 20px 0;
    }

    
    .modal-enter {
        opacity: 0;
    }
    
    .modal-leave-active {
        opacity: 0;
    }
    
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>