import { Server } from "../../../../redux/servers/types";
import { sortByName } from "../sortByName";

const mockServersList: Server[] = [
  { id: "3", name: "Germany #2", distance: 2 },
  { id: "0", name: "Germany #1", distance: 1 },
  { id: "4", name: "Germany #3", distance: 4 },
  { id: "2", name: "Germany #5", distance: 8 },
  { id: "1", name: "Germany #4", distance: 5 },
];

const resultIncreaseServersList: Server[] = [
  { id: "0", name: "Germany #1", distance: 1 },
  { id: "3", name: "Germany #2", distance: 2 },
  { id: "4", name: "Germany #3", distance: 4 },
  { id: "1", name: "Germany #4", distance: 5 },
  { id: "2", name: "Germany #5", distance: 8 },
];

const resultDecreaseServersList: Server[] = [
  { id: "2", name: "Germany #5", distance: 8 },
  { id: "1", name: "Germany #4", distance: 5 },
  { id: "4", name: "Germany #3", distance: 4 },
  { id: "3", name: "Germany #2", distance: 2 },
  { id: "0", name: "Germany #1", distance: 1 },
];

test("sortByName increase", () => {
  expect(sortByName(mockServersList, "down")).toEqual({
    sortList: resultIncreaseServersList,
    sort: "up",
  });
});

test("sortByName decrease", () => {
  expect(sortByName(mockServersList, "up")).toEqual({
    sortList: resultDecreaseServersList,
    sort: "down",
  });
});
