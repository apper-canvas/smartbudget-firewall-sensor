import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Transactions", href: "/transactions", icon: "Receipt" },
    { name: "Budgets", href: "/budgets", icon: "PieChart" },
    { name: "Goals", href: "/goals", icon: "Target" },
    { name: "Analytics", href: "/analytics", icon: "TrendingUp" }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-xl">
              <ApperIcon name="Wallet" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">SmartBudget</h1>
              <p className="text-sm text-gray-600">Personal Finance</p>
            </div>
          </div>
        </div>

        <nav className="px-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <ApperIcon name={item.icon} size={20} />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-r from-primary-50 to-success-50 p-4 rounded-xl border border-primary-200">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-r from-primary-500 to-success-500 p-2 rounded-lg">
                <ApperIcon name="Lightbulb" size={16} className="text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Pro Tip</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Set up automatic savings to reach your goals faster!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;