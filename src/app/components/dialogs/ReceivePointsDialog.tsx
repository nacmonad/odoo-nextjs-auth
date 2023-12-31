'use client';
import React, { useState, FC } from "react";
import QRCodeReceive from "../generic/QRCodeReceive/QRCodeReceive";
import { useMainContext } from "@/contexts/MainContextProvider";


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
            <button
              onClick={handleDismiss}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
            >
              Dismiss
            </button>
          
        </div>
      </div>
      )}

      <button
        onClick={handleIssuePoints}
        className="bg-blue-500 text-white px-4 py-2 my-2 mx-1 rounded-md"
      >
        Receive Points
      </button>
    </>
  );
};

export default IssuePoints;
