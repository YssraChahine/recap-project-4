import { useEffect, useState } from "react";

// der Wert der kopiert werden soll
export default function CopyToClipboard ({text}){
    const [isCopied, setIsCopied] = useState(false);

    // funktion wird ausgeführt wenn der button geklickt wird
    async function handleCopy() {
        try {
            // Browser API zum kopieren in die Zwischenablage
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
        }catch (error){
            console.error("Copy failed", error);
        }
    }

    useEffect(()=>{
        // nicht kopiert, nichts tun
        if (!isCopied) return;
        // 3 sekunden timer
        const timeout = setTimeout(()=>{
            setIsCopied(false);
        }, 3000);
        return ()=> clearTimeout(timeout);
    }, [isCopied]);
    return (
        <>
            <button onClick={handleCopy}>{isCopied ? "Copied" : "Copy"}</button>
        </>
    )
}