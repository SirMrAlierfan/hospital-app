import { useThemeStore } from "@/store/themeStore";
import Button from "../baseComponents/button";
import { LanguageSwitcher } from "./header/LanguageSwitcher";

const Header = () => {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <header className="px-16 py-5 dark:bg-[#313131] flex items-center gap-5 border-b-2">


            <Button onClick={toggleTheme}>
                {theme === 'dark' ? ' تاریک' : 'روشن'}
            </Button>


           <LanguageSwitcher/>

        </header>
    );
};

export default Header;
    