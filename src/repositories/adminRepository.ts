import { prisma } from "../database.js";
import {
	createItemType,
	Status,
	createHistoricType,
} from "../types/itensTypes.js";
import dayjs from "dayjs";
async function GetDayReport(ascCode: "SLZ5286953" | "AJU3198122") {
	const day = dayjs().format("YYYY-MM-DD");
	const dayin = day + " 00:00:00.000";
	const dayout = day + " 23:59:59.999";
	const result = await prisma.item.findMany({
		where: {
			AND: [
				{
					OR: [
						{ status: "Avaliation" },
						{ status: "OQCFail" },
						{ status: "ConfirmedCost" },
						{ status: "ConfirmedSaw" },
						{ status: "ConfirmedParts" },
						{ status: "TechnicalAdvice" },
					],
				},
				{
					userCreated: { ascCode: ascCode },
				},
				// {
				// 	updateTime: {
				// 		gte: new Date(dayin),
				// 		lt: new Date(dayout),
				// 	},
				// },
			],
		},
		include: {
			userChanged: { select: { name: true, id: true } },
		},
	});
	return result;
}

export default {
	GetDayReport,
};
