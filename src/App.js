import './App.css';

import data from './data.json';
import Menu from "./Menu";
import React, {useState} from "react";

function App() {
  const [tree, setTree] = useState(data);

  const onAddNode = (id) => {
    const addNodeById = (nodes, id) => {
      nodes.forEach(node => {
        if (node.id === id) {
          node.children = node.children || [];
          const id = Math.random().toString(36).substr(2, 9);
          node.children.push({id, text: id});
        }
        if (node.children && node.children.length) {
          addNodeById(node.children, id);
        }
      });
    }

    const updatedTree = JSON.parse(JSON.stringify(tree)); // deep clone
    addNodeById(updatedTree, id);
    setTree(updatedTree);
  }

  const onRemoveNode = (id) => {
    const removeNodeById = (nodes, id) => {
      const index = nodes.findIndex(e => e.id === id);
      if (index > -1) {
        nodes.splice(index, 1);
      }
      nodes.forEach(node => {
        if (node.children && node.children.length) {
          removeNodeById(node.children, id);
        }
      })
    }

    const updatedTree = JSON.parse(JSON.stringify(tree)); // deep clone
    removeNodeById(updatedTree, id);
    setTree(updatedTree);
  }

  return <>
    <Menu tree={tree} onAddNode={(id) => onAddNode(id)} onRemoveNode={(id) => onRemoveNode(id)}/>

    {!tree.length && <>
      <button onClick={() => setTree([{id: 0, text: 'root'}])}><span>+</span></button>
    </>}
  </>;
}

export default App;
