import React, { useState, useEffect, useRef } from "react";
import AK from "../assets/images/AK.png";
import { useNavigate, useLocation } from "react-router-dom";
import {
    IoMdNotifications,
    IoMdHome,
    IoMdInformationCircle,
    IoMdPerson,
    IoMdSettings,
    IoMdLogOut,
    IoMdArrowDropdown,
    IoMdLogIn,
    IoMdPersonAdd,
} from "react-icons/io";
import "./component.css";

/* ================= PROFILE DROPDOWN ================= */
function Profileview({ open, setOpenProfile, user }) {
    const navigate = useNavigate();
    const isSignedIn = Boolean(user);

    const goTo = (path) => {
        setOpenProfile(false);
        navigate(path);
    };

    return (
        <div
            className={`absolute right-0 top-full mt-3 w-64 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-[100] origin-top-right transition-all duration-200 ease-out
            ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
        >
            {isSignedIn ? (
                <>
                    {/* Header */}
                    <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
                        <div className="h-11 w-11 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-semibold text-lg shrink-0">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="min-w-0">
                            <p className="text-white font-semibold text-sm truncate">
                                {user.name || "Account"}
                            </p>
                            <p className="text-blue-100 text-xs truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Menu items */}
                    <ul className="py-2">
                        <li
                            onClick={() => goTo("/profile")}
                            className="group flex items-center gap-3 px-5 py-3 hover:bg-blue-50 cursor-pointer transition-colors"
                        >
                            <IoMdPerson className="text-lg text-gray-400 group-hover:text-blue-600 transition-colors" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                My Profile
                            </span>
                        </li>

                        <li
                            onClick={() => goTo("/settings")}
                            className="group flex items-center gap-3 px-5 py-3 hover:bg-blue-50 cursor-pointer transition-colors"
                        >
                            <IoMdSettings className="text-lg text-gray-400 group-hover:text-blue-600 transition-colors" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                Settings
                            </span>
                        </li>

                        <div className="my-1 border-t border-gray-100" />

                        <li
                            onClick={() => {
                                setOpenProfile(false);
                                // call your actual logout handler here
                            }}
                            className="group flex items-center gap-3 px-5 py-3 hover:bg-red-50 cursor-pointer transition-colors"
                        >
                            <IoMdLogOut className="text-lg text-red-400 group-hover:text-red-600 transition-colors" />
                            <span className="text-sm font-medium text-red-500 group-hover:text-red-600 transition-colors">
                                Logout
                            </span>
                        </li>
                    </ul>
                </>
            ) : (
                <>
                    {/* Guest header */}
                    <div className="flex flex-col items-center text-center gap-2 px-5 py-6 bg-gradient-to-r from-gray-50 to-gray-100">
                        <div className="h-12 w-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                            <IoMdPerson className="text-2xl text-gray-400" />
                        </div>
                        <p className="text-sm font-semibold text-gray-800">You're not signed in</p>
                        <p className="text-xs text-gray-500">Sign in to access your profile</p>
                    </div>

                    {/* Auth actions */}
                    <div className="p-3 flex flex-col gap-2">
                        <button
                            onClick={() => goTo("/login")}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            <IoMdLogIn className="text-lg" />
                            Sign In
                        </button>
                        <button
                            onClick={() => goTo("/signup")}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors"
                        >
                            <IoMdPersonAdd className="text-lg" />
                            Create Account
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

/* ================= NAVBAR ================= */
function Navbar({ user }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [openProfile, setOpenProfile] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const desktopProfileRef = useRef(null);
    const mobileProfileRef = useRef(null);
    const isSignedIn = Boolean(user);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedDesktop = desktopProfileRef.current?.contains(event.target);
            const clickedMobile = mobileProfileRef.current?.contains(event.target);
            if (!clickedDesktop && !clickedMobile) {
                setOpenProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ path, label }) => (
        <li
            onClick={() => navigate(path)}
            className={`relative cursor-pointer font-medium text-sm lg:text-base transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300
            ${isActive(path)
                ? "text-blue-600 after:w-full"
                : "text-gray-600 hover:text-blue-600 after:w-0 hover:after:w-full"}`}
        >
            {label}
        </li>
    );

    // Shared avatar so desktop/mobile stay in sync
    const Avatar = ({ size = "h-9 w-9 md:h-10 md:w-10" }) =>
        isSignedIn ? (
            <div className={`${size} rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md cursor-pointer ring-2 ring-transparent group-hover:ring-blue-200 transition-all duration-200 flex items-center justify-center text-white text-sm font-semibold`}>
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
        ) : (
            <div className={`${size} rounded-full bg-gray-100 border border-gray-200 shadow-sm cursor-pointer flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors duration-200`}>
                <IoMdPerson className="text-lg" />
            </div>
        );

    return (
        <>
            {/* ================= DESKTOP NAVBAR ================= */}
            <header
                className={`hidden md:block sticky top-0 z-50 border-b transition-all duration-300
                ${scrolled
                    ? "bg-white/90 backdrop-blur-lg shadow-md border-gray-200"
                    : "bg-white/70 backdrop-blur-md shadow-sm border-gray-100"}`}
            >
                <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 py-2 md:py-3">
                    {/* Logo */}
                    <div
                        className="cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
                        onClick={() => navigate("/")}
                    >
                        <img
                            src={AK}
                            alt="AK Developer Logo"
                            className="w-28 md:w-32 lg:w-36 xl:w-40 object-contain"
                        />
                    </div>

                    {/* Links */}
                    <ul className="flex items-center gap-5 md:gap-6 lg:gap-8">
                        <NavLink path="/" label="Home" />
                        <NavLink path="/about" label="About" />

                        <li className="relative">
                            <IoMdNotifications className="text-xl md:text-2xl text-gray-600 cursor-pointer hover:text-blue-600 transition-all duration-200 hover:scale-110" />
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full" />
                        </li>

                        {/* Profile */}
                        <li className="relative flex items-center" ref={desktopProfileRef}>
                            <button
                                className="flex items-center gap-1.5 group"
                                onClick={() => setOpenProfile((p) => !p)}
                            >
                                <Avatar />
                                <IoMdArrowDropdown
                                    className={`text-gray-500 transition-transform duration-200 ${openProfile ? "rotate-180" : ""}`}
                                />
                            </button>
                            <Profileview open={openProfile} setOpenProfile={setOpenProfile} user={user} />
                        </li>
                    </ul>
                </nav>
            </header>

            {/* ================= MOBILE TOP NAVBAR ================= */}
            <header
                className={`md:hidden fixed top-0 w-full z-50 border-b transition-all duration-300
                ${scrolled ? "bg-white/95 backdrop-blur-lg shadow-md border-gray-200" : "bg-white/90 backdrop-blur-md shadow-sm border-gray-100"}`}
            >
                <nav className="relative flex items-center justify-between px-4 py-2.5 sm:py-3">
                    <div className="w-9 sm:w-10" />

                    <div
                        className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <div className="h-10 sm:h-12 flex items-center justify-center overflow-hidden">
                            <img
                                src={AK}
                                alt="AK Developer Logo"
                                className="h-full w-auto object-contain scale-125 sm:scale-130"
                            />
                        </div>
                    </div>

                    <div className="relative flex items-center" ref={mobileProfileRef}>
                        <div
                            className="active:scale-90 transition-transform duration-150"
                            onClick={() => setOpenProfile((p) => !p)}
                        >
                            <Avatar size="h-9 w-9 sm:h-10 sm:w-10" />
                        </div>
                        <Profileview open={openProfile} setOpenProfile={setOpenProfile} user={user} />
                    </div>
                </nav>
            </header>

            {/* ================= MOBILE BOTTOM BAR ================= */}
            <div className="md:hidden fixed bottom-0 w-full bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
                <ul className="flex justify-around py-2 sm:py-2.5">
                    <li
                        className="flex flex-col items-center gap-0.5 text-xs sm:text-sm cursor-pointer transition-all duration-200 active:scale-90"
                        onClick={() => navigate("/")}
                    >
                        <IoMdHome className={`text-xl sm:text-2xl transition-colors ${isActive("/") ? "text-blue-600" : "text-gray-500"}`} />
                        <span className={isActive("/") ? "text-blue-600 font-semibold" : "text-gray-500"}>Home</span>
                    </li>

                    <li
                        className="flex flex-col items-center gap-0.5 text-xs sm:text-sm cursor-pointer transition-all duration-200 active:scale-90"
                        onClick={() => navigate("/about")}
                    >
                        <IoMdInformationCircle className={`text-xl sm:text-2xl transition-colors ${isActive("/about") ? "text-blue-600" : "text-gray-500"}`} />
                        <span className={isActive("/about") ? "text-blue-600 font-semibold" : "text-gray-500"}>About</span>
                    </li>
                </ul>
            </div>

            {/* Spacer so content isn't hidden behind bars */}
            <div className="md:hidden h-28" />
        </>
    );
}

export default Navbar;