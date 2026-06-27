import { useTranslation } from "react-i18next";


const HomePage=()=>{
    const { t } = useTranslation();
    return(<>
    <h1>
        {t("welcome")}
    </h1>
    <p>
        {t("description")}
    </p>
    </>)
}
export default HomePage