const RadioButton = ({ value, status, setStatus, title }) => {
  return (
    <div>
      <input
        type="radio"
        id={value}
        checked={status === value}
        value={value}
        onChange={(e) => setStatus(e.target.value)}
      />
      <label htmlFor={value}>{title}</label>
    </div>
  );
};

export default RadioButton;
