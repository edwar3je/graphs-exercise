class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray){
      this.nodes.add(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if(this.nodes.has(vertex)){
      this.nodes.delete(vertex);
      for(let node of this.nodes){
        if(node.adjacent.has(vertex)){
          node.adjacent.delete(vertex)
        }
      }
      return vertex;
    }
    return false;
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    let visited = [];
    while(toVisitStack.length){
      let currentPerson = toVisitStack.pop();
      visited.push(currentPerson);
      for(let adj of currentPerson.adjacent){
        if(!seen.has(adj)){
          toVisitStack.push(adj);
          seen.add(adj);
        }
      }
    }
    let initArray = Array.from(visited);
    return initArray.map(( { value } ) => value);
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    while(toVisitQueue.length){
      let currentPerson = toVisitQueue.shift();
      for(let adj of currentPerson.adjacent){
        if(!seen.has(adj)){
          toVisitQueue.push(adj);
          seen.add(adj);
        }
      }
    }
    let initArray = Array.from(seen);
    return initArray.map(( { value } ) => value);
  }
}

module.exports = {Graph, Node}