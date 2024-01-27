import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react"

import { Button, Card, CardBody, CardHeader, Progress } from "@nextui-org/react";

const Loading = ( )=>{

    return <div className="flex flex-grow items-center justify-center">
            <Card className="py-4 w-64 h-72">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Points Summary</p>
                  <small className="text-default-500">Fetching details...</small>
                  <h4 className="font-bold text-large">Welome</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <p className="ml-2">Loading Points...</p>
                    <Skeleton/>
                    <Button size="lg" fullWidth disabled className="mt-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Issue Points</Button>    
                    <Button size="lg" fullWidth disabled className="mt-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Receive Points</Button>    
                </CardBody>
            </Card>
        </div>
}

export default Loading;