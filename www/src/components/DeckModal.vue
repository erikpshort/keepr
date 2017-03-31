<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper" value="wrapper" @click="modalChecker(), wrapper=false">
                <div class="modal-container" value="container" @click="wrapper=true">
                    <div class="masonry-layout">

                        <div v-for="card in deckCards" class="masonry-layout__panel" @click="showCardModalMethod(card)">
                            <singleCard :card="card"></singleCard>
                        </div>
                            <h1 @click="deleteDeck()"><i class="material-icons md-48">delete_forever</i>Deck</h1>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import singleCard from './SingleCard'
    export default {
        name: 'DeckModal',
        data() {
            return {
                wrapper: false
            }
        },
        components: { singleCard },
        computed: {
            deckCards() {
                return this.$root.store.state.cards.filter(card => {
                    return this.$root.store.state.activeDeck.cardId.some(function (cardId) {
                        return cardId == card._id
                    })
                })
            }
        },
        methods: {
            showCardModalMethod(card) {
                this.$root.store.state.currentCard = card
                this.$parent.$parent.showCardModal = true
            },
            modalChecker() {
                if (this.wrapper) { }
                else {
                    this.$parent.showDeckModal = false
                }
            },
            deleteDeck(){
                var x = confirm('Are you Sure?')
                if (x){
                    var id = this.$root.store.state.activeDeck._id
                    this.$root.store.actions.deleteDeck(id)
                    this.$parent.showDeckModal = false
                }else{
                    return
                }
            },
        }
    }

</script>

<style scoped>
    .material-icons.md-48 { font-size: 300px; }
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
        width: 75vw;
        margin: 0px auto;
        padding: 20px 30px;
        height: auto;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
        max-height: calc(100vh - 30px);
        overflow-y: auto;
    }
    
    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }
    
    .modal-body {
        margin: 20px 0;
    }
    
    .modal-default-button {
        float: right;
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
    
    .masonry-layout {
        column-count: 4;
        column-gap: 0;
    }
    
    .masonry-layout__panel {
        break-inside: avoid;
    }
    
    .center {
        width: 100%
    }
</style>