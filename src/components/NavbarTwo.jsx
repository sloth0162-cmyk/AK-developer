import React from "react";
import { NavLink } from "react-router-dom";
import {
    FiBookOpen,
    FiFileText,
    FiHome,
    FiMapPin,
} from "react-icons/fi";

const navItems = [
    { path: "/property", label: "Property", icon: FiHome },
    { path: "/news", label: "News", icon: FiFileText },
    { path: "/blogpage", label: "Blogs", icon: FiBookOpen },
    { path: "/connect", label: "Site Visit", icon: FiMapPin },
];

function NavbarTwo() {
    return (
        <section className="relative w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* ================= DESKTOP ================= */}
                <nav
                    aria-label="Property navigation"
                    className="hidden md:flex items-center justify-center py-3"
                >
                    <div className="inline-flex items-center gap-1 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm shadow-gray-200/60">

                        {navItems.map(({ path, label, icon: Icon }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `group relative flex items-center gap-2 rounded-xl
                                    px-5 py-2.5 text-sm lg:text-[15px] font-medium
                                    transition-all duration-200 ease-out active:scale-[0.97]
                                    ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600 shadow-sm"
                                            : "text-gray-600 hover:-translate-y-0.5 hover:bg-gray-50 hover:text-blue-600"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            className={`text-[18px] transition-transform duration-200 ${
                                                isActive
                                                    ? "scale-105"
                                                    : "group-hover:scale-110"
                                            }`}
                                        />

                                        <span>{label}</span>

                                        {/* Active indicator */}
                                        {isActive && (
                                            <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}

                    </div>
                </nav>

                {/* ================= MOBILE ================= */}
                <nav
                    aria-label="Property navigation mobile"
                    className="md:hidden py-2.5"
                >
                    <div className="grid grid-cols-4 gap-1.5 rounded-2xl border border-gray-200 bg-gray-50/80 p-1.5 shadow-sm">

                        {navItems.map(({ path, label, icon: Icon }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `group flex min-w-0 flex-col items-center justify-center
                                    gap-1 rounded-xl px-1 py-2.5 text-[11px] font-medium
                                    transition-all duration-200 active:scale-95
                                    ${
                                        isActive
                                            ? "bg-white text-blue-600 shadow-sm ring-1 ring-blue-100"
                                            : "text-gray-500 hover:bg-white hover:text-blue-600"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            className={`text-[18px] transition-transform duration-200 ${
                                                isActive
                                                    ? "scale-105"
                                                    : "group-hover:scale-110"
                                            }`}
                                        />

                                        <span className="truncate max-w-full">
                                            {label}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        ))}

                    </div>
                </nav>

            </div>
        </section>
    );
}

export default NavbarTwo;