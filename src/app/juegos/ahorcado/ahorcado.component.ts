import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Words } from 'src/app/clases/words';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  MAX_ATTEMPTS = 6;
  MASK_CHAR = "_";
  mensaje = "";
  remainingAttempts: number;

  letters!: any;
  hiddenWord!: Words[];
  palabras = ["casa", "bebida", "gato", "perro", "elefante", "mesa", "silla", "computadora", "typescript", "javascript"]

  constructor() {
    this.remainingAttempts = 0;
    this.resetGame();
  }
  ngOnInit(): void {
  }

  resetGame() {
    this.resetAttempts();
    this.setupKeys();
    this.chooseWord();
  }
  checkGameStatus() {
    if (this.playerWins()) {
      this.mensaje = "Ganaste!. La palabra era " + this.getUnhiddenWord();
      this.resetGame();
    }
    if (this.playerLoses()) {
      this.mensaje = "Perdiste. La palabra era " + this.getUnhiddenWord();
      this.resetGame();
    }
  }

  getUnhiddenWord() {
    let word = "";
    for (const letter of this.hiddenWord) {
      word += letter.letter;
    }
    return word;
  }
  playerWins() {
    // If there's at least a hidden letter, the player hasn't win yet
    for (const letter of this.hiddenWord) {
      if (letter.hidden) {
        return false;
      }
    }
    return true;
  }
  playerLoses() {
    return this.remainingAttempts <= 0;
  }
  imagePath() {
    return `/assets/imagenes/ahorcado/Ahorcado-${this.MAX_ATTEMPTS - this.remainingAttempts}.png`;
  }
  resetAttempts() {
    this.remainingAttempts = this.MAX_ATTEMPTS;
  }
  async chooseWord() {


    // Choose random
    let word = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.prepareWord(word);
  }
  prepareWord(word: string) {
    word = word.toUpperCase();

    for (const letter of word) {
      this.hiddenWord.push({
        letter,
        hidden: true,
      });
    }

  }
  displayWord() {
    let displayedWord = "";
    for (const letter of this.hiddenWord) {
      if (letter.hidden) {
        displayedWord += this.MASK_CHAR;
      } else {
        displayedWord += letter.letter;
      }
      displayedWord += " ";
    }
    return displayedWord;
  }

  setupKeys() {
    // We make a dictionary from the letters
    for (const letter of this.ALPHABET) {
      for (let index = 0; index < this.ALPHABET.length; index++) {

        this.letters[this.ALPHABET[index]] =
        {
          letter,
          disabled: false,

        }

      }


    }
  }
  letterExistsInWord(searchedLetter: any) {
    for (const letter of this.hiddenWord) {
      if (letter.letter === searchedLetter) {
        return true;
      }
    }
    return false;
  }
  discoverLetter(letter: any) {
    for (let index = 0; index < this.hiddenWord.length; index++) {
      if (this.hiddenWord[index].letter === letter) {
        this.hiddenWord[index].hidden = false;
      }

    }

    for (const index in this.hiddenWord) {
      if (this.hiddenWord[index].letter === letter) {
        this.hiddenWord[index].hidden = false;
      }
    }
  }
  attemptWithLetter(letter: any) {
    //  Vue.set(this.letters[letter], "disabled", true);
    if (!this.letterExistsInWord(letter)) {
      this.remainingAttempts -= 1;
    } else {
      this.discoverLetter(letter);
    }
    this.checkGameStatus();
  }

}
