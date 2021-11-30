import { AppState } from "../AppState"

class QuoteService {
  setActiveQuote() {
    let randomNumber = Math.floor(Math.random() * AppState.quotes.length)
    let quote = AppState.quotes[randomNumber]
    AppState.activeQuote = quote
  }
}

export const quoteService = new QuoteService()