import { AppState } from "../AppState"

class QuoteService {
  setActiveQuote() {
    //Runs through a set of pre made quotes and selects a random one to be used on the Challenge.vue component
    let randomNumber = Math.floor(Math.random() * AppState.quotes.length)
    let quote = AppState.quotes[randomNumber]
    AppState.activeQuote = quote
  }
}

export const quoteService = new QuoteService()