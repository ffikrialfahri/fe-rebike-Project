import Card from "./Card";

export default function StatCard({
  title,
  value,
  detail,
  className,
  valueColor = "text-text-dark",
  // 1. Menggunakan dua prop terpisah untuk alignment
  titleAlign = 'left',  // Nilai default: left
  valueAlign = 'left',  // Nilai default: left
}) {

  // 2. Variabel terpisah untuk alignment judul dan nilai
  const titleTextAlignClass = titleAlign === 'center' ? 'text-center' : 'text-left';
  const valueHorizontalAlignClass = valueAlign === 'center' ? 'justify-center' : 'justify-start';
  const valueTextAlignClass = valueAlign === 'center' ? 'text-center' : 'text-left';

  return (
    // 3. Menggabungkan className tanpa 'cn', menggunakan template literal
    <Card className={`flex flex-col h-full p-4 ${className || ''}`}>

      {/* Judul: Menerapkan alignment-nya sendiri */}
      <h4 className={`text-sm font-medium text-slate-500 ${titleTextAlignClass}`}>
        {title}
      </h4>

      {/* Wrapper Nilai: Menggunakan alignment horizontal-nya sendiri */}
      <div className={`flex-grow flex items-center ${valueHorizontalAlignClass}`}>

        {/* Nilai: Menerapkan alignment teks-nya sendiri */}
        <p className={`text-3xl font-bold ${valueTextAlignClass} ${valueColor || 'text-slate-800'}`}>
          {value}
          {detail && <span className="text-slate-400"> / {detail}</span>}
        </p>
      </div>
    </Card>
  );
}