import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { Error } from "../Error";
import { Button } from "../Button";

import {
  fetchServers,
  serversStatusSelector,
  serversSelector,
  serversErrorMessageSelector,
} from "../../redux/servers/actions";
import { Server } from "../../redux/servers/types";

import { useSort } from "../../hooks/useSort";
import { sortByName } from "./helpers/sortByName";
import { sortByDistance } from "./helpers/sortByDistance";

import "./index.css";

export const ServerList = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchServers());
  }, []);

  const status = useSelector(serversStatusSelector);
  const servers = useSelector(serversSelector);
  const errorMessage = useSelector(serversErrorMessageSelector);

  const isError = status === "error";

  const [list, setList] = React.useState<Server[]>(servers);
  const nameSort = useSort();
  const distanceSort = useSort();

  React.useEffect(() => {
    setList(servers);
  }, [status]);

  const nameSortHandler = () => {
    const sortListAndSortValue = sortByName(list, nameSort.value);

    setList(sortListAndSortValue.sortList);
    nameSort.setSort(sortListAndSortValue.sort);
  };

  const distanceSortHandler = () => {
    const sortListAndSortValue = sortByDistance(list, distanceSort.value);

    setList(sortListAndSortValue.sortList);
    distanceSort.setSort(sortListAndSortValue.sort);
  };

  const rebutHandler = () => {
    setList(servers);
  };

  return (
    <div className={"serversList__wrapper"}>
      {isError && (
        <Error className={"serversList__error"}>{errorMessage}</Error>
      )}
      {status === "loading" && !isError && <p>Loading ...</p>}

      {status === "success" && list && (
        <>
          <Button className={"serversList_rebutButton"} onClick={rebutHandler}>
            Return Initilal List
          </Button>

          <div className={"serversList__title"}>
            <Button
              className={classNames(
                "serversList__button",
                `serversList__button_${nameSort.value}`
              )}
              onClick={nameSortHandler}>
              Name
            </Button>
            <Button
              className={classNames(
                "serversList__button",
                `serversList__button_${distanceSort.value}`
              )}
              onClick={distanceSortHandler}>
              Distance
            </Button>
          </div>

          <ul className={"serversList"}>
            {list.map((server: Server, index) => (
              <li
                className={"serversList__item"}
                key={server.id}
                tabIndex={index}>
                <p>{server.name}</p>
                <p>{server.distance}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
