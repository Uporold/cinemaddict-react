import { makeAutoObservable } from "mobx";
import { FilterType, SortType } from "../const";
import { RootStore } from "./root-store";

export class AppStore {
  rootStore: RootStore;
  currentFilterType = FilterType.ALL;
  currentSortType = SortType.DEFAULT;
  isStatisticMode = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setFilterType(filterType: string): void {
    this.currentFilterType = filterType;
    this.isStatisticMode = false;
  }

  setSortType(sortType: string): void {
    this.currentSortType = sortType;
  }

  openStatistic(): void {
    this.isStatisticMode = true;
    this.currentSortType = SortType.DEFAULT;
  }

  resetAppState(): void {
    this.currentFilterType = FilterType.ALL;
    this.currentSortType = SortType.DEFAULT;
    this.isStatisticMode = false;
  }
}
