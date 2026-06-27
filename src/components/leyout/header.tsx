import { useThemeStore } from "@/store/themeStore";
import Button from "../baseComponents/button";


const Header = () => {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <>
            <header className="p-5 dark:bg-[#313131]">
                <Button  {...{ Text: theme === 'light' ? '  تاریک' : '  روشن', onClick() { toggleTheme() } }} />
            </header>
        </>
    )
}
export default Header