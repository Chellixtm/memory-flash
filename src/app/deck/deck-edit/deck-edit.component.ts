import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeckService } from '../deck.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deck-edit',
  templateUrl: './deck-edit.component.html',
  styleUrls: ['./deck-edit.component.css']
})
export class DeckEditComponent implements OnInit {
  deck: Deck;
  sub: Subscription;
  deckForm: FormGroup;
  deckId: number;
  editMode = false;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.deckService.deckChangedEvent.subscribe(
      (deck: Deck) => {
        if(this.editMode) {
          this.deckForm.patchValue({
            'deck_name': deck.deck_name
          })
        }
        this.deck = deck;
      }
    );

    this.route.params.subscribe(
      (p: Params) => {
        this.deckId = +p['id'];
        this.editMode = p['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {
    this.deckService.addDeck(this.deckForm.value);
  }

  private initForm() {
    let deck_name: string = '';
    let creator_id: number = 1;

    // if (this.editMode) {
    //   this.deckService.getAllDecks
    // }
    this.deckForm = new FormGroup({
      'deck_name': new FormControl(deck_name, [Validators.required, Validators.minLength(3)]),
      'creator_id': new FormControl(creator_id)
    });
  }

}
