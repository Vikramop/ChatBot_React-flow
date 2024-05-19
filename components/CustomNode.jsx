import Image from 'next/image';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  return (
    <div className=" shadow-xl rounded-md bg-white border-2 border-stone-400">
      <div className="flex">
        <div className="gap-12 px-3 py-1 flex justify-center items-center bg-green-300">
          <div>
            <p className="font-semibold text-sm">
              <span>💬</span>Send Message{' '}
            </p>
          </div>

          <Image alt="" src="./whatsapp.svg" width={20} height={20} />
        </div>
      </div>

      <div className="h-[50px] flex items-center">
        <p className="px-3 text-sm text-gray-500">
          {data.msg || 'text message'}
        </p>
      </div>

      <Handle type="target" position={Position.Left} className=" bg-gray-500" />
      <Handle
        type="source"
        position={Position.Right}
        className=" bg-gray-500"
      />
    </div>
  );
};

export default memo(CustomNode);
