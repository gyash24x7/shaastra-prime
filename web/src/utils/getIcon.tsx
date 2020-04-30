import {
	AppstoreFilled,
	AppstoreOutlined,
	BoldOutlined,
	BookFilled,
	BookOutlined,
	CloseCircleFilled,
	CloseCircleOutlined,
	CloudUploadOutlined,
	CodeFilled,
	CodeOutlined,
	DollarCircleFilled,
	DollarCircleOutlined,
	EditFilled,
	EditOutlined,
	EllipsisOutlined,
	HomeFilled,
	HomeOutlined,
	ItalicOutlined,
	LayoutFilled,
	LayoutOutlined,
	LockFilled,
	LockOutlined,
	LogoutOutlined,
	MessageFilled,
	MessageOutlined,
	NotificationFilled,
	NotificationOutlined,
	OrderedListOutlined,
	PlusCircleFilled,
	PlusCircleOutlined,
	SendOutlined,
	SettingFilled,
	SettingOutlined,
	TableOutlined,
	UnderlineOutlined,
	UnorderedListOutlined,
	UserOutlined
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
	ellipsis: [EllipsisOutlined, EllipsisOutlined],
	lock: [LockOutlined, LockFilled],
	user: [UserOutlined, UserOutlined],
	close: [CloseCircleOutlined, CloseCircleFilled],
	bold: [BoldOutlined, BoldOutlined],
	italic: [ItalicOutlined, ItalicOutlined],
	underline: [UnderlineOutlined, UnderlineOutlined],
	code: [CodeOutlined, CodeFilled],
	upload: [CloudUploadOutlined, CloudUploadOutlined],
	"bulleted-list": [UnorderedListOutlined, UnorderedListOutlined],
	"numbered-list": [OrderedListOutlined, OrderedListOutlined],
	plus: [PlusCircleOutlined, PlusCircleFilled]
};
