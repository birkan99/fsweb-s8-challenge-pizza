
export default function NavItem({ icon, label, href }) {
  return (
    <div className="flex items-center space-x-2">
      <img src={icon} alt={label} className="w-6 h-6" />
      <a
        href={href}
        className="font-me rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      >
        {label}
      </a>
    </div>
  );
}
