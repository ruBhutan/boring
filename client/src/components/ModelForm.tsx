import React, { useState } from 'react';

interface ModelFormProps {
  initialValue?: number;
}

const ModelForm: React.FC<ModelFormProps> = ({ initialValue = 0 }) => {
  const [progress, setProgress] = useState(initialValue);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // Assuming a max length of 100 for the input
    const progressValue = (value.length / 100) * 100;
    setProgress(progressValue);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="model-input" className="mb-2 text-brand-text">Enter Value:</label>
      <input
        type="text"
        id="model-input"
        value={inputValue}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-brand-text leading-tight focus:outline-none focus:shadow-outline"
      />
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
        <div
          className="bg-brand-primary h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-brand-text-muted text-sm mt-1">Progress: {progress.toFixed(2)}%</p>
    </div>
  );
};

export default ModelForm;
