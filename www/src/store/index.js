import axios from 'axios'
import router from '../router'

let ax = axios.create({
  baseURL: 'https://keepr-decks.herokuapp.com/',
  
  timeout: 4000,
  withCredentials: true
})
let api = axios.create({
  baseURL: 'https://keepr-decks.herokuapp.com/api/',
  timeout: 4000,
  withCredentials: true
})

// REGISTER ALL DATA HERE
let state = {
  authenticated: false,
  decks: [],
  activeDeck: {},
  cards: [],
  activeCard: {},
  currentCard: {},
  user: {},
  myVaults: {},
  myKeeps: {},
  registerToast: false,
  registerMsg: '',
  timeout: 3000,
  error: '',
}

let handleError = (err) => {
      state.error = err
    }

export default {
    // ALL DATA LIVES IN THE STATE
    state,
    // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
    actions: {
      authenticate() {
        ax('authenticate').then(res => {
          if (res.data.data == null) {
            router.push('/')
          } else {
            state.user = res.data.data
            state.authenticated = true
          }
        }).catch(handleError)
      },
      register(body) {
        ax.post('register', body).then(res => {
          if (res.data.message === 'Successfully created user account') {
            state.user = res.data.data
            router.push('/mainpage')
            state.registerMsg = 'Succesfully Registered'

          } else if (res.data.error.message === 'User validation failed') {
            state.registerMsg = 'Registration Failed Retry'
          }
        }).catch(state.registerToast = true, handleError)
      },
      logIn(body) {
        if (body.email != undefined) {
          ax.post('login', body).then(res => {
            if (res.data.message === 'Successfully logged in') {
              state.user = res.data.data
              router.push('/mainpage')
              state.registerMsg = 'Succesfully logged in'
            } else {
              state.registerMsg = 'Invalid User Name or Password'
            }
          }).catch(state.registerToast = true, handleError)
        } else if (body.userName != undefined) {
          ax.post('logun', body).then(res => {
            if (res.data.message === 'Successfully logged in') {
              state.user = res.data.data
              router.push('/mainpage')
              state.registerMsg = 'Succesfully logged in'
            } else {
              state.registerMsg = 'Invalid User Name or Password'
            }
          }).catch(state.registerToast = true, handleError)
        }
      },
      logout() {
        ax.delete('logout').then(res => {
            location.reload()
        }).catch(handleError)
      },
      addCard(body) {
        api.post('cards', body).then(res => {
          state.activeCard = res.data.data
          this.getCards()
        }).catch(handleError)
      },
      getCards() {
        api('cards').then(res => {
          state.cards = res.data.data
        }).catch(handleError)
      },
      addDeck(body) {
        api.post('decks', body).then(res => {
          state.activeDeck = res.data.data
          this.getDecks()
        }).catch(handleError)
      },
      getDecks() {
        api('decks').then(res => {
          state.decks = res.data.data
        }).catch(handleError)
      },
      changeCard(body, id) {
        api.put('cards/' + id, body).then(res => {
          this.getCards()
        }).catch(handleError)
      },
      addCardToDeck(body, id) {
        api.put('decks/' + id, body).then(res => {
          this.getActiveDeck(id)
          this.getDecks()
        }).catch(handleError)
      },
      getActiveDeck(id){
        api('decks/'+id).then(res => {
          state.activeDeck = res.data.data
        }).catch(handleError)
      },
      pushCardToDeck(body, id) {
        api.put('/pushCardToDeck/' + id, body).then(res => {
          this.getDecks()
        }).catch(handleError)
      },
      deleteDeck(id){
        api.delete('decks/' + id).then(res => {
          this.getDecks()
        }).catch(handleError)
      }
    }
  }

