const AdminTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["jobs", "candidates", "companies"];

  return (
    <ul className="nav nav-tabs my-3">
      {tabs.map((tab) => (
        <li key={tab} className="nav-item">
          <button
            className={`nav-link ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AdminTabs;
