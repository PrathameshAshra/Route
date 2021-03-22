import { Component, OnInit } from '@angular/core';
import {dijkstra,  getNodesInShortestPathOrder} from './core/dijkstra';

const START_NODE_ROW = 1;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL =   5;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  state: any;
  visitedNodesInOrder: any;
  nodesInShortestPathOrder: any;

  constructor() {
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
   }

  getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 20; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  }
  createNode = (col: number, row: number) => ({
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  })

  animateDijkstra(visitedNodesInOrder: any, nodesInShortestPathOrder: any): any {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        this.state.grid[node.row][node.col].isChecked = true;
              // document.getElementById(`node-${node.row}-${node.col}`).className =
        //   'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder: any): any {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        this.state.grid[node.row][node.col].isShortest = true;
        //   'node ';
      }, 50 * i);
    }
  }

  visualizeDijkstra(): any {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  onCellClick(cell: any, i: any, j: any): void{
    if ((i === START_NODE_ROW && j === START_NODE_COL) || (i === FINISH_NODE_ROW && j === FINISH_NODE_COL)) {
      alert('starting Element cant be blocked');
    }else{
      this.state.grid[i][j].isWall = !this.state.grid[i][j].isWall;

    }

  }
  clearGraph(): void{
    this.state.grid = this.getInitialGrid();

  }
  ngOnInit(): void {
    this.state.grid = this.getInitialGrid();
  }
}
