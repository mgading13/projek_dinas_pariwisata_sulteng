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

function App() {
  return (
    <div>
      <NavigationMenu className="gap-10 absolute top-0 left-0 w-full flex items-center justify-between p-4 text-white z-50 bg-transparent">
        <NavigationMenuList className="gap-10 items-center">
          <NavigationMenuItem>
            <img src={Logo} alt="Logo Dinas Pariwisata" width={50} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="font-semibold">
              <Link href="/docs">Beranda</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-white hover:text-gray-300 hover:bg-transparent">
              Wisata Unggulan
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4 p-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Lore Lindu</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Geopark Poso</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
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
                  <NavigationMenuLink asChild>
                    <Link to="#">Luk Panenteng</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Towale</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Karosondaya</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Pulo Dua</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Bonebaru</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Pokekea</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Malangga</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Mendaan</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Labuan Belanda</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Bente</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Ungkea</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">Taman Anggrek</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="font-semibold">
              <Link href="/docs">Atraksi</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuIndicator />
        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  );
}

export default App;
