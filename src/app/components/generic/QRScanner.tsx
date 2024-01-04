import React, { FC, } from 'react';
import { QrReader } from 'react-qr-reader';
import { OnResultFunction } from '../../../../node_modules/react-qr-reader/dist/index';

const QRScanner: FC<{ handleFinish: (result: { data?:string, error?:Error })=>void }> = ( { handleFinish }: { handleFinish: (result: { data?:string, error?:Error })=>void }) => {
  const handleResult : OnResultFunction = (result, error) => {

    if (!!result) {      
      handleFinish({
        data: result.getText()
      });
    }

    if (!!error) {
      // noisy -- throws error when QR not found
      // console.error(error.name);
      // handleFinish({
      //   error
      // });
    }
  }

  return (
    <>
        <QrReader onResult={handleResult} constraints={{facingMode:"environment"}} />
        
    </>
  );
};

export default QRScanner;