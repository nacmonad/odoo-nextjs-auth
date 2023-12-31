
import React, { FC } from "react";

const LoadingFallback: FC = ( ) => {
    
    return (
    <>
        <div className="flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white flex items-center justify-center p-4 rounded-md w-96 shadow-md">
                <div className="bg-white/20 w-96 h-96"></div>
            </div>
        </div>
    </>
    );
};

export default LoadingFallback;
