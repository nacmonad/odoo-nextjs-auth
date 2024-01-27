'use client';

import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import Image from "../../../../../node_modules/next/image";
import { LoyaltyCardOdoo, PartnerOdoo } from "@/types/index";
import { useMainContext } from "@/contexts/MainContextProvider";
import { Card, CardHeader, CardBody, CardFooter, Progress } from "@nextui-org/react"

interface QRCodeReceiveProps {
    selectedCard: LoyaltyCardOdoo | null
}

const QRCodeReceive: FC<QRCodeReceiveProps> = ( { selectedCard }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [code, setCode] = useState<string | null>(selectedCard?.code ? selectedCard.code : null);

    const mainCtx = useMainContext();

    const { user, partner, loyaltyCards, initLoyaltyCard, initQrReceiveCode, qrCode } = mainCtx;


    useEffect(()=>{
        console.log("[QRCodeReceive]", { 
            selectedCard,
            code,
            qrCode
        })
        if(!code && !qrCode) {
            console.log("[initCard]here");
            setLoading(true);
            initLoyaltyCard();
        }
        if(code && !qrCode) {
            setLoading(true)
            initQrReceiveCode(code);
        }
        if(qrCode) {
            setLoading(false);
        }
    }, [selectedCard, qrCode]);

    console.log("[QRCodeReceive]", loyaltyCards);

    return (
    <>
            <CardBody className="p-0">
                { loading && 
                <div className="flex flex-col w-full items-center">
                    <Progress
                    size="sm"
                    isIndeterminate
                    aria-label="Loading..."
                    className="max-w-md"
                    />
                    <p className="mt-4">Initializing your first card...</p></div>}
                {qrCode && 
                    <Image alt={`QR Code Receive`} src={qrCode} width={380} height={200}/>}
                {code && !qrCode && 
                    <p className="text-red-600">Unable to generate QR code.</p>}
            </CardBody>
    </>
    );
};

export default QRCodeReceive;
