import React from 'react';

const Header = () => {
  return (
    <div className="bg-gray-300 flex justify-end py-4 px-32 h-[10vh]">
      <button className="border-2 border-blue-500 bg-white px-4 py-2 text-sm font-bold rounded-md text-blue-500">
        Save Changes
      </button>
    </div>
  );
};

export default Header;
