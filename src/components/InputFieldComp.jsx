export const InputFieldComp = (props) => {
  const { label, type, name, value, onChange, required = false } = props;

  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};