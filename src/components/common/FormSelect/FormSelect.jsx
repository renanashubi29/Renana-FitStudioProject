export const FormSelect = ({ label, id, value, onChange, options = [] }) => {
    return (
        <div className="form-group"> {/* הקלאס הזה קריטי להופעת הלייבל מעל */}
            <label >{label}</label>
            <select 
                id={id} 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">-- Select --</option>
                {options?.map(item => (
                    <option key={item._id} value={item._id}>
                        {item.name || item.workoutName || item.fullName}
                    </option>
                ))}
            </select>
        </div>
    );
};
