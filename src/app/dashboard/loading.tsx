import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react"

import { Button, Card, CardBody, CardHeader, Progress } from "@nextui-org/react";

const Loading = ( )=>{

    return <div className="flex flex-grow items-center justify-center">
            <Card className="py-4 w-64 h-72">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Points Summary</p>
                  <Skeleton className="w-full h-3 mt-1"/>
                  <Progress
                    size="lg"
                    isIndeterminate
                    aria-label="Loading..."
                    className="max-w-md h-6 mt-2"
                    />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Skeleton className="mx-2 h-6"/>
                    <Skeleton/>
                    <Button size="lg" fullWidth disabled className="mt-4">
                        Issue Points</Button>    
                    <Button size="lg" fullWidth disabled className="mt-4">
                        Receive Points</Button>    
                </CardBody>
            </Card>
        </div>
}

export default Loading;