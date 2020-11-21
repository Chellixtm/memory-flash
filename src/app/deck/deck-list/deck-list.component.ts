import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Deck } from '../deck.model';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {
  public decks: Deck[];
  private sub: Subscription;

  constructor(private deckService: DeckService,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.deckService.decksChangedEvent.subscribe(
      (decks: Deck[]) => {
        this.decks = decks;
      }
    );

    this.deckService.getAllDecks();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
