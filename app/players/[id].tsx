import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import {
	SafeAreaView,
	BadgeText,
	Badge,
	HStack,
	VStack,
	Text,
	Divider,
	ScrollView,
	Heading,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { fixPlayerHeight } from "../../helpers";
import { Player } from "../../types/player";
import { Position } from "../../types/position";

const propertiesToSkip = [
	"full_name",
	"number",
	"position",
	"height",
	"weight",
	"age",
	"years_exp",
];

export default function PlayerDetails() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const player = params as unknown as Player;

	return (
		<>
			<SafeAreaView flex={0} bgColor="white" />
			<SafeAreaView
				flex={1}
				bgColor={player.active === "true" ? "$green200" : "$secondary100"}
			>
				<VStack flex={1} bgColor="white">
					<HStack
						h={"$12"}
						position="relative"
						justifyContent="center"
						alignItems="center"
					>
						<Ionicons
							testID="backButton"
							name="arrow-back"
							size={28}
							onPress={router.back}
							style={{ position: "absolute", left: 5 }}
						/>
						<Text fontSize={"$2xl"} fontWeight={"$semibold"}>
							Player details
						</Text>
					</HStack>

					<ScrollView showsVerticalScrollIndicator={false}>
						<HStack
							testID="playerDetails"
							justifyContent="center"
							alignItems="center"
							position="relative"
						>
							<Ionicons
								name="person-circle-outline"
								size={120}
								color={player.active === "true" ? "lightgreen" : "lightgray"}
							/>

							<Badge
								testID={`player-badge-${
									player.active === "true" ? "active" : "inactive"
								}`}
								size="md"
								variant="outline"
								borderRadius="$xl"
								action={player.active === "true" ? "success" : "muted"}
								position="absolute"
								top={0}
								right={15}
							>
								<BadgeText>
									{player.active === "true" ? "Active" : "Inactive"}
								</BadgeText>
							</Badge>
						</HStack>

						<VStack
							bgColor={player.active === "true" ? "$green200" : "$secondary100"}
							borderTopLeftRadius={"$3xl"}
							borderTopRightRadius={"$3xl"}
							paddingVertical={"$2"}
							paddingHorizontal={"$2"}
						>
							<VStack
								marginBottom={"$3"}
								bgColor="white"
								borderRadius={"$2xl"}
								paddingVertical={"$3"}
							>
								<Heading>
									<Text textAlign="center" fontSize={"$3xl"}>
										{player.full_name} #{player.number}
									</Text>
								</Heading>

								<HStack marginVertical={"$3"}>
									<VStack
										justifyContent="center"
										alignItems="center"
										w={"$1/3"}
									>
										<Text fontSize={"$xl"}>{player.age}</Text>
										<Text fontSize={"$sm"}>Age</Text>
									</VStack>

									<VStack
										justifyContent="center"
										alignItems="center"
										w={"$1/3"}
									>
										<Text fontSize={"$xl"}>{Position[player.position]}</Text>
										<Text fontSize={"$sm"}>Position</Text>
									</VStack>

									<VStack
										justifyContent="center"
										alignItems="center"
										w={"$1/3"}
									>
										<Text fontSize={"$xl"}>{player.years_exp}</Text>
										<Text fontSize={"$sm"}>Exp. (yrs)</Text>
									</VStack>
								</HStack>

								<HStack marginTop={"$3"}>
									<VStack
										justifyContent="center"
										alignItems="center"
										w={"$1/2"}
									>
										<Text fontSize={"$xl"}>
											{fixPlayerHeight(player.height)}
										</Text>
										<Text fontSize={"$sm"}>Height</Text>
									</VStack>

									<VStack
										justifyContent="center"
										alignItems="center"
										w={"$1/2"}
									>
										<Text fontSize={"$xl"}>
											{player.weight} <Text fontSize={"$xs"}>lbs</Text>
										</Text>
										<Text fontSize={"$sm"}>Weight</Text>
									</VStack>
								</HStack>
							</VStack>

							<VStack
								bgColor="white"
								borderTopLeftRadius={"$3xl"}
								borderTopRightRadius={"$3xl"}
								paddingVertical={"$2"}
								paddingHorizontal={"$2"}
							>
								<Text alignSelf="center">Additional informations:</Text>

								{Object.keys(player).map((k, index) =>
									k.includes("search") ||
									propertiesToSkip.includes(k) ? null : (
										<HStack
											key={index}
											justifyContent="space-between"
											flexWrap="wrap"
											minHeight={"$8"}
										>
											<Text>{k.replace("_", " ")}</Text>
											<Text>{player[k] || "empty"}</Text>
											<Divider my="$0.5" bgColor="$secondary300" />
										</HStack>
									)
								)}
							</VStack>
						</VStack>
					</ScrollView>
				</VStack>
			</SafeAreaView>
		</>
	);
}