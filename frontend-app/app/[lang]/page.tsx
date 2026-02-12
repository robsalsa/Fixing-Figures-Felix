import Image from "next/image";
import Header from "@/components/universal/header-banner"


export default function Splash(){
    return (
        <div>
            <Header/>
            <h1>
                This is the SUPPOSED SPLASH PAGE
            <Image 
                src="/test-image.jpg"
                alt="bruh..."
                width={100}
                height={100}
                
                
            />
                IDK WHAT THIS PAGE IS GOING TO BE USED FOR YET
            </h1>
            
        </div>
    );
}