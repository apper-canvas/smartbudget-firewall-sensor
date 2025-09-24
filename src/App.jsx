import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Smart Budget App
            </h1>
            <p className="text-lg text-gray-600">
              Your personal finance management solution
            </p>
          </div>
          
          <Routes>
            <Route path="/" element={
              <div className="mt-8 text-center">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                  <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
                  <p className="text-gray-600">
                    Your Smart Budget application is ready to go.
                  </p>
                </div>
              </div>
            } />
          </Routes>
        </div>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;