import { Request, Response, NextFunction, Router, response } from "express";
import StatusCode from "http-status-codes";

const statusRoute = Router();

statusRoute.get('/status', (req: Request, res:Response, next:NextFunction) => {
    res.status(StatusCode.OK).send({foo: 'bar2'});
});

export default statusRoute;