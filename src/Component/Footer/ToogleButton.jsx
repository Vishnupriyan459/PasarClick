import React from 'react';

const ToogleButton = ({ title, isAvailable, onToggle }) => {
  const handleToggle = () => {
    onToggle(title, !isAvailable);
  };

  return (
    <div className="flex items-center space-x-3">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isAvailable}
          onChange={handleToggle}
        />
        <div className="w-8 h-5 tablet:w-11 tablet:h-7 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500"></div>
        <div className="absolute left-1 top-1 bg-white w-3 h-3 tablet:w-5 tablet:h-5 rounded-full transition-all peer-checked:translate-x-full"></div>
      </label>
    </div>
  );
};

export default ToogleButton;
