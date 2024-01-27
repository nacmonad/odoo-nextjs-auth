'use client';
import React, { useState, FC } from "react";
import QRCodeReceive from "../../generic/QRCodeReceive";
import { useMainContext } from "@/contexts/MainContextProvider";
import {Button} from "@nextui-org/button";
import { LoyaltyCardOdoo } from "@/types/index";
import { Card } from "@nextui-org/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"


interface ReceivePointsProps {
  initialCards: LoyaltyCardOdoo[]
}

const ReceivePoints: FC<ReceivePointsProps> = ( { initialCards }) => {
  const mainCtx = useMainContext();
  const { user, partner, loyaltyCards, setLoyaltyCards } = mainCtx;

  if(!partner) return (<div>
    No partner provided
  </div>)
  
  if( initialCards.length > 0 && loyaltyCards.length === 0) {
    console.log('[ReceivePointsDialog]initLoyaltyCards from page props')
    setLoyaltyCards(initialCards);
  }

  return (
    <Dialog>  
      <DialogContent className="justify-center">
        {/* Add your content here */}
        <DialogHeader>
          <DialogTitle>This is your share link</DialogTitle>
          <DialogDescription>
            Scan to receive your points.
          </DialogDescription>
      </DialogHeader>
        <QRCodeReceive selectedCard={initialCards.length > 0 ? initialCards[0] : null}/>
        <DialogClose asChild>
          <Button
            fullWidth
            size="lg"
            className="mb-4"
            color="danger"
            variant="bordered"
          >
            Dismiss
          </Button>
        </DialogClose>
      </DialogContent>

    <DialogTrigger asChild>
      <Button
        fullWidth
        size="lg"
        className="mt-4"
      >
        Receive Points
      </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default ReceivePoints;
