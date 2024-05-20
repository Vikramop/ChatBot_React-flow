'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Toolbar = ({ selectedNodeId, editValue, handleChange, handleEdit }) => {
  const [showUpdateSection, setShowUpdateSection] = useState(false);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleBackClick = () => {
    setShowUpdateSection(false);
  };

  return (
    <div className="sidebar relative w-[25%] border-l-2 border-slate-300 p-2">
      {selectedNodeId && !showUpdateSection ? (
        <div className="update absolute top-0 left-0 w-full h-full bg-white p-4">
          <button
            onClick={() => setShowUpdateSection(true)}
            className="back-button mb-2 border-2 border-black"
          >
            Back
          </button>
          <br />
          <label>Label:</label>
          <input
            type="text"
            className="border-2 border-black mb-2 w-full"
            value={editValue}
            onChange={handleChange}
          />
          <button onClick={handleEdit} className="update-button">
            Update
          </button>
        </div>
      ) : (
        <div className="h-[20%] grid grid-cols-2 gap-4">
          <div
            className="border-2 border-blue-500 flex flex-col justify-center items-center h-[100%] rounded-md"
            onDragStart={(event) => onDragStart(event, 'custom')}
            draggable
          >
            <Image alt="" src="./message.svg" width={20} height={20} />
            <p className="text-blue-500 text-sm font-bold">Message</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
