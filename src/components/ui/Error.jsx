import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-error-50 rounded-full p-4 mb-4">
        <ApperIcon 
          name="AlertCircle" 
          size={32} 
          className="text-error-500" 
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message || "We encountered an error while loading your data. Please try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;