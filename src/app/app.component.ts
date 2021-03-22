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
  grid: any;
  visitedNodesInOrder: any;
  nodesInShortestPathOrder: any;

  constructor() { }

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
          this.grid[node.row][node.col].isVisited = true;
        }, i * 10);
    }
  }
  animateShortestPath(nodesInShortestPathOrder: any): any {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        console.log(node);
        this.grid[node.row][node.col].isShortest = true;
      }, 50 * i);
    }
  }

  ngOnInit(): void {
    this.grid = this.getInitialGrid();
  }
  // tslint:disable-next-line: typedef
  render(){
     this.visitedNodesInOrder = dijkstra(this.grid, this.grid[START_NODE_ROW][START_NODE_COL], this.grid[FINISH_NODE_ROW][FINISH_NODE_COL]);
    // const nodesInShortestPathOrder = getNodesInShortestPathOrder(this.grid[FINISH_NODE_ROW][FINISH_NODE_COL]);
    // this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  // tslint:disable-next-line: typedef
  shortest(){
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(this.grid[FINISH_NODE_ROW][FINISH_NODE_COL]);
    this.animateDijkstra(this.visitedNodesInOrder, nodesInShortestPathOrder);
  }
}
