import adminRepository from "../repositories/adminRepository.js";

async function GetDashByAsc(asc: "SLZ5286953" | "AJU3198122") {
	const date = new Date();
	const result = await adminRepository.GetDayReport(asc);
	return result;
}
async function GetHistoricByAsc(asc: "SLZ5286953" | "AJU3198122") {
	const date = new Date();
	const result = await adminRepository.GetHistoricReportGroup(asc);
	return result;
}

async function GetUsersFromAsc(asc: "SLZ5286953" | "AJU3198122") {
	const result = await adminRepository.GetUsersFromGroup(asc);
	return result;
}

export default { GetDashByAsc, GetHistoricByAsc, GetUsersFromAsc };
