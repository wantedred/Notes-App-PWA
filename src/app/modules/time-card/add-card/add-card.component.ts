import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/core/services/offline/note.service';
import { Catergories } from 'src/app/shared/models/categories';
import { Notes } from 'src/app/shared/models/notes';
import { StateTypes } from 'src/app/shared/models/state-types';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  /**
   * The categories array for html
   */
  public categories = [];

  /**
   * Is it a custom category for the html
   */
  public isCustomCategory: boolean;
  
  /**
   * The form group for the notes form
   */
  public AddNoteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private snackbar: MatSnackBar
  ) {
    this.categories = Object.values(Catergories);
    this.AddNoteForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      body: new FormControl('', [Validators.required, Validators.minLength(3)]),
      category: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit(): void {
    this.category.setValue(Catergories.NONE);
  }

  /**
   * Was the custom category button clicked
   */
  public customCategoryClicked() {
    this.isCustomCategory = !this.isCustomCategory;
    this.isCustomCategory ? 
    this.category.setValue('') :
    this.category.setValue(Catergories.NONE);
  }

  /**
   * The submit method for the form
   */
  public onSubmit() {
    let note = new Notes(this.title.value, this.body.value, false, this.category.value, this.isCustomCategory);
    if (note.creationDate == undefined || null) {
      note.creationDate = new Date().toLocaleDateString();
    }

    let result = this.noteService.addNote(note);

    if (result) {
      this.snackbar.open('Your note was saved', 'Close', {duration: 1000 * 5});
      this.noteService.stateSubject.next(StateTypes.DEFAULT);
    } else {
      this.snackbar.open("Your note couldn't be saved", 'Close', {duration: 1000 * 5});
    }
  }

  /**
   * Gets the title object from the form
   */
  get title() {
    return this.AddNoteForm.get('title');
  }

  /**
   * Gets the category object from the form
   */
  get category() {
    return this.AddNoteForm.get('category');
  }

  /**
   * Gets the body object from the form
   */
  get body () {
    return this.AddNoteForm.get('body');
  }

}