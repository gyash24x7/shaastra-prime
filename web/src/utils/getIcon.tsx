import {
  AppstoreFilled,
  AppstoreOutlined,
  BookFilled,
  BookOutlined,
  DollarCircleFilled,
  DollarCircleOutlined,
  EditFilled,
  EditOutlined,
  EllipsisOutlined,
  HomeFilled,
  HomeOutlined,
  LayoutFilled,
  LayoutOutlined,
  LogoutOutlined,
  MessageFilled,
  MessageOutlined,
  NotificationFilled,
  NotificationOutlined,
  SendOutlined,
  SettingFilled,
  SettingOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export const ICON_MAP: Record<string, any[]> = {
	equip: [BookOutlined, BookFilled],
	edit: [EditOutlined, EditFilled],
	send: [SendOutlined, SendOutlined],
	finbooks: [DollarCircleOutlined, DollarCircleFilled],
	chat: [MessageOutlined, MessageFilled],
	settings: [SettingOutlined, SettingFilled],
	notification: [NotificationOutlined, NotificationFilled],
	logout: [LogoutOutlined, LogoutOutlined],
	grid: [AppstoreOutlined, AppstoreFilled],
	list: [UnorderedListOutlined, UnorderedListOutlined],
	table: [TableOutlined, TableOutlined],
	kanban: [LayoutOutlined, LayoutFilled],
	home: [HomeOutlined, HomeFilled],
	ellipsis: [EllipsisOutlined, EllipsisOutlined]
};
