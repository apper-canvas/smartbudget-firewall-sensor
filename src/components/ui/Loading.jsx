import React from "react";

const Loading = ({ type = "cards" }) => {
  if (type === "dashboard") {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-28"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-100 rounded-xl h-80"></div>
          <div className="bg-gray-100 rounded-xl h-80"></div>
        </div>
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-xl card-shadow p-6">
          <div className="h-6 bg-gray-100 rounded mb-4 w-1/3"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "chart") {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-xl card-shadow p-6">
          <div className="h-6 bg-gray-100 rounded mb-4 w-1/3"></div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-xl h-48"></div>
      ))}
    </div>
  );
};

export default Loading;