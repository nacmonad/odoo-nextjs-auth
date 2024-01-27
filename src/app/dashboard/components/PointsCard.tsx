import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

import IssuePointsDialog from '@/app/components/dialogs/IssuePointsDialog';
import ReceivePointsDialog from '@/app/components/dialogs/ReceivePointsDialog';
import isPromotions from '@/utils/isPromotions';
import { IronSessionWithOdoo, LoyaltyCardOdoo } from '@/types/index';


export default ( { session, points, total } : { session: IronSessionWithOdoo, points: LoyaltyCardOdoo[], total: number }) =>{
    const { odoo } = session;    
    const { user, partner } = odoo ? odoo : { user:null, partner:null };
    const { complete_name:name, email_normalized: email } = user ? user : { complete_name:null, email_normalized:null };    
    
    return <Card className="py-4 w-64 h-72">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <p className="text-tiny uppercase font-bold">Points Summary</p>
      <small className="text-default-500">{email}</small>
      <h4 className="font-bold text-large">Welcome, {name}!</h4>
    </CardHeader>
    <CardBody className="overflow-visible py-2">
        <p className="ml-2">Points: {total}</p>
        {user && isPromotions(user) && <IssuePointsDialog/>}
        <ReceivePointsDialog initialCards={points}/>
    </CardBody>
  </Card>
}