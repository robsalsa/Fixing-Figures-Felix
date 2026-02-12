"use client";

import {useState, useEffect} from "react";
import Link from "next/Link";
// import Image from "next/Image"; //in the chance there is an image/icon
import {usePathname, useRouter} from "next/navigation";
// import {trackLanguageChange, trackButtonClick, trackOutboundLink} from "@/lib/analytics"; //in the chance of analytics by Google
// import {setPreferredLanguage } from "@/lib/languageDetection"; //this is for the language JSON or CMS

export default function Header(){
    const pathname = usePathname();
    const router = useRouter();

    //finding language and sort to correct language
    const lang = pathname?.startsWith("/es")
        ? "es"
        : pathname?.startsWith("/ko")
        ? "ko"
        : "en";

    //Language Mapping 
    const labels = {
        en: { home: "Home", about: "About Us", switch: "Languages" },
        es: { home: "Inicio", about: "Sobre Nosotros", switch: "Idiomas" },
        ko: { home: "홈페이지", about: "회사 소개", switch: "언어" },
    };

    const avaliableLanguages =[
        {code: "en", lable: "English"},
        {code: "es", lable: "Español"},
        {code: "ko", lable: "한국인"},
    ]

    //Burger Menu components
    const [burgerActive, setBurgerActive] = useState(false);
    const [langMenuActive, setLangMenuActive] = useState(false);

    useEffect(() =>{
        setBurgerActive(false);
        setLangMenuActive(false);
    }, [pathname]);

    //tracking languages
    const handleLanguageChange = (code: string) =>{
        trackLanguageChange(lang, code);
        setPreferredLanguage(code as 'en' | 'es' | 'ko');
        const pathWithoutLang = pathname.replace(/^\/(en|es|ko)/, '') || '/';
        router.push(newPath);
    };

    return (
        <header className="header" role="banner">
            <div className="container-header">
                <Link href={lang === "es" ? "/es" : lang === "ko" ? "/ko" : "/en"} className="flex items-center gap-3" aria-lable="home">
                    
                </Link>
            </div>
        </header>

    )
    
}