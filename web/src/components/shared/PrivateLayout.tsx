import { Layout } from "antd";
import { DrawerProps } from "antd/lib/drawer";
import { ModalProps } from "antd/lib/modal";
import React, { ReactChild, ReactChildren, useState } from "react";
import { useLocation } from "react-use";
import { useGetDepartmentsQuery, useMeQuery } from "../../generated";
import {
	DepartmentContext,
	DrawerContext,
	ModalContext,
	ToggleDrawerOptions,
	ToggleModalOptions,
	UserContext
} from "../../utils/context";
import { PrimaryNav } from "../Navigation/PrimaryNav";
import { getSecondaryNav } from "../Navigation/SecondaryNav";
import { CommonDrawer } from "./CommonDrawer";
import { CommonModal } from "./CommonModal";
import { Loader } from "./Loader";
import { ShowError } from "./ShowError";

const { Content, Sider } = Layout;

interface LayoutProps {
	children: ReactChild | ReactChildren;
}

export const PrivateLayout = (props: LayoutProps) => {
	const [drawerComponent, setDrawerComponent] = useState(<div />);
	const [drawerProps, setDrawerProps] = useState<DrawerProps>({});
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);

	const [childDrawerProps, setChildDrawerProps] = useState<DrawerProps>({});
	const [isChildDrawerVisible, setIsChildDrawerVisible] = useState(false);
	const [childDrawerComponent, setChildDrawerComponent] = useState(<div />);

	const [modalComponent, setModalComponent] = useState<JSX.Element>();
	const [modalProps, setModalProps] = useState<ModalProps>({});
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { pathname } = useLocation();
	const SecondaryNav = getSecondaryNav(pathname!);

	const { data, error } = useMeQuery();
	const { data: deptData, error: deptError } = useGetDepartmentsQuery();

	const toggleModal = (options?: ToggleModalOptions) => {
		setIsModalVisible(!!options);
		if (options) {
			setModalProps(options.props);
			setModalComponent(options.component);
		}
	};

	const toggleDrawer = (options?: ToggleDrawerOptions) => {
		if (!!options) {
			if (isDrawerVisible) {
				setIsChildDrawerVisible(true);
				setChildDrawerProps(options.props);
				setChildDrawerComponent(options.component);
			} else {
				setIsDrawerVisible(true);
				setDrawerProps(options.props);
				setDrawerComponent(options.component);
			}
		} else {
			if (isChildDrawerVisible) {
				setIsChildDrawerVisible(false);
			} else {
				setIsDrawerVisible(false);
			}
		}
	};

	if (error || deptError) {
		console.log(error || deptError);
		return <ShowError />;
	}

	if (data?.me && deptData?.getDepartments) {
		return (
			<div className="private-container">
				<UserContext.Provider value={{ user: data.me }}>
					<DepartmentContext.Provider
						value={{ departments: deptData.getDepartments }}
					>
						<DrawerContext.Provider value={{ toggleDrawer }}>
							<ModalContext.Provider value={{ toggleModal }}>
								<Layout>
									<Sider width="270" collapsedWidth="0">
										<SecondaryNav />
									</Sider>
									<Content>
										<div className="screen-wrapper">{props.children}</div>
									</Content>
								</Layout>
								<PrimaryNav />
								<CommonModal
									component={modalComponent}
									visible={!!isModalVisible}
									onCancel={() => toggleModal()}
									modalProps={modalProps}
								/>
								<CommonDrawer
									component={drawerComponent}
									visible={isDrawerVisible}
									drawerProps={drawerProps}
									childDrawerComponent={childDrawerComponent}
									childDrawerVisible={isChildDrawerVisible}
									childDrawerProps={childDrawerProps}
								/>
							</ModalContext.Provider>
						</DrawerContext.Provider>
					</DepartmentContext.Provider>
				</UserContext.Provider>
			</div>
		);
	}

	return <Loader />;
};
