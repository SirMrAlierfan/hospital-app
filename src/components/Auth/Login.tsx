import { useState } from "react";
import type { JSX, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { ZodError } from "zod";
import Input from "../baseComponents/input";
import Button from "../baseComponents/button";
import { loginSchema, type LoginFields } from "./utils/authValidation";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import i18n from "@/i18n";
import { authApiHandler } from "./utils/authApiHandler";
import { useNavigate } from "react-router-dom";


const Login = (): JSX.Element => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<LoginFields>({ email: "", password: "" });
    const [errors, setErrors] = useState<Partial<LoginFields>>({});
    const loginStore = useAuthStore((state) => state.login);
    const nav = useNavigate()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            loginSchema.parse(formData);
            const response = await authApiHandler({ method: "post", path: "/login", data: formData })
            loginStore(response.data)
            nav({ pathname: "/profile" })
            setErrors({});

        } catch (err) {
            if (err instanceof ZodError) {
                const formattedErrors: Partial<LoginFields> = {};
                err.issues.forEach((error) => {
                    if (error.path[0]) {
                        formattedErrors[error.path[0] as keyof LoginFields] = error.message;
                    }
                });
                setErrors(formattedErrors);
            } else if (axios.isAxiosError(err)) {
                const serverMessage = err.response?.data?.message || "An error occurred";
                console.error("Server Error:", serverMessage);
            } else {
                console.error("Unexpected Error:", err);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4 transition-colors duration-300">
            <div className="w-full max-w-md p-8 bg-white dark:bg-[#313131] rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-2">
                        {i18n.language === "fa" ? "ورود به حساب " : "login to account"}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <Input
                        label={t("auth.register.form.email.label")}
                        type="email"
                        value={formData.email}
                        error={errors.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t("auth.register.form.email.placeholder")}
                    />

                    <Input
                        label={t("auth.register.form.password.label")}
                        type="password"
                        value={formData.password}
                        error={errors.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                    />

                    <Button type="submit" className="w-full mt-2">
                        {i18n.language === "fa" ? "ورود" : "login"}
                    </Button>
                    
                        <span className="m-auto text-sm text-gray-500 font-medium">
                            
                            {i18n.language === "fa" ? "اکانت ندارید؟ " : "doesnt have an account?"}
                            <a href="/signUp" className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-semibold ml-1">
                               {i18n.language === "fa" ? "ثبت نام " : "signUp"}
                            </a>
                        </span>
                    


                </form>
            </div>
        </div>
    );

};

export default Login;