import Image from 'next/image';
import React from 'react';

const Toolbar = ({ selectedNodeId, selectedNodeSettings }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="sidebar w-[25%] border-l-2 border-slate-300 grid grid-cols-2 gap-4 p-2">
      <div
        className="border-2 border-blue-500  flex flex-col justify-center items-center h-[20%] rounded-md"
        onDragStart={(event) => onDragStart(event, 'custom')}
        draggable
      >
        <Image alt="" src="./message.svg" width={20} height={20} />
        <p className="text-blue-500 text-sm font-bold"> message</p>
      </div>

      {selectedNodeId && (
        <div className="border-2 border-blue-500 flex flex-col justify-center items-center h-[20%] rounded-md">
          {/* Display the selected node's settings here */}
          <p className="text-blue-500 text-sm font-bold">
            {selectedNodeSettings.label}
          </p>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
