import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data available", 
  message = "Get started by adding your first item", 
  action,
  actionText = "Add New",
  icon = "Database"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-50 rounded-full p-6 mb-4">
        <ApperIcon 
          name={icon} 
          size={48} 
          className="text-gray-400" 
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}
      </p>
      {action && (
        <button
          onClick={action}
          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-medium inline-flex items-center gap-2"
        >
          <ApperIcon name="Plus" size={20} />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Empty;