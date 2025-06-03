import { Request, Response } from "express";
import { CountHairCutsService } from "../../service/haircut/CountHairCurtService";

class CountHairCutsController{
    async handle(req:Request, res:Response){
        const user_id = req.user_id

        const countHaircuts = new CountHairCutsService()

        const count = await  countHaircuts.execute({
            user_id
        })

        res.status(200).send(count)
        return
    }
}