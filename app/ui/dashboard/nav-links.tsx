"use client"
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCarSide, FaGasPump } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { BiSolidAmbulance } from "react-icons/bi";
import { TbAlarmAverage } from "react-icons/tb";


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  // {
  //   name: 'Invoices',
  //   href: '/dashboard/invoices',
  //   icon: DocumentDuplicateIcon,
  // },
  // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon},
  { name: 'Vehicle', href: '/dashboard/vehicle', icon: BiSolidAmbulance },
  { name: 'Movements', href: '/dashboard/movement', icon: FaCarSide },
  { name: 'Fuel', href: '/dashboard/fuel', icon: FaGasPump },
  { name: 'Maintenance', href: '/dashboard/maintenance', icon: GiAutoRepair },
  { name: 'Average', href: '/dashboard/average', icon: TbAlarmAverage },
];



export default function NavLinks() {
  const pathname =usePathname()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-1 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
            ${pathname === link.href ? 'bg-sky-200 text-blue-600' : ''}
            `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
