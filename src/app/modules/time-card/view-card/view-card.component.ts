import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/core/services/offline/note.service';
import { Catergories } from 'src/app/shared/models/categories';
import { Notes } from 'src/app/shared/models/notes';
import { StateTypes } from 'src/app/shared/models/state-types';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent implements OnInit {

  states = StateTypes;

  constructor(public noteService: NoteService) {}
  
  ngOnInit(): void {
  }


  public addState(newState: StateTypes) {
    this.noteService.stateSubject.next(newState);
  }

  public addNoteId(id: number) {
    console.log('id being added: ', id);
    this.noteService.currentNoteId = id;
  }

}