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
import { Menu, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "../assets/Logo-Sulteng.png";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500
        ${
          isScrolled
            ? "backdrop-blur-xl bg-black/50 shadow-lg"
            : "bg-transparent"
        }
      `}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 text-white">
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-8">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    onClick={() => scrollToSection("home")}
                    className="font-semibold !text-lg hover:text-gray-300"
                  >
                    Beranda
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Wisata Unggulan */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-transparent hover:text-gray-300 text-lg">
                  Wisata Unggulan
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white text-black p-4 rounded-md shadow-lg">
                  <ul className="space-y-2 w-[200px]">
                    <li>
                      <Link to="/lore-lindu">Lore Lindu</Link>
                    </li>
                    <li>
                      <Link to="/geopark-poso">Geopark Poso</Link>
                    </li>
                    <li>
                      <Link to="/pulau-togean">Pulau Togean</Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Desa Wisata */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-transparent hover:text-gray-300 text-lg">
                  Desa Wisata
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white text-black p-4 rounded-md shadow-lg">
                  <ul className="grid grid-cols-2 gap-2 w-[350px]">
                    {[
                      "Anggrek Karunia",
                      "Bente",
                      "Bonebaru",
                      "Karosondaya",
                      "Labuan Belanda",
                      "Luk Panenteng",
                      "Malangga",
                      "Mendaan",
                      "Pokekea",
                      "Pulo Dua",
                      "Towale",
                      "Ungkea",
                    ].map((nama) => (
                      <li key={nama}>
                        <Link
                          to={`/${nama.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {nama}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    onClick={() => scrollToSection("atraksi")}
                    className="font-semibold hover:text-gray-300 !text-lg"
                  >
                    Atraksi
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/paket-wisata"
                    className="font-semibold hover:text-gray-300 !text-lg"
                  >
                    Paket Wisata
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden flex items-center">
          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white z-[1000]"
              >
                {drawerOpen ? (
                  <X className="h-6 w-6 transition-all duration-300" />
                ) : (
                  <Menu className="h-6 w-6 transition-all duration-300" />
                )}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-black/40 backdrop-blur-xl text-white p-6
                w-[75%] max-w-[300px] border-l border-white/10 shadow-2xl z-[9999]"
            >
              <nav className="mt-8 flex flex-col space-y-4 text-lg font-semibold">
                <Link
                  to="/"
                  onClick={() => {
                    scrollToSection("home");
                    setDrawerOpen(false);
                  }}
                >
                  Beranda
                </Link>

                {/* WISATA UNGGULAN */}
                <Collapsible>
                  <CollapsibleTrigger className="flex justify-between w-full">
                    Wisata Unggulan
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 mt-2 space-y-1 text-gray-300 flex flex-col">
                    <Link
                      to="/geopark-poso"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Geopark Poso
                    </Link>
                    <Link to="/lore-lindu" onClick={() => setDrawerOpen(false)}>
                      Lore Lindu
                    </Link>
                    <Link
                      to="/pulau-togean"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Pulau Togean
                    </Link>
                  </CollapsibleContent>
                </Collapsible>

                {/* DESA WISATA */}
                <Collapsible>
                  <CollapsibleTrigger className="flex justify-between w-full">
                    Desa Wisata
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 mt-2 space-y-1 text-gray-300 flex flex-col">
                    {[
                      "Anggrek Karunia",
                      "Bente",
                      "Bonebaru",
                      "Karosondaya",
                      "Labuan Belanda",
                      "Luk Panenteng",
                      "Malangga",
                      "Mendaan",
                      "Pokekea",
                      "Pulo Dua",
                      "Towale",
                      "Ungkea",
                    ].map((nama) => (
                      <Link
                        key={nama}
                        to={`/${nama.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => setDrawerOpen(false)}
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
                    setDrawerOpen(false);
                  }}
                >
                  Atraksi
                </Link>

                <Link to="/paket-wisata" onClick={() => setDrawerOpen(false)}>
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
