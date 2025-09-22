import HeroBanner from "./HeroBanner";
import NavItem from "./NavItem";
import homeBanner from "../../images/iteration-1-images/home-banner.png";
import Card from "./Card";
import MenuSection from "./MenuSection";
import CardContainer from "./cardDontainer";
const navItems = [
  { icon: "/images/iteration-2-images/icons/1.svg", label: "YENİ! Kore", href: "/dashboard" },
  { icon: "/images/iteration-2-images/icons/2.svg", label: "Pizza", href: "/team" },
  { icon: "/images/iteration-2-images/icons/3.svg", label: "Burger", href: "/projects" },
  { icon: "/images/iteration-2-images/icons/4.svg", label: "Kızartmalar", href: "/reports" },
  { icon: "/images/iteration-2-images/icons/5.svg", label: "Fast food", href: "/reports" },
  { icon: "/images/iteration-2-images/icons/6.svg", label: "Gazlı İçecek", href: "/reports" },
];

export default function Home() {
  return (
    <div>
      <HeroBanner bannerImage={homeBanner} />

      <div className="w-full relative overflow-x-hidden bg-white py-4">
        <nav className="flex justify-center flex-wrap gap-10">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
            />
          ))}
        </nav>
      </div>
      <Card></Card>
      <MenuSection></MenuSection>
      <CardContainer />

    </div>
  );
}
