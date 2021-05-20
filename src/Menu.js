import React, {useState} from 'react';

const Menu = ({tree, onAddNode, onRemoveNode}) => {

  const expandedStates = tree.reduce((acc, curr) => {
    acc[curr.id] = true;
    return acc;
  }, {});

  const [expanded, setExpanded] = useState(expandedStates);

  return (
    <ul>
      {tree.map(node => {
        return <li key={node.id}>
          {node.text}

          <button onClick={() => onAddNode(node.id)}><span>+</span></button>
          <button onClick={() => onRemoveNode(node.id)}><span>-</span></button>

          {node.children && !!node.children.length && <>
            <button onClick={() => setExpanded((prevState) => {
              return {...prevState, [node.id]: !prevState[node.id]}
            })}>
              {expanded[node.id] && <span>↑</span>}
              {!expanded[node.id] && <span>↓</span>}
            </button>

            {expanded[node.id] && <>
              <Menu tree={node.children} onAddNode={onAddNode} onRemoveNode={onRemoveNode}/>
            </>}
          </>}
        </li>
      })}
    </ul>
  );
};

export default Menu;
