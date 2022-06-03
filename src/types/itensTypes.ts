import { item } from "@prisma/client";

type createItemType = Omit<
	item,
	"id" | "status" | "updateTime" | "elapsedTime" | "ffOqc" | "createTime"
>;

enum Status {
	Finished = "Finished",
	OQCFail = "OQCFail",
	InRepair = "InRepair",
	PendingOthers = "PendingOthers",
	PendingParts = "PendingParts",
	PendingCost = "PendingCost",
	PendingSaw = "PendingSaw",
	Avaliation = "Avaliation",
}

export { createItemType, Status };
