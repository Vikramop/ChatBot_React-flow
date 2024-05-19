'use client';

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  useNodes,
  useEdges,
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

const Canvas = ({ onNodeClick }) => {
  //   const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

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
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="flex">
      <ReactFlowProvider>
        <div className="w-[75%] h-[90vh] bg-slate-100">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
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
