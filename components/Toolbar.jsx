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
        <div className="update absolute top-0 left-0 w-full h-full bg-white ">
          <div className="border-b-2 border-gray-400 px-4 py-2 flex">
            <div className="w-1/3">
              <button
                onClick={() => setShowUpdateSection(true)}
                className="back-button mb-2  rotate-180"
              >
                &#10140;
              </button>
            </div>
            <div className="w-2/3 flex  ml-6">
              <p>Message</p>
            </div>
          </div>
          <br />
          <div className="px-4 py-2">
            <p className="text-gray-400 mb-3">Text</p>
            <textarea
              type="text"
              className="border-2 border-gray-300 rounded-md p-2 mb-2 w-full"
              value={editValue}
              onChange={handleChange}
              rows={3}
            />
            <button
              onClick={handleEdit}
              className="border-2 border-blue-500 bg-white px-4 py-2 text-sm font-bold rounded-md text-blue-500"
            >
              Update
            </button>
          </div>
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
