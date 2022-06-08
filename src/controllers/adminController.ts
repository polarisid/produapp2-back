import { Request, Response } from "express";
import adminServices from "../services/adminServices.js";
enum Asc {
	"AJU3198122" = "AJU3198122",
	"SLZ5286953" = "SLZ5286953",
}
async function GetDasboard(req: Request, res: Response) {
	const { asc } = req.params;
	const { user } = res.locals;
	if (user.role !== "ADMIN") {
		return res.status(401).json({
			message: "Unauthorized",
		});
	}
	if (asc === Asc.AJU3198122) {
		const result = await adminServices.GetDashByAsc(asc);
		res.json(result);
	} else if (asc === Asc.SLZ5286953) {
		const result = await adminServices.GetDashByAsc(asc);
		res.json(result);
	} else {
		return res.status(400).json({
			message: "Invalid asc code",
		});
	}
}

export default { GetDasboard };
