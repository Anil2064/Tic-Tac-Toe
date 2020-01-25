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
  
  //Array to save grid values
  private gridValue = [];

  private playerTurn = 1;

  playerWon: number;

  constructor() { }

  ngOnInit() {
    this.gridValue = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }

  /**
   * To reset game
   */
  resetGame(){
    this.isDraw = false;
    this.isWon = false;
    this.playerTurn = 1;
    this.gridValue = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }

  /**
   * To check if we have a winner
   * @param playerMark String 'X' or 'O'
   */
  isWinner(playerMark, row, col){
    let emptyCount = 0;

    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        if(this.gridValue[i][j] == 0) emptyCount++;
      }
    }

    let rowFlag=0;
    for(let i=0;i<3;i++){ //row
      if(this.gridValue[row][i] == playerMark){
        rowFlag++;
      }
    }

    if(rowFlag == 3){
      console.log('row win');
      this.isWon = true;
      this.playerWon = playerMark;
      return true;
    } 

    let colFlag = 0;
    for(let i=0;i<3;i++){ //col
      if(this.gridValue[i][col] == playerMark){
        colFlag++;
      }
    }

    if(colFlag == 3){
      this.isWon = true;
      this.playerWon = playerMark;
      return true;
    } 


    if(row == col){
      let leftDiaFlag = 0;
      for(let i=0;i<3;i++){  //let diagonal
        if(this.gridValue[i][i] == playerMark){
          leftDiaFlag++;
        }
      }

      if(leftDiaFlag == 3){
        this.isWon = true;
        this.playerWon = playerMark;
        return true;
      } 
    
      let rightDiaFlag=0;
      let i=0, j=2;
      while(i<=2 && j>=0){  //right diagonal
        if(this.gridValue[i][j] == playerMark){
          rightDiaFlag++;
        }
        i++;
        j--;
      }

      if(rightDiaFlag == 3){
        this.isWon = true;
        this.playerWon = playerMark;
        return true;
      } 

    }

    if(emptyCount == 0){
      this.isDraw = true;
    }
  
    return false;
  }

  /**
   * To handle click
   * @param gridNum Grid number of game
   */
  handleClick(row, col){
    if((!this.isWon) && this.gridValue[row][col] == 0){
      if(this.playerTurn == 1){ //for X
        this.gridValue[row][col] = 1;
        this.isWinner(1, row, col);
        this.playerTurn = 2
      }
      else{                      // for O
        this.gridValue[row][col] = 2;
        this.isWinner(2, row, col);
        this.playerTurn = 1;
      }
    }
  }

}
