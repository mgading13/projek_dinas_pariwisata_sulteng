import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Logo from "../assets/Logo-Sulteng.png";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const langSuffix = i18n.language === "en" ? "en" : "id";

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
                    {t("nav_beranda")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Wisata Unggulan */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    onClick={() => scrollToSection("wisata-unggulan")}
                    className="font-semibold hover:text-gray-300 !text-lg"
                  >
                    {t("nav_wisata_unggulan")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Desa Wisata */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    onClick={() => scrollToSection("desa-wisata")}
                    className="font-semibold hover:text-gray-300 !text-lg"
                  >
                    {t("nav_desa_wisata")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    onClick={() => scrollToSection("atraksi")}
                    className="font-semibold hover:text-gray-300 !text-lg"
                  >
                    {t("nav_atraksi")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/paket-wisata"
                    className="font-semibold hover:text-gray-300 !text-lg"
                  >
                    {t("nav_paket_wisata")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/kuliner"
                    className="font-semibold hover:text-gray-300 !text-lg"
                  >
                    {t("nav_kuliner")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/hotel"
                    className="font-semibold hover:text-gray-300 !text-lg"
                  >
                    {t("nav_hotel")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="
        flex items-center gap-2
        px-4 py-2
        rounded-full
        border border-white/20
        text-white text-lg font-semibold
        hover:text-gray-300
        focus:outline-none
      "
                  >
                    {i18n.language.toUpperCase()}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  side="bottom"
                  className="w-[140px] bg-white text-black rounded-md shadow-lg"
                >
                  <DropdownMenuItem
                    onClick={() => changeLanguage("id")}
                    className={`flex gap-2 cursor-pointer ${
                      i18n.language === "id" ? "bg-gray-100 font-semibold" : ""
                    }`}
                  >
                    🇮🇩 Indonesia
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => changeLanguage("en")}
                    className={`flex gap-2 cursor-pointer ${
                      i18n.language === "en" ? "bg-gray-100 font-semibold" : ""
                    }`}
                  >
                    🇮🇩 English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                  {t("nav_beranda")}
                </Link>

                {/* WISATA UNGGULAN */}
                <Link
                  to="/"
                  onClick={() => {
                    scrollToSection("wisata-unggulan");
                    setDrawerOpen(false);
                  }}
                >
                  {t("nav_wisata_unggulan")}
                </Link>

                {/* DESA WISATA */}
                <Link
                  to="/"
                  onClick={() => {
                    scrollToSection("desa-wisata");
                    setDrawerOpen(false);
                  }}
                >
                  {t("nav_desa_wisata")}
                </Link>

                <Link
                  to="/"
                  onClick={() => {
                    scrollToSection("atraksi");
                    setDrawerOpen(false);
                  }}
                >
                  {t("nav_atraksi")}
                </Link>

                <Link to="/paket-wisata" onClick={() => setDrawerOpen(false)}>
                  {t("nav_paket_wisata")}
                </Link>
                <Link to="/kuliner" onClick={() => setDrawerOpen(false)}>
                  {t("nav_kuliner")}
                </Link>
                <Link to="/hotel" onClick={() => setDrawerOpen(false)}>
                  {t("nav_hotel")}
                </Link>
              </nav>
              {/* Cari di bagian bawah nav di dalam SheetContent */}
              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-2">
                  {i18n.language === "id" ? "Pilih Bahasa" : "Select Language"}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant={i18n.language === "id" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeLanguage("id")}
                    className="flex-1 text-black"
                  >
                    <span>🇮🇩</span> ID
                  </Button>
                  <Button
                    variant={i18n.language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeLanguage("en")}
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
