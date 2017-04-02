<template>
    <div>
        <h3 @click="showPrivate=!showPrivate, showHelp2=false">Private Decks</h3>
        <p @click="showHelp2=false, showPrivate=!showPrivate" v-if="showHelp2">If you have Private Decks click me to see!</p>
        <p v-if="showHelp" @click="showHelp=false">Click Decks or Cards to see More.  Click me to destroy Me!</p>
        <hr>
        <br v-if="!showPrivate">
        <div v-if="showPrivate">
            <div class="masonry-layout">
                <div v-for="deck in privateDecks" class="masonry-layout__panel">
                    <singleCard :card="deck"></singleCard>
                </div>
            </div>
        </div>
        <h3 @click="showPublic=!showPublic">Public Decks</h3>
        <hr>
        <br v-if="!showPublic">
        <div v-if="showPublic">
            <div class="masonry-layout">
                <div v-for="deck in publicDecks" class="masonry-layout__panel">
                    <singleCard :card="deck"></singleCard>
                </div>
            </div>
        </div>
        <h3 @click="showCards=!showCards">Your Cards</h3>
        <hr>
        <div v-if="showCards">
            <div class="masonry-layout">
                <div v-for="card in userCards" class="masonry-layout__panel">
                    <singleCard :card="card"></singleCard>
                </div>
            </div>
        </div>
        <deckModal v-if="showDeckModal"></deckModal>
        <cardModal v-if="showCardModal"></cardModal>
    </div>
</template>

<script>
    import deckModal from './DeckModal'
    import singleCard from './SingleCard'
    import cardModal from './CardModal'
    export default {
        name: 'Dashboard',
        components: { deckModal, singleCard, cardModal },
        data() {
            return {
                showDeckModal: false,
                showDelete: true,
                showCardModal: false,
                showPublic: true,
                showPrivate: false,
                showCards: true,
                showHelp: true,
                showHelp2: true,
            }
        },
        mounted() {
            this.$root.store.actions.authenticate()
            this.$root.store.actions.getDecks()
            this.$root.store.actions.getCards()
        },
        methods: {

        },
        computed: {
            user() {
                return this.$root.store.state.user
            },
            publicDecks() {
                return this.$root.store.state.decks.filter(deck => {
                    return (deck.userId == this.$root.store.state.user._id && !deck.private)
                })
            },
            privateDecks() {
                return this.$root.store.state.decks.filter(deck => {
                    return (deck.userId == this.$root.store.state.user._id && deck.private)
                })
            },
            userCards(){
                return this.$root.store.state.cards.filter(card => {
                    return (card.userId == this.$root.store.state.user._id)
                })
            }
        }
    }

</script>

<style scoped>
    .masonry-layout {
        column-count: 4;
        column-gap: 0;
    }
    
    .masonry-layout__panel {
        break-inside: avoid;
    }
</style>