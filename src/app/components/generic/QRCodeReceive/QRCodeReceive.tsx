import React, { FC, PropsWithChildren } from "react";
import { PartnerOdoo } from "@/types/index";
import { useMainContext } from "@/contexts/MainContextProvider";

/* A server-component based Dialog wrapper component.  Can add client components as children. */
const QRCodeReceive: FC = () => {

    
    const mainCtx = useMainContext();
    const { user, partner, qrCode } = mainCtx;
    console.log("[QRCodeReceive]", { qrCode })
    return (
    <>
        <div className="flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white flex items-center justify-center p-4 rounded-md w-96 shadow-md">
                {qrCode && <img alt={`QR Code Receive`} src={qrCode} width={320} height={200}/>}
                {!qrCode && <p className="text-red-600">Unable to generate QR code.</p>}
            </div>
        </div>
    </>
    );
};

export default QRCodeReceive;
