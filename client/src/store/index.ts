import { createContext, useContext } from "react";
import { DepartmentStore } from "./Department";
import { UserStore } from "./User";

interface CombinedStore {
	departmentStore: DepartmentStore;
	userStore: UserStore;
}

export const StoreContext = createContext<CombinedStore>({} as CombinedStore);
export const StoreProvider = StoreContext.Provider;

export const useDepartmentStore = () =>
	useContext(StoreContext).departmentStore;

export const useUserStore = () => useContext(StoreContext).userStore;

export const initialStore: CombinedStore = {
	departmentStore: new DepartmentStore(),
	userStore: new UserStore(
		localStorage.getItem("currentUser") &&
			localStorage.getItem("auth") &&
			JSON.parse(localStorage.getItem("currentUser") || "")
	)
};
