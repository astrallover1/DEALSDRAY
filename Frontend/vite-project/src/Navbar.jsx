import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { useLocation } from "react-router-dom";


const navigation = [
  { name: "Home", href: "/dashboard"},
  { name: "Empoloyee-List", href:'employ'},
  { name: "Create-Employee", href: "/create"},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {

  const location = useLocation();
  const username = location.state?.username; // Access the passed username
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 500 500"
                className="h-9 w-auto"
              >
                <g fill="none" stroke="#FFFFFF" stroke-width="20">
                  <path d="M150,100 L250,200 L350,100 L250,0 Z" />
                  <path d="M150,200 L250,300 L350,200 L250,100 Z" />
                </g>
                <text
                  x="50%"
                  y="75%"
                  font-size="80"
                  font-family="Arial, sans-serif"
                  text-anchor="middle"
                  fill="white"
                >
                  COMPANY
                </text>
                <text
                  x="50%"
                  y="85%"
                  font-size="30"
                  font-family="Arial, sans-serif"
                  text-anchor="middle"
                  fill="white"
                >
                  TAGLINE GOES HERE
                </text>
              </svg>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
             
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <span
          className="text-white"
           >{username}- <a href="/">Logout</a></span>


          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
