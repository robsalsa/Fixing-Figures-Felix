import Image from "next/image";


export default function Splash(){
    return (
        <div>
            <h1>
                This is the SUPPOSED QUESTIONNAIRE PAGE
            <Image 
                src="/test-image.jpg"
                alt="bruh..."
                width={100}
                height={100}
                
                
            />
                THIS SHOUDL HAVE A BUNCH OF QUESTIONS THAT WILL PARSE THROUGH THE SUPABASE DATABASE.
            </h1>
            
        </div>
    );
}