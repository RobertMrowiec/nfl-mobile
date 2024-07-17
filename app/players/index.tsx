import React, { useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { ActivityIndicator, RefreshControl } from "react-native";
import {
	VStack,
	HStack,
	SafeAreaView,
	InputField,
	Input,
	InputSlot,
	Button,
	ButtonText,
	FlatList,
	Text,
	View,
	Heading,
	Select,
	SelectTrigger,
	SelectInput,
	SelectItem,
	ScrollView,
	SelectBackdrop,
	SelectContent,
	SelectPortal,
	SelectDragIndicator,
	SelectDragIndicatorWrapper,
} from "@gluestack-ui/themed";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPlayers } from "../../api/getAllPlayers";
import { Player } from "../../types/player";
import PlayerCard from "../../components/PlayerCard";
import { Position } from "../../types/position";

export default function Players() {
	const [isRefreshing, setIsRefreshing] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState("");
	const [debouncedSearchValue, setDebouncedSearchValue] = React.useState("");
	const [position, setPosition] = React.useState<Position | null>(null);
	const [showFilters, setShowFilters] = React.useState(false);

	const {
		data,
		error,
		refetch,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ["profiles", debouncedSearchValue, position],
		queryFn: ({ pageParam }) =>
			fetchPlayers({ pageParam, searchValue: debouncedSearchValue, position }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
		},
	});

	useEffect(() => {
		if (searchValue.length > 0) {
			const timeoutId = setTimeout(() => {
				setDebouncedSearchValue(searchValue.trim().replace(" ", ""));
			}, 500);

			return () => {
				clearTimeout(timeoutId);
			};
		} else {
			setDebouncedSearchValue("");
		}
	}, [searchValue]);

	const onRefresh = async () => {
		setIsRefreshing(true);
		await refetch();
		setIsRefreshing(false);
	};

	return (
		<SafeAreaView marginHorizontal={"$2"} flex={1}>
			<VStack
				flexDirection="column"
				position="relative"
				justifyContent="center"
				marginBottom={"$3"}
			>
				<HStack justifyContent="center">
					<Heading fontWeight={"$medium"} fontSize={"$2xl"}>
						NFL Players
					</Heading>

					<Ionicons
						testID="filterButton"
						style={{ position: "absolute", top: 0, right: 0 }}
						name={showFilters ? "filter-circle" : "filter-circle-outline"}
						onPress={() => setShowFilters(!showFilters)}
						size={32}
						color="black"
					/>
				</HStack>

				{showFilters && (
					<>
						<Input
							testID="searchInput"
							variant="outline"
							size="lg"
							marginTop={"$4"}
						>
							<InputField
								placeholder="Search player by name"
								value={searchValue}
								onChangeText={(text) => setSearchValue(text)}
							/>
							{searchValue.length > 0 && (
								<InputSlot paddingRight={"$4"}>
									<AntDesign
										name="closecircleo"
										size={24}
										onPress={() => setSearchValue("")}
									/>
								</InputSlot>
							)}
						</Input>

						<Select
							testID="positionSelect"
							selectedValue={position}
							marginTop={"$2"}
							onValueChange={(value) => setPosition(value as Position)}
						>
							<SelectTrigger variant="outline" size="md">
								<SelectInput placeholder="Search by position" />
								{position && (
									<AntDesign
										name="closecircleo"
										size={24}
										style={{ marginRight: 15 }}
										onPress={() => setPosition(null)}
									/>
								)}
							</SelectTrigger>
							<SelectPortal paddingBottom={"$5"}>
								<SelectBackdrop />
								<SelectContent>
									<SelectDragIndicatorWrapper>
										<SelectDragIndicator />
									</SelectDragIndicatorWrapper>
									<ScrollView
										width={"$full"}
										showsVerticalScrollIndicator={false}
									>
										{Object.values(Position).map((pos) => (
											<SelectItem key={pos} label={pos} value={pos} />
										))}
									</ScrollView>
								</SelectContent>
							</SelectPortal>
						</Select>
					</>
				)}
			</VStack>

			{status === "pending" ? (
				<View
					justifyContent="center"
					alignContent="center"
					h="$full"
					paddingBottom={showFilters ? "$40" : "$0"}
				>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			) : status === "error" ? (
				<View h="$full" justifyContent="center" alignItems="center" gap={"$5"}>
					<Text>Error: {error?.message}</Text>
					<Button onPress={() => refetch()} size="md">
						<ButtonText>Try again </ButtonText>
					</Button>
				</View>
			) : data?.pages?.[0]?.data?.length > 0 ? (
				<FlatList
					testID="playersList"
					onRefresh={onRefresh}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							colors={["#0000ff"]}
							tintColor="#0000ff"
						/>
					}
					ListFooterComponent={
						isFetchingNextPage ? (
							<ActivityIndicator
								size="small"
								color="#0000ff"
								style={{ paddingTop: 10 }}
							/>
						) : null
					}
					refreshing={isFetching}
					data={data?.pages.map((p) => p.data).flat() ?? []}
					keyExtractor={(_, index) => index.toString()}
					onEndReachedThreshold={1.5}
					onEndReached={() => {
						if (hasNextPage) {
							fetchNextPage();
						}
					}}
					renderItem={({ item, index }) =>
						PlayerCard({ player: item as Player, index })
					}
				/>
			) : (
				<HStack
					justifyContent="center"
					alignItems="center"
					h={"$full"}
					paddingBottom={showFilters ? "$40" : "$0"}
				>
					<Text>No players found</Text>
				</HStack>
			)}
		</SafeAreaView>
	);
}
