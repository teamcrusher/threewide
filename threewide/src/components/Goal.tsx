import React, { ReactNode } from "react";
import { Goal } from "src/models/game_description.model";
import internal from "stream";

type GoalProperties = {
  goal: Goal;
};

const pluralize = (quantity: number, text: string): string => {
  if (quantity === 1) {
    return text;
  } else {
    return text + "s";
  }
};

const goalClass = "text-xl list-disc";
const listClass = " ml-5";

const GoalDisplay = ({ goal }: GoalProperties) => {
  const getGoalItems = (): ReactNode[] => {
    const goalDisplayItems: ReactNode[] = [
      <p key="goal header" className={goalClass}>
        Clear:
      </p>,
    ];

    const goalDisplayList: ReactNode[] = [];

    if (goal.tspinDoubles) {
      goalDisplayList.push(
        <li key="goal tspin doubles" className={goalClass + listClass}>
          {goal.tspinDoubles} Tspin {pluralize(goal.tspinDoubles, "double")}
        </li>
      );
    }

    if (goal.tspinMiniDoubles) {
      goalDisplayList.push(
        <li key="goal tspin mini doubles" className={goalClass + listClass}>
          {goal.tspinMiniDoubles} Tspin mini{" "}
          {pluralize(goal.tspinMiniDoubles, "double")}
        </li>
      );
    }

    if (goal.tspinMinis) {
      goalDisplayList.push(
        <li key="goal tspin minis" className={goalClass + listClass}>
          {goal.tspinMinis} Tspin {pluralize(goal.tspinMinis, "mini")}
        </li>
      );
    }

    if (goal.tspinSingles) {
      goalDisplayList.push(
        <li key="goal tspin singles" className={goalClass + listClass}>
          {goal.tspinSingles} Tspin {pluralize(goal.tspinSingles, "single")}
        </li>
      );
    }

    if (goal.tspinTriples) {
      goalDisplayList.push(
        <li key="goal tspin triples" className={goalClass + listClass}>
          {goal.tspinTriples} Tspin {pluralize(goal.tspinTriples, "triple")}
        </li>
      );
    }

    if (goal.linesCleared) {
      goalDisplayList.push(
        <li key="goal lines cleared" className={goalClass}>
          {goal.linesCleared} {pluralize(goal.linesCleared, "line")}
        </li>
      );
    }

    if (goalDisplayList.length != 0) {
      goalDisplayItems.push(<ul key="goal display list">{goalDisplayList}</ul>);
    }

    if (goal.pointsGained) {
      goalDisplayItems.push(
        <p key="goal send lines" className={goalClass}>
          Send {goal.pointsGained} {pluralize(goal.pointsGained, "line")}
        </p>
      );
    }

    return goalDisplayItems;
  };

  return <div>{getGoalItems()}</div>;
};

export default GoalDisplay;
