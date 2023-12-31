
import React, { FC, PropsWithChildren } from "react";

/* A server-component based Dialog wrapper component.  Can add client components as children. */
const Dialog: FC< PropsWithChildren & { showDialog: boolean }> = ( { children, showDialog }) => {
  console.log("[Dialog]")
  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-md w-96 shadow-md">
            {children}
          </div>
        </div>
      )}

    </>
  );
};

export default Dialog;
