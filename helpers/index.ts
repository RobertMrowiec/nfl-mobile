import { Player } from "@/types/player";
import { Position } from "../types/position";

export const fixPlayerHeight = (str: string) => {
	if (!str.includes('"')) {
		const [feet, inches] = str;
		return `${feet}'${inches}"`;
	}

	return str;
};

export const getPositionShortname = (position: string) =>
	Object.keys(Position).find((p) => (Position as any)[p] === position);

export const formatPlayer = (player: Player) => {
	const _player = { ...player };

	delete _player.metadata;
	delete _player.competitions;
	delete _player.fantasy_positions;

	_player.active = _player.active.toString();

	return _player;
};
