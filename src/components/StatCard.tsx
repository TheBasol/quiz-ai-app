import { SvgIcons } from "./icons/Icons";

interface StatCardProps {
  iconName: keyof typeof SvgIcons;
  label: string;
  value: string | number;
}

export const StatCard = ({ iconName, label, value }: StatCardProps) => {

  const icon = SvgIcons[iconName];

  return (
    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-600/20 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-white text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};