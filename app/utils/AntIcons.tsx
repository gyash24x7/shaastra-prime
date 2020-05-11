import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import React from "react";
import { ImageStyle, StyleProp, StyleSheet } from "react-native";

const createFilledIconsMap = () =>
	new Proxy(
		{},
		{
			get(_, name: string) {
				return FilledIconProvider(name);
			}
		}
	);

const createOutlinedIconsMap = () =>
	new Proxy(
		{},
		{
			get(_, name: string) {
				return OutlinedIconProvider(name);
			}
		}
	);

const FilledIconProvider = (name: string) => ({
	toReactElement: (props: any) => AntIconFilled({ name, ...props })
});

const OutlinedIconProvider = (name: string) => ({
	toReactElement: (props: any) => AntIconOutlined({ name, ...props })
});

interface AntIconProps {
	name: string;
	style: StyleProp<ImageStyle>;
}

const AntIconFilled = ({ name, style }: AntIconProps) => {
	const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
	return (
		<IconFill
			name={name as any}
			size={height ? parseInt(height.toString()) : 16}
			color={tintColor}
			style={iconStyle}
		/>
	);
};

const AntIconOutlined = ({ name, style }: AntIconProps) => {
	const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
	return (
		<IconOutline
			name={name as any}
			size={height ? parseInt(height.toString()) : 16}
			color={tintColor}
			style={iconStyle}
		/>
	);
};

export const AntFilledIconsPack = {
	name: "ant-filled",
	icons: createFilledIconsMap()
};

export const AntOutlinedIconsPack = {
	name: "ant-outlined",
	icons: createOutlinedIconsMap()
};
