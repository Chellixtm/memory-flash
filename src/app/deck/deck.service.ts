import { Injectable } from '@angular/core';
import { Deck } from './deck.model';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DeckService {
    decksChangedEvent = new Subject<Deck[]>();
    deckChangedEvent = new Subject<Deck>();
    decks: Deck[] = [];
    deck: Deck;
    maxDecks: number;
    baseUrl = "https://memory-db.herokuapp.com/deck/";

    constructor(private http: HttpClient) { }

    getAllDecks() {
        const user_id = parseInt(localStorage.getItem('user_id'));
        this.http.get<Deck[]>(this.baseUrl + "getUserDecks?id=" + user_id).subscribe(result => {
            this.decks = result;
            this.decksChangedEvent.next(this.decks.slice());
        }), catchError(e => {
            return throwError(e);
        });
    }

    addDeck(deck: Deck) {
        this.http.post<Deck>(this.baseUrl + 'new', deck).subscribe(result => {
            console.log(result)
        }), catchError(e => {
            return throwError(e);
        });
    }
}