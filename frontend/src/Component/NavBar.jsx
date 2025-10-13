import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo-Sulteng.png";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center p-10 gap-10 h-16 text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-8">
              {/* Beranda */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  onClick={() => scrollToSection("home")}
                >
                  <Link
                    to="/"
                    className="font-semibold hover:text-gray-300 transition-colors"
                  >
                    Beranda
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Wisata Unggulan */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white font-semibold hover:text-gray-300 hover:bg-transparent">
                  Wisata Unggulan
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white text-black rounded-md p-4 shadow-lg">
                  <ul className="space-y-2 w-[200px]">
                    <li>
                      <Link
                        to="/lore-lindu"
                        className="block hover:text-blue-600"
                      >
                        Lore Lindu
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/geopark-poso"
                        className="block hover:text-blue-600"
                      >
                        Geopark Poso
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pulau-togean"
                        className="block hover:text-blue-600"
                      >
                        Pulau Togean
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Desa Wisata */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white font-semibold hover:text-gray-300 hover:bg-transparent">
                  Desa Wisata
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white text-black rounded-md p-4 shadow-lg">
                  <ul className="grid grid-cols-2 gap-2 w-[400px]">
                    {[
                      "Luk Panenteng",
                      "Towale",
                      "Karosondaya",
                      "Pulo Dua",
                      "Bonebaru",
                      "Pokekea",
                      "Malangga",
                      "Mendaan",
                      "Labuan Belanda",
                      "Bente",
                      "Ungkea",
                      "Taman Anggrek",
                    ].map((nama) => (
                      <li key={nama}>
                        <Link
                          to={`/${nama.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block hover:text-blue-600"
                        >
                          {nama}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Atraksi */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  onClick={() => scrollToSection("atraksi")}
                >
                  <Link
                    to="/ "
                    className="font-semibold hover:text-gray-300 transition-colors"
                  >
                    Atraksi
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Paket Wisata */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/paket-wisata"
                    className="font-semibold hover:text-gray-300 transition-colors"
                  >
                    Paket Wisata
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black text-white p-4">
              <nav className="mt-10 flex flex-col space-y-4 text-lg font-semibold">
                <Link
                  to="/"
                  onClick={() => {
                    scrollToSection("home");
                    setOpen(false);
                  }}
                >
                  Beranda
                </Link>

                {/* Wisata Unggulan (Dropdown) */}
                <Collapsible>
                  <CollapsibleTrigger className="flex justify-between items-center w-full text-left">
                    <span>Wisata Unggulan</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform data-[state=open]:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 mt-2 space-y-1 text-gray-300 flex flex-col">
                    <Link
                      to="/wisata/lore-lindu"
                      onClick={() => setOpen(false)}
                    >
                      Lore Lindu
                    </Link>
                    <Link
                      to="/wisata/geopark-poso"
                      onClick={() => setOpen(false)}
                    >
                      Geopark Poso
                    </Link>
                    <Link
                      to="/wisata/pulau-togean"
                      onClick={() => setOpen(false)}
                    >
                      Pulau Togean
                    </Link>
                  </CollapsibleContent>
                </Collapsible>

                {/* Desa Wisata (Dropdown) */}
                <Collapsible>
                  <CollapsibleTrigger className="flex justify-between items-center w-full text-left">
                    <span>Desa Wisata</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform data-[state=open]:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 mt-2 space-y-1 text-gray-300 flex flex-col">
                    {[
                      "Luk Panenteng",
                      "Towale",
                      "Karosondaya",
                      "Pulo Dua",
                      "Bonebaru",
                      "Pokekea",
                      "Malangga",
                      "Mendaan",
                      "Labuan Belanda",
                      "Bente",
                      "Ungkea",
                      "Taman Anggrek",
                    ].map((nama) => (
                      <Link
                        key={nama}
                        to={`/${nama.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => setOpen(false)}
                      >
                        {nama}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                <Link
                  to="/"
                  onClick={() => {
                    scrollToSection("atraksi");
                    setOpen(false);
                  }}
                >
                  Atraksi
                </Link>
                <Link to="/paket-wisata" onClick={() => setOpen(false)}>
                  Paket Wisata
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
