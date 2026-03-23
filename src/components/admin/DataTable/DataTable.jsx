import './DataTable.css';
export const DataTable = ({ headers, data = [], renderRow, actions = [], onEdit, onDelete }) => {
  return (
    <div className="table-wrapper"> {/* החלפתי קלאס גנרי לקלאס ייעודי */}
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
           
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {renderRow(item)}
              <td className="actions-cell">
                <div className="action-btns">
                  {actions.includes('edit') && (
                    <button className="action-btn edit-btn" onClick={() => onEdit(item)} title="Edit">
                      ✏️
                    </button>
                  )}
                  {actions.includes('delete') && (
                    <button className="action-btn delete-btn" onClick={() => onDelete(item._id)} title="Delete">
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