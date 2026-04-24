interface StatsCardProps {
  title: React.ReactNode | string;
  value: React.ReactNode | number;
  icon: React.ReactNode;
  gradient: string;
  percentage: React.ReactNode | string;
}

const StatsCard: React.FC<StatsCardProps> = (props) => {
  const {
    title,
    value,
    icon,
    gradient = "",
    percentage
  } = props;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${gradient} p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">
        <div className="text-white">
          <p className="text-sm font-medium opacity-90 mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold mb-1">
            {value}
          </h3>
          {percentage &&
            <p className="text-xs opacity-80">
              {percentage}
            </p>}
        </div>
        <div className="text-white text-4xl opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
