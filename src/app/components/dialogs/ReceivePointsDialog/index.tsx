'use client';
import React, { useState, FC } from "react";
import QRCodeReceive from "../../generic/QRCodeReceive/QRCodeReceive";
import { useMainContext } from "@/contexts/MainContextProvider";
import {Button} from "@nextui-org/button";


const IssuePoints: FC = () => {
  const mainCtx = useMainContext();
  const { user, partner } = mainCtx;

  const [showDialog, setShowDialog] = useState(false);

  function handleDismiss(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowDialog(false);
  }

  function handleIssuePoints(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowDialog(true);
  }
  if(!partner) return (<div>
    No partner provided
  </div>)
  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-4 rounded-md w-96 shadow-md">
            {/* Add your content here */}
            <QRCodeReceive/>
            <Button
              onClick={handleDismiss}
              color="danger"
              variant="bordered"
            >
              Dismiss
            </Button>
          
        </div>
      </div>
      )}

      <Button
        className="ml-2 mt-4"
        onClick={handleIssuePoints}
        color="primary"
      >
        Receive Points
      </Button>
    </>
  );
};

export default IssuePoints;
