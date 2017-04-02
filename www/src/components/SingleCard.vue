<template>
    <div class="masonry-layout__panel-content">
        <v-card-row class="blue-grey darken-1 center">
            <v-card-title>
                <span class="white--text center">{{card.title}}</span>

            </v-card-title>
        </v-card-row>
        <v-card-row>
            <img v-if="showDeleteModal" v-on:click.self="showDeckCardModalMethod(card)" :src="card.imageUrl" :alt="card.imageDesc" :title="card.imageDesc"
                class="center">
            <img v-if="!showDeleteModal" :src="card.imageUrl" :alt="card.imageDesc" :title="card.imageDesc" class="center">
        </v-card-row>
        <v-card-text class="blue-grey darken-3 white--text">
            <div>{{card.description}}</div>
        </v-card-text>
        <v-card-row @click="dontShow()" actions class="blue-grey darken-1 white--text">
            <v-card-text v-show="!card.cardId">
                <i class="material-icons">remove_red_eye</i> <br>{{card.viewCount}}
            </v-card-text>
            <v-card-text v-show="!card.cardId">
                <i class="material-icons">screen_share</i><br> {{card.keepCount}}
            </v-card-text>
            <v-card-text>
                <v-icon v-bind:title="card.author">person_pin</v-icon><br>{{card.author}}
            </v-card-text>
            <v-card-text @click="deleteFEver(card)" v-if="showDeleteCard">
                <v-icon>delete_forever</v-icon>
            </v-card-text>
        </v-card-row>
    </div>
</template>

<script>
    export default {
        name: 'SingleCard',
        props: ['card'],
        data() {
            return {
                showDeleteCard: this.$parent.$parent.showDelete,
                showDeleteModal: this.$parent.showDelete
            }
        },
        methods: {
            deleteFEver(card) {
                var newArray = []
                var body = {
                    cardId: newArray
                }
                var deckId = this.$root.store.state.activeDeck._id
                this.$root.store.state.activeDeck.cardId.forEach((id) => {
                    if (id != card._id) {
                        newArray.push(id)
                    }
                }, this.$root.store.actions.addCardToDeck(body, deckId));
                // this.$parent.showDeckModal = true
            },
            showDeckCardModalMethod(card) {
                if (Array.isArray(card.cardId)) {
                    this.$root.store.state.activeDeck = card
                    this.$parent.showDeckModal = true
                } else {
                    console.log('here')
                        this.$root.store.state.currentCard = card
                        this.$parent.showCardModal = true
                }

            }
        }
    }

</script>
<style scoped>
    .masonry-layout__panel-content {
        padding: 10px;
        border-radius: 10px;
    }
    
    .center {
        width: 100%
    }
</style>