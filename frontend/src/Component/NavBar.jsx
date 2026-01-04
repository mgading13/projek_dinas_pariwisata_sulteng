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
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Logo from "../assets/Logo-Sulteng.png";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [desaUnggulan, setDesaUnggulan] = useState([]);
  const [desaWisata, setDesaWisata] = useState([]);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/desaWisata/");
        const data = res.data;

        setDesaUnggulan(data.filter((d) => d.jenisDesa === "DESA_UNGGULAN"));
        setDesaWisata(data.filter((d) => d.jenisDesa === "DESA_WISATA"));
      } catch (error) {
        console.error("Error fetching desa:", error);
      }
    };

    fetchData();
  }, []);

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
                    {t('nav_beranda')}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Wisata Unggulan */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-transparent hover:text-gray-300 text-lg">
                {t('nav_wisata_unggulan')}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white text-black p-4 rounded-md shadow-lg">
                  <ul className="space-y-2 w-[200px]">
                    {desaUnggulan.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={`/desa/${item.namaDesa
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {item.namaDesa}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Desa Wisata */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-transparent hover:text-gray-300 text-lg">
                {t('nav_desa_wisata')}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white text-black p-4 rounded-md shadow-lg">
                  <ul className="grid grid-cols-2 gap-2 w-[350px]">
                    {desaWisata.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={`/desa/${item.namaDesa
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {item.namaDesa}
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
                    {t('nav_atraksi')}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/paket-wisata"
                    className="font-semibold hover:text-gray-300 !text-lg"
                  >
                    {t('nav_paket_wisata')}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/kuliner"
                    className="font-semibold hover:text-gray-300 !text-lg"
                  >
                    {t('nav_kuliner')}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/hotel"
                    className="font-semibold hover:text-gray-300 !text-lg"
                  >
                    {t('nav_hotel')}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-transparent hover:text-gray-300 text-lg border border-white/20 ml-4 rounded-full px-4">
                  {i18n.language.toUpperCase()}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white text-black p-2 rounded-md shadow-lg">
                  <ul className="flex flex-col w-[120px]">
                    <li>
                      <button 
                        onClick={() => changeLanguage('id')}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2"
                      >
                        🇮🇩 Indonesia
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => changeLanguage('en')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2"
                      >
                        🇺🇸 English
                      </button>
                    </li>
                  </ul>
                </NavigationMenuContent>
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
                  {t('nav_beranda')}
                </Link>

                {/* WISATA UNGGULAN */}
                <Collapsible>
                  <CollapsibleTrigger className="flex justify-between w-full">
                  {t('nav_wisata_unggulan')}
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 mt-2 space-y-1 text-gray-300 flex flex-col">
                    {desaUnggulan.map((item) => (
                      <Link
                        to={`/desa/${item.namaDesa
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {item.namaDesa}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* DESA WISATA */}
                <Collapsible>
                  <CollapsibleTrigger className="flex justify-between w-full">
                  {t('nav_desa_wisata')}
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 mt-2 space-y-1 text-gray-300 flex flex-col">
                    {desaWisata.map((item) => (
                      <Link
                        to={`/desa/${item.namaDesa
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {item.namaDesa}
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
                  {t('nav_atraksi')}
                </Link>

                <Link to="/paket-wisata" onClick={() => setDrawerOpen(false)}>
                {t('nav_paket_wisata')}
                </Link>
                <Link to="/kuliner" onClick={() => setDrawerOpen(false)}>
                {t('nav_kuliner')}
                </Link>
                <Link to="/hotel" onClick={() => setDrawerOpen(false)}>
                {t('nav_hotel')}
                </Link>
              </nav>
              {/* Cari di bagian bawah nav di dalam SheetContent */}
              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-2">{i18n.language === 'id' ? 'Pilih Bahasa' : 'Select Language'}</p>
                <div className="flex gap-2">
                  <Button 
                    variant={i18n.language === 'id' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => changeLanguage('id')}
                    className="flex-1 text-black"
                  >
                    <span>🇮🇩</span> ID
                  </Button>
                  <Button 
                    variant={i18n.language === 'en' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => changeLanguage('en')}
                    className="flex-1 text-black"
                  >
                    <span>🇺🇸</span> EN
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
