'use client';
import React, { useState, FC } from "react";
import QRCodeReceive from "../../generic/QRCodeReceive";
import { useMainContext } from "@/contexts/MainContextProvider";
import {Button} from "@nextui-org/button";
import { LoyaltyCardOdoo } from "@/types/index";
import { Card } from "@nextui-org/react";

interface ReceivePointsProps {
  initialCards: LoyaltyCardOdoo[]
}

const ReceivePoints: FC<ReceivePointsProps> = ( { initialCards }) => {
  const mainCtx = useMainContext();
  const { user, partner, loyaltyCards, setLoyaltyCards } = mainCtx;

  const [showDialog, setShowDialog] = useState(false);

  function handleDismiss(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowDialog(false);
  }

  function handleReceivePoints(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowDialog(true);
  }
  if(!partner) return (<div>
    No partner provided
  </div>)
  
  if( initialCards.length > 0 && loyaltyCards.length === 0) {
    console.log('[ReceivePointsDialog]initLoyaltyCards from page props')
    setLoyaltyCards(initialCards);
  }
  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <Card>
              {/* Add your content here */}
              <QRCodeReceive selectedCard={initialCards.length > 0 ? initialCards[0] : null}/>
              <div className="mx-4">
                <Button
                  fullWidth
                  size="lg"
                  className="mb-4"
                  onClick={handleDismiss}
                  color="danger"
                  variant="bordered"
                >
                  Dismiss
                </Button>
              </div>
            </Card>

          </div>
      )}

      <Button
        className="ml-2 mt-4"
        onClick={handleReceivePoints}
        color="primary"
      >
        Receive Points
      </Button>
    </>
  );
};

export default ReceivePoints;
