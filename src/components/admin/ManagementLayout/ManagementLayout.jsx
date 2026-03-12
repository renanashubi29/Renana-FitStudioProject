import './ManagementLayout.css';

export const ManagementLayout = ({ title, buttonText, onButtonClick, children }) => {
  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <h1 className="title">{title}</h1>
          <button onClick={onButtonClick} className="btn">
            {buttonText}
          </button>
        </header>
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};