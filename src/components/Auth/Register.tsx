import { useState } from "react";
import type { JSX, FormEvent } from "react";
import { ZodError } from "zod";
import { doctorRegisterSchema, patientRegisterSchema } from "./utils/authValidation";
import Input from "../baseComponents/input";
import Button from "../baseComponents/button";
import { useTranslation } from "react-i18next";
import { authApiHandler } from "./utils/authApiHandler";
import { useNavigate } from "react-router-dom";
import i18n from "@/i18n";

type UserRole = "patient" | "doctor";

const Register = (): JSX.Element => {
    const [role, setRole] = useState<UserRole>("patient");
    const [commonData, setCommonData] = useState({ fullName: "", email: "", password: "", phone: "" });
    const { t } = useTranslation();
    const [nationalId, setNationalId] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [consultationFee, setConsultationFee] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const nav = useNavigate()
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = { ...commonData, ...(role === "patient" ? { nationalId } : { licenseNumber, specialty, consultationFee }) };
        const currentSchema = role === "patient" ? patientRegisterSchema : doctorRegisterSchema;



        try {
            currentSchema.parse(payload);

            setErrors({});
            await authApiHandler({ method: "post", path: "/register/" + role, data: payload })
            nav({ pathname: "/login" }, { replace: true })

        } catch (err) {
            console.log(err + "err");

            if (err instanceof ZodError) {
                const fieldErrors: Record<string, string> = {};
                err.issues.forEach((error) => {
                    if (error.path[0]) {
                        const fieldName = error.path[0] as string;
                        fieldErrors[fieldName] = t(error.message);
                    }
                });
                setErrors(fieldErrors);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4 py-12 transition-colors duration-300">
            <div className="w-full max-w-lg p-8 bg-white dark:bg-[#313131] rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800">

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-2">
                        {t("auth.register.title")}
                    </h2>
                </div>

                <div className="flex bg-gray-100 dark:bg-slate-800 p-1.5 rounded-xl mb-8 border border-gray-200/50 dark:border-slate-700">
                    <button
                        type="button"
                        onClick={() => { setRole("patient"); setErrors({}); }}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${role === "patient"
                            ? "bg-white text-teal-700 shadow-md dark:bg-slate-700 dark:text-teal-400"
                            : "text-gray-500"
                            }`}
                    >
                        {t("auth.register.roles.patient")}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setRole("doctor"); setErrors({}); }}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${role === "doctor"
                            ? "bg-white text-teal-700 shadow-md dark:bg-slate-700 dark:text-teal-400"
                            : "text-gray-500"
                            }`}
                    >
                        {t("auth.register.roles.doctor")}
                    </button>
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    <Input
                        label={t("auth.register.form.fullName.label")}
                        value={commonData.fullName}
                        error={errors.fullName}
                        onChange={(e) => setCommonData({ ...commonData, fullName: e.target.value })}
                        placeholder={t("auth.register.form.fullName.placeholder")}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label={t("auth.register.form.email.label")}
                            type="email"
                            value={commonData.email}
                            error={errors.email}
                            onChange={(e) => setCommonData({ ...commonData, email: e.target.value })}
                            placeholder={t("auth.register.form.email.placeholder")}
                        />
                        <Input
                            label={t("auth.register.form.phone.label")}
                            type="tel"
                            value={commonData.phone}
                            error={errors.phone}
                            onChange={(e) => setCommonData({ ...commonData, phone: e.target.value })}
                            placeholder={t("auth.register.form.phone.placeholder")}
                        />
                    </div>

                    {role === "patient" ? (
                        <Input
                            label={t("auth.register.form.nationalId.label")}
                            value={nationalId}
                            error={errors.nationalId}
                            onChange={(e) => setNationalId(e.target.value)}
                            placeholder={t("auth.register.form.nationalId.placeholder")}
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label={t("auth.register.form.licenseNumber.label")}
                                value={licenseNumber}
                                error={errors.licenseNumber}
                                onChange={(e) => setLicenseNumber(e.target.value)}
                                placeholder={t("auth.register.form.licenseNumber.placeholder")}
                            />
                            <Input
                                label={t("auth.register.form.specialty.label")}
                                value={specialty}
                                error={errors.specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                placeholder={t("auth.register.form.specialty.placeholder")}
                            />
                            <Input
                                label={t("auth.register.form.consultationFee.label")}
                                type="number"
                                value={consultationFee}
                                error={errors.consultationFee}
                                onChange={(e) => setConsultationFee(Number(e.target.value))}
                                placeholder={t("auth.register.form.consultationFee.placeholder")}
                            />
                        </div>
                    )}

                    <Input
                        label={t("auth.register.form.password.label")}
                        type="password"
                        value={commonData.password}
                        error={errors.password}
                        onChange={(e) => setCommonData({ ...commonData, password: e.target.value })}
                        placeholder="••••••••"
                    />

                    <Button type="submit" className="w-full mt-2">
                        {t("auth.register.form.submit")}
                    </Button>
                    <span className="m-auto text-sm text-gray-500 font-medium ">
                        {i18n.language === "fa" ? "اکانت دارید ؟ " : "alredy have an account?"}
                        <a href="/login" className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-semibold ">
                            {i18n.language === "fa" ? "ورود" : "login"}
                        </a>
                    </span>

                </form>
            </div>
        </div>
    );

};

export default Register;