import QRScanner from "../../generic/QRScanner";

export default ( { handleFinish } : { handleFinish: (result: {
        data?: string | undefined;
        error?: Error | null | undefined;
    }) => void}) => {
        return <QRScanner
                handleFinish={handleFinish}
            />
    }