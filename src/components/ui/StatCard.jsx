import Card from "./Card";

const icons = {
  order: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  ),
  product: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  ),
  income: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182L12 10.5M12 18a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </svg>
  ),
};

export default function StatCard({
  title,
  value,
  detail,
  className,
  valueColor = "text-text-dark",
  iconType,
  titleAlign = 'left',
  valueAlign = 'left',
}) {
  const titleTextAlignClass = titleAlign === 'center' ? 'text-center' : 'text-left';
  const valueHorizontalAlignClass = valueAlign === 'center' ? 'justify-center' : 'justify-start';
  const valueTextAlignClass = valueAlign === 'center' ? 'text-center' : 'text-left';

  return (
    <Card className={`relative flex flex-col h-full p-4 overflow-hidden ${className || ''}`}>
      {iconType && (
        <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 -rotate-12 w-29 h-29 opacity-20 pointer-events-none">
          {icons[iconType]}
        </div>
      )}
      <h4 className={`text-xl font-bold text-black ${titleTextAlignClass}`}>
        {title}
      </h4>
      <div className={`flex-grow flex items-center ${valueHorizontalAlignClass}`}>
        <p className={`text-4xl font-bold ${valueTextAlignClass} ${valueColor || 'text-slate-800'}`}>
          {value}
          {detail && <span className="text-slate-400"> / {detail}</span>}
        </p>
      </div>
    </Card>
  );
}