import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/images/logo.png";
import AK from "../assets/images/AK.png";
import { useNavigate } from "react-router-dom";
import { IoMdNotifications, IoMdHome, IoMdInformationCircle } from "react-icons/io";
import "./component.css";


function Profileview({ setOpenProfile }) {
    return (
        <ul className="absolute right-0 top-full mt-2 w-48 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-[100] transform origin-top-right transition-all">
            <li
                onClick={() => setOpenProfile(false)}
                className="px-5 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-sm font-semibold text-gray-700"
            >
                Profile
            </li>
            <li
                onClick={() => setOpenProfile(false)}
                className="px-5 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-sm font-semibold text-gray-700 border-t border-gray-50 flex items-center"
            >
                
            </li>
            <li
                onClick={() => setOpenProfile(false)}
                className="px-5 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-sm font-semibold text-gray-700 border-t border-gray-50"
            >
                Settings
            </li>
        </ul>
    );
}

function Navbar() {
    const navigate = useNavigate();
    const [openProfile, setOpenProfile] = useState(false);
    const desktopProfileRef = useRef(null);
    const mobileProfileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                desktopProfileRef.current && !desktopProfileRef.current.contains(event.target) &&
                mobileProfileRef.current && !mobileProfileRef.current.contains(event.target)
            ) {
                setOpenProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* ================= DESKTOP NAVBAR ================= */}
            <header className="hidden md:block sticky top-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 z-50">
                <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 ">
                    {/* Logo */}
                    <div
                        className="cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <img src={AK} alt="AK Developer Logo" className="w-40 object-contain " />
                    </div>

                    {/* Links */}
                    <ul className="flex items-center gap-8">
                        <li
                            className="relative cursor-pointer text-gray-600 font-medium hover:text-blue-600 transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
                            onClick={() => navigate("/")}
                        >
                            Home
                        </li>
                        <li className="relative cursor-pointer text-gray-600 font-medium hover:text-blue-600 transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">
                            About
                        </li>

                        <IoMdNotifications className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />

                        {/* Profile */}
                        <li className="relative flex items-center" ref={desktopProfileRef}>
                            <div
                                className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md cursor-pointer hover:shadow-lg transition-all"
                                onClick={() => setOpenProfile((p) => !p)}
                            />
                            {openProfile && <Profileview setOpenProfile={setOpenProfile} />}
                        </li>
                    </ul>
                </nav>
            </header>

            {/* ================= MOBILE TOP NAVBAR ================= */}
            <header className="md:hidden fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 z-50 p-3 transition-all">
                <nav className="relative flex items-center justify-between px-4 py-2">
                    {/* Empty space for centering */}
                    <div className="w-10" />

                    {/* Center Logo */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 cursor-pointer top-1"
                        onClick={() => navigate("/")}
                    >
                        <div className="w-36 h-18 overflow-hidden flex items-center justify-center">
                            <img
                                src={AK}
                                alt="AK Developer Logo"
                                className="w-full h-full object-center
                                 scale-140"
                            />
                        </div>
                    </div>


                    {/* Profile */}
                    <div className="relative flex items-center" ref={mobileProfileRef}>
                        <div
                            className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md cursor-pointer"
                            onClick={() => setOpenProfile((p) => !p)}
                        />
                        {openProfile && <Profileview setOpenProfile={setOpenProfile} />}
                    </div>
                </nav>
            </header>

            {/* ================= MOBILE BOTTOM BAR ================= */}
            <div className="md:hidden fixed bottom-0 w-full bg-white border-t shadow-inner z-50">
                <ul className="flex justify-around py-2">
                    <li
                        className="flex flex-col items-center text-sm cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <IoMdHome className="text-xl" />
                        Home
                    </li>

                    <li
                        className="flex flex-col items-center text-sm cursor-pointer"
                        onClick={() => navigate("/about")}
                    >
                        <IoMdInformationCircle className="text-xl" />
                        About
                    </li>
                </ul>
            </div>

            {/* Spacer so content not hidden behind bars */}
            <div className="md:hidden h-24" />
        </>
    );
}

export default Navbar;
