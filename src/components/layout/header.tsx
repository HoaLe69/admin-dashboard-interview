import Logo from "@/components/mrp-logo"
import { NAVS } from "@/lib/const"
import Link from "next/link"
import {
  SearchIcon,
  MessageIcon,
  QuestionMarkIcon,
  ChevronDownIcon,
  BellIcon,
  SettingIcon,
  ConvertShapeIcon,
} from "../ui/icons"
import { Menu } from "lucide-react"

export default function Header() {
  return (
    <div className="lg:px-12 px-4  bg-new-blue h-header-height">
      <header className="h-full flex items-center">
        <Logo />
        <MainNav />
        <div className="ml-auto hidden lg:flex items-center">
          <HeaderSearch />
          <ActionsMenu />
        </div>
        <span className="text-white ml-auto lg:hidden">
          <Menu />
        </span>
      </header>
    </div>
  )
}

function ActionsMenu() {
  return (
    <div className="flex items-center ml-6">
      <div className="flex items-center py-1 gap-4">
        <SettingIcon />
        <ConvertShapeIcon />
        <MessageIcon />
        <BellIcon />
        <QuestionMarkIcon />
      </div>
      <div className="flex items-center ml-6">
        {/*   replace img */}
        <div className="bg-green-400 w-10 h-10 rounded-full mr-2" />
        <ChevronDownIcon />
      </div>
    </div>
  )
}

function HeaderSearch() {
  return (
    <div className="w-[200px] rounded-md flex items-center bg-white/20 px-2">
      <span className="flex-1">
        <SearchIcon />
      </span>
      <input
        name="search"
        id="search"
        placeholder="Tìm Kiếm"
        className="outline-none border-none px-2 py-1 text-white"
      />
    </div>
  )
}

function MainNav() {
  return (
    <nav className="lg:flex items-center text-white ml-6 hidden flex-1">
      {NAVS.map(nav => (
        <NavItemLink key={nav.title} href={nav.href} title={nav.title} />
      ))}
    </nav>
  )
}

interface NavItemLinkProps {
  href: string
  title: string
}

function NavItemLink({ href, title }: NavItemLinkProps) {
  return (
    <Link
      href={href}
      className="inline-block py-1 px-2 text-sm font-medium transition-colors hover:text-white/80 text-neutral-01"
    >
      {title}
    </Link>
  )
}
