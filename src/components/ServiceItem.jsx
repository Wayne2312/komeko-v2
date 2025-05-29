export default function ServiceItem({ number, title }) {
    return (
      <div>
        <p className="text-xs text-gray-400">{number}</p>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    );
  }
  