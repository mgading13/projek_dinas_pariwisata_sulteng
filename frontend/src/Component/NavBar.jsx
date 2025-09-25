import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useState, useEffect } from "react";


function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-b from-black/40 to-transparent shadow-md"
          : "bg-transparent"  
      }`}
    >
      <NavigationMenu className="flex items-center justify-between p-4 text-white">
        <NavigationMenuList className="gap-10 items-center">
          <NavigationMenuItem>
            <img src={Logo} alt="Logo Dinas Pariwisata" width={50} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="font-semibold" onClick={() => scrollToSection("home")}>
              <Link to="/">Beranda</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-white hover:text-gray-300 hover:bg-transparent">
              Wisata Unggulan
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4 p-2">
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="#">Lore Lindu</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="#">Geopark Poso</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="#">Pulau Togean</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="gap-10 items-center">
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="bg-transparent text-white hover:text-gray-300 hover:bg-transparent">
              Desa Wisata
            </NavigationMenuTrigger>
            <NavigationMenuContent className="relative left-1/2 -translate-x-1/2 p-4 rounded-md shadow-lg">
              <ul className="grid grid-cols-3 gap-4 p-2 w-[600px]">
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/luk-panenteng">Luk Panenteng</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/towale">Towale</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/karosondaya">Karosondaya</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/pulo-dua">Pulo Dua</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/bonebaru">Bonebaru</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/pokekea">Pokekea</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/malangga">Malangga</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/mendaan">Mendaan</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/labuan-belanda">Labuan Belanda</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/bente">Bente</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/ungkea">Ungkea</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-black hover:text-white"
                  >
                    <Link to="/taman-anggrek">Taman Anggrek</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="font-semibold" onClick={() => scrollToSection("atraksi")}>
              <Link to="/">Atraksi</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuIndicator />
        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  );
}

export default NavBar;
