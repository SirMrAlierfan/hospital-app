import Button from '@/components/baseComponents/button';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: "fa" | "en") => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative group">
            <Button className="flex items-center gap-3 px-4 py-2">
                <div className="w-6 h-4 rounded-sm overflow-hidden ring-1 ring-white/20">
                    <img
                        src={i18n.language === "fa" ? "https://flagcdn.com/w40/ir.png" : "https://flagcdn.com/w40/us.png"}
                        alt="EN"
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className="text-sm uppercase"> {i18n.language === "fa" ? "فارسی" : "ENGLISH"} </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </Button>
            <div className={"absolute right-0 mt-2 w-32 rounded-xl bg-[#3e3e3e] border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"}>
                <Button
                    className="rounded-t-xl w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-200 hover:bg-teal-700 hover:text-white rounded-none justify-start"
                    onClick={() => { changeLanguage("fa") }}
                >
                    <img src="https://flagcdn.com/w40/ir.png" className="w-5 h-3.5 rounded-sm" alt="FA" />
                    فارسی
                </Button>

                <Button
                    className="rounded-b-xl w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-200 hover:bg-teal-700 hover:text-white rounded-none justify-start"
                    onClick={() => { changeLanguage("en") }}
                >
                    <img src="https://flagcdn.com/w40/us.png" className="w-5 h-3.5 rounded-sm" alt="EN" />
                    English
                </Button>
            </div>
        </div>
    );
}