import { useEffect, useState } from "react";

export default function CopyToClipboard ({text}){
    const [isCopied, setIsCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
        }catch (error){
            console.error("Copy failed", error);
        }
    }

    useEffect(()=>{
        if (!isCopied) return;

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