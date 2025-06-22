import { Request, Response } from "express";
import { CreatePortalService } from "../../service/subscribe/CreatePortalService";

export class CreatePortalController{
    async handle(req:Request, res:Response){
        const user_id = req.user_id

        const createPortal = new CreatePortalService()

        const portal = await createPortal.execute({
          user_id  
        })

        res.status(200).json(portal)
        return 
    }
}