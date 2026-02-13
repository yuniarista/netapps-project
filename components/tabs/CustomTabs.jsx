export default function CustomTabs({ tabs = [], activeTab, onChange }) {

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button 
          key={index} 
          onClick={() => onChange?.(tab)}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === tab.path
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}>
                {tab.label}

          </button>
        ))}
      </div>
      
    </div>
  );
}
