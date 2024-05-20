'use client';

import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Toolbar from './Toolbar';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 200, y: 300 },
    data: { msg: 'test message 1' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 550, y: 200 },
    data: { msg: 'test message 2' },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  //updating the name of nodes
  const [editValue, setEditValue] = useState(nodes.data);
  const [id, setId] = useState();

  // function to edit
  const onNodeClick = (e, val) => {
    setEditValue(val.data.msg);
    setId(val.id);

    console.log('clicked');
  };

  //handle change function
  const handleChange = (e) => {
    e.preventDefault();
    setEditValue(e.target.value);
  };

  const handleEdit = () => {
    const res = nodes.map((item) => {
      if (item.id === id) {
        item.data = {
          ...item.data,
          msg: editValue,
        };
      }
      return item;
    });
    setNodes(res);
    setEditValue('');
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { msg: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="flex">
      <div className="update">
        <label>label:</label> <br />
        <input
          type="text"
          className="border-2 border-black"
          value={editValue}
          onChange={handleChange}
        />
        <button onClick={handleEdit}> UPdate</button>
      </div>
      <ReactFlowProvider>
        <div className="w-[75%] h-[90vh] bg-slate-100" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={(e, val) => onNodeClick(e, val)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            // fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        <Toolbar />
      </ReactFlowProvider>
    </div>
  );
};

export default Canvas;
