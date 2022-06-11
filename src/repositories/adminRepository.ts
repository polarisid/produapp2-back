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

async function GetHistoricReport(ascCode: "SLZ5286953" | "AJU3198122") {
	const day = dayjs().format("YYYY-MM-DD");
	const dayin = day + " 00:00:00.000";
	const dayout = day + " 23:59:59.999";
	const result = await prisma.historic.findMany({
		where: {
			AND: [
				{ item: { userChanged: { ascCode: ascCode } } },
				{
					item: {
						updateTime: {
							gte: new Date(dayin),
							lt: new Date(dayout),
						},
					},
				},
			],
		},
		select: {
			status: true,
			createdAt: true,
			item: {
				select: {
					os: true,
					model: true,
					status: true,
				},
			},
			user: {
				select: {
					name: true,
				},
			},
		},
	});
	return result;
}
async function GetHistoricReportGroup(ascCode: "SLZ5286953" | "AJU3198122") {
	const day = dayjs().format("YYYY-MM-DD");
	const dayin = day + " 00:00:00.000";
	const dayout = day + " 23:59:59.999";
	console.log(dayin);
	console.log(dayout);
	const result = await prisma.historic.findMany({
		where: {
			AND: [
				{ item: { userChanged: { ascCode: ascCode } } },
				{
					item: {
						updateTime: {
							gte: new Date(dayin),
							lte: new Date(dayout),
						},
					},
				},
			],
		},
		select: {
			status: true,

			createdAt: true,
			item: {
				select: {
					os: true,
					model: true,
					status: true,
				},
			},
			user: {
				select: {
					name: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return result;
}

export default {
	GetDayReport,
	GetHistoricReport,
};
