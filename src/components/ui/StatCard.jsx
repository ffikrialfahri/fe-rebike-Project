import Card from "./Card";

export default function StatCard({
  title,
  value,
  detail,
  valueColor = "text-text-dark",
}) {
  return (
    <Card>
      <h4 className="text-text-light text-sm">{title}</h4>
      <p className={`text-3xl font-bold mt-2 ${valueColor}`}>
        {value}
        {detail && <span className="text-slate-400 text-3xl"> / {detail}</span>}
      </p>
    </Card>
  );
}
