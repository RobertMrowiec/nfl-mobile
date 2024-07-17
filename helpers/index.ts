import { Position } from "../types/position";

export const fixPlayerHeight = (str: string) => {
	if (!str.includes('"')) {
		const [feet, inches] = str;
		return `${feet}'${inches}"`;
	}

	return str;
};

export const getPositionShortname = (position: string) =>
	Object.keys(Position).find((p) => Position[p] === position);
