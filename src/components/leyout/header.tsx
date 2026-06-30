import { useState } from "react";
import { useThemeStore } from "@/store/themeStore";
import Button from "../baseComponents/button";
import { LanguageSwitcher } from "./header/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import ThemeTogglerUi from "./header/themeToggler";

const Header = () => {
    const { theme, toggleTheme } = useThemeStore();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);


    const navItems = [
        { path: "/home", label: t("home") },
        { path: "/reserve", label: t("reserve") },
        { path: "/specialties", label: t("Specialties") },
    ];

    return (
        <header className="px-6 md:px-24 py-5 bg-white dark:bg-[#313131] border-b flex items-center justify-between relative z-50 transition-colors duration-300">

            <a href="/" className="text-xl font-bold text-teal-600 dark:text-teal-400">
                logo
            </a>

            <nav className="hidden md:block">
                <ul className="flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <a
                                href={item.path}
                                className="relative group py-1 transition-colors duration-300 hover:text-teal-600 dark:hover:text-teal-400"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 dark:bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="hidden md:flex items-center gap-5">
                <Button
                    onClick={() => console.log("Auth Clicked")}
                    className="px-5 py-2 text-sm rounded-full shadow-teal-500/20 hover:shadow-teal-500/40 bg-teal-600 hover:bg-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-900 dark:font-bold"
                >
                    <a href="/login">{t("login")}</a>
                </Button>

                <Button onClick={toggleTheme} className="p-2 rounded-lg">
                     <ThemeTogglerUi condition={theme==="light"}/>
                </Button>

                <LanguageSwitcher />
            </div>


            <button
                onClick={() => setIsOpen(!isOpen)}
                className="block md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
                aria-label="Toggle Menu"
            >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.83-4.828 4.83a1 1 0 01-1.414-1.414l4.829-4.83-4.829-4.83a1 1 0 011.414-1.414l4.828 4.83 4.829-4.83a1 1 0 011.414 1.414l-4.83 4.83 4.83 4.83z" />
                    ) : (
                        <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
                    )}
                </svg>
            </button>

            <div
                className={`absolute top-full left-0 w-full bg-white dark:bg-[#313131] border-b shadow-lg p-6 flex flex-col gap-6 md:hidden transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
                    }`}
            >
                <nav>
                    <ul className="flex flex-col gap-4 text-base font-medium text-gray-700 dark:text-gray-300">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <a
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2 hover:text-teal-600 dark:hover:text-teal-400"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <hr className="border-gray-200 dark:border-gray-700" />


                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t("toggle_theme")}</span>
                        <Button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                            <ThemeTogglerUi condition={theme==="light"}/>
                        </Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Language</span>
                        <LanguageSwitcher />
                    </div>

                    <Button
                        onClick={() => { console.log("Auth Clicked"); setIsOpen(false); }}
                        className="w-full py-3 text-center text-sm rounded-xl bg-teal-600 text-white font-bold"
                    >
                        {t("login")}
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;