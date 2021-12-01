import * as React from "react";

import { Private } from "../Private";
import { ServerList } from "../ServerList";

import "./index.css";

type AppProps = {
  className?: string;
};

export const App = (props: AppProps) => {
  return (
    <div className={"app"}>
      <Private>
        <ServerList />
      </Private>
    </div>
  );
};
