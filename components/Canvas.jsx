'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
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
import Header from './Header';

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

const getId = () => `dndnode_${Date.now()}`;

const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  useEffect(() => {
    const savedNodes = localStorage.getItem('nodes');
    const savedEdges = localStorage.getItem('edges');

    if (savedNodes && savedEdges) {
      setNodes(JSON.parse(savedNodes));
      setEdges(JSON.parse(savedEdges));
    }
  }, []);

  const onNodeClick = (e, node) => {
    setEditValue(node.data.msg);
    setSelectedNodeId(node.id);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setEditValue(e.target.value);
  };

  const handleEdit = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          node.data = { ...node.data, msg: editValue };
        }
        return node;
      })
    );
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
      if (!type) return;

      const position = reactFlowInstance.project({
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

  const areAllNodesConnected = () => {
    if (nodes.length === 1) return true; // A single node is considered connected

    const connectedNodes = new Set();
    edges.forEach((edge) => {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    });

    return nodes.every((node) => connectedNodes.has(node.id));
  };

  const handleSave = () => {
    if (!areAllNodesConnected()) {
      alert('Connect the nodes before saving');
      return;
    }

    localStorage.setItem('nodes', JSON.stringify(nodes));
    localStorage.setItem('edges', JSON.stringify(edges));
    alert('Flow saved successfully!');
  };

  return (
    <div>
      <Header handleSave={handleSave} />
      <div className="flex">
        <ReactFlowProvider>
          <div className="w-[75%] h-[90vh] bg-slate-100" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodeClick={onNodeClick}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
          <Toolbar
            selectedNodeId={selectedNodeId}
            editValue={editValue}
            handleChange={handleChange}
            handleEdit={handleEdit}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Canvas;
