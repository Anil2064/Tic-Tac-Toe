import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private playerMarkTypes = {
    0: '',
    1: 'X',
    2: 'O'
  };

  isDraw: boolean = false;
  isWon: boolean = false;
  
  private gridValue = [];

  private playerTurn = 1;

  playerWon: number;

  private win = [];

  constructor() { }

  ngOnInit() {
    this.win = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    this.gridValue = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }

  /**
   * To reset game
   */
  resetGame(){
    this.isDraw = false;
    this.isWon = false;
    this.gridValue = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  /**
   * To check if we have a winner
   * @param playerMark if X or 0
   */
  isWinner(playerMark){
    let emptyCount = 0;
    for(let i=0;i<9;i++){
      if(this.gridValue[i] == 0) emptyCount++;
    }

    for(let i=0;i<8;i++){
      if(this.gridValue[this.win[i][0]] == playerMark && this.gridValue[this.win[i][1]] == playerMark && this.gridValue[this.win[i][2]] == playerMark){
        console.log('true');
        this.isWon = true;
        this.playerWon = playerMark;
        return;
        // return true;
      }
    }

    if(emptyCount == 0){
      this.isDraw = true;
    }
    console.log('false');
    // return false;
  }

  /**
   * To handle click
   * @param gridNum Grid number of game
   */
  handleClick(gridNum){
    if((!this.isWon) && this.gridValue[gridNum] == 0){
      if(this.playerTurn == 1){ //for X
        this.gridValue[gridNum] = 1;
        this.isWinner(1);
        this.playerTurn = 2
      }
      else{                      // for O
        this.gridValue[gridNum] = 2;
        this.isWinner(2);
        this.playerTurn = 1;
      }
    }
  }

}
