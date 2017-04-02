<template>
    <div class="noMargin">
        <div>
            <div class="masonry-layout">
                <div v-for="card in cards" class="masonry-layout__panel" @click="showCardModalMethod(card)">
                    <singleCard :card="card"></singleCard>
                </div>
            </div>
        </div>
        <v-snackbar :timeout="timeout" :top="'top'" :right="'right'" :left="'left'" v-model="registerToast">
            {{ registerMsg }}
        </v-snackbar>
        <cardModal v-if="showCardModal"></cardModal>
    </div>
</template>

<script>
    import cardModal from './CardModal'
    import singleCard from './SingleCard'
    export default {
        name: 'MainPage',
        components: { cardModal, singleCard },
        data() {
            return {
                registerToast: this.$root.store.state.registerToast,
                timeout: this.$root.store.state.timeout,
                showCardModal: false
            }
        },
        mounted() {
            setTimeout(() => {
                this.registerToast = false
            }, 3000),

                this.$root.store.actions.authenticate()
            this.$root.store.actions.getCards()
            this.$root.store.actions.getDecks()

        },
        computed: {
            cards() {
                return this.$root.store.state.cards.sort((a,b) => {
                    return b.created - a.created
                })
            },
            registerMsg() {
                return this.$root.store.state.registerMsg
            },
        },
        methods: {
            showCardModalMethod(card) {
                this.$root.store.state.currentCard = card
                this.showCardModal = true
            },
        }
    }

</script>

<style scoped>
    .masonry-layout {
        column-count: 5;
        column-gap: 0;
    }
    
    .masonry-layout__panel {
        break-inside: avoid;
    }
    
    .center {
        width: 100%
    }
</style>