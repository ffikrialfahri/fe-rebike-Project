import Card from "./Card";

export default function StatCard({
  title,
  value,
  detail,
  className,
  valueColor = "text-text-dark",
  icon: Icon,
  titleAlign = 'left',
  valueAlign = 'left',
}) {
  const titleTextAlignClass = titleAlign === 'center' ? 'text-center' : 'text-left';
  const valueHorizontalAlignClass = valueAlign === 'center' ? 'justify-center' : 'justify-start';
  const valueTextAlignClass = valueAlign === 'center' ? 'text-center' : 'text-left';

  return (
    <Card className={`relative flex flex-col h-full p-4 overflow-hidden ${className || ''}`}>
      {Icon && (
        <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 -rotate-12 w-40 h-40 opacity-20 pointer-events-none">
          <Icon className="w-full h-full" />
        </div>
      )}
      <h4 className={`text-xl font-bold text-black ${titleTextAlignClass} mb-6`}>
        {title}
      </h4>
      <div className={`flex-grow flex items-center ${valueHorizontalAlignClass}`}>
        <p className={`text-2xl font-bold ${valueTextAlignClass} ${valueColor || 'text-slate-800'}`}>
          {value}
          {detail && <span className="text-slate-400"> / {detail}</span>}
        </p>
      </div>
    </Card>
  );
}