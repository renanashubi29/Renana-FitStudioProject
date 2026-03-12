import './DataTable.css';
export const DataTable = ({ headers, data = [], renderRow, actions = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-[#1a1a1a] rounded-lg shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-800">
            {headers.map((header) => (
              <th key={header} className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-800 hover:bg-[#222] transition-colors">
              {/* כאן אנחנו קוראים לפונקציה שמעבירה את ה-JSX הספציפי לכל שורה */}
              {renderRow(item)}
              
              {/* עמודת פעולות גנרית */}
              <td className="p-4 text-right">
  <div className="action-btns"> {/* שיניתי ל-btns ברבים כדי שיתאים לקוד הטוב שלך */}
    {actions.includes('edit') && (
      <button 
        className="action-btn edit-btn" 
        onClick={() => onEdit(item)} // וודא שהפונקציה קיימת בהקשר הזה
        title="Edit"
      >
        ✏️
      </button>
    )}
    {actions.includes('delete') && (
      <button 
        className="action-btn delete-btn" 
        onClick={() => onDelete(item._id)} // וודא שהפונקציה קיימת בהקשר הזה
        title="Delete"
      >
        🗑️
      </button>
    )}
  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};