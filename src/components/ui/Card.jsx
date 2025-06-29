export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-card-bg p-6 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}
