<template>
    <div>
        <h3>Public Decks</h3>
        <div>
            <div class="masonry-layout">
                <div v-for="deck in publicDecks" class="masonry-layout__panel">
                    <singleCard :card="deck"></singleCard>
                </div>
            </div>
        </div>
        <h3>Private Decks</h3>
        <div>
            <div class="masonry-layout">
                <div v-for="deck in privateDecks" class="masonry-layout__panel">
                    <singleCard :card="deck"></singleCard>
                </div>
            </div>
        </div>
        <deckModal v-if="showDeckModal"></deckModal>
    </div>
</template>

<script>
    import deckModal from './DeckModal'
    import singleCard from './SingleCard'
    export default {
        name: 'Dashboard',
        components: { deckModal, singleCard },
        data() {
            return {
                showDeckModal: false,
                showDelete: true
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