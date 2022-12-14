import React, { MouseEvent, useState } from "react";
import DownArrow from "../UI/icons/DownArrow";
import RightArrow from "../UI/icons/RightArrow";
import NewStep from "./NewStep";

import classes from "./Quest.module.css";
import StepItem from "./Step";

interface QuestItemProps {
  quest: {
    _id?: string;
    name: string;
    link?: string;
    status?: boolean;
    steps: {
      _id: string;
      text: string;
      link?: string;
      status?: boolean;
    }[];
  };
}

const QuestItem: React.FC<QuestItemProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expandHandler = (event: MouseEvent) => {
    event.preventDefault();

    setIsExpanded(!isExpanded);
  };

  const steps = props.quest.steps;

  return (
    <React.Fragment>
      <div className={classes.quest}>
        {!props.quest.link && (
          <div className={classes.title}>
            <div className={classes["quest__name"]}>
              <a href={props.quest.link}>{props.quest.name}</a>
            </div>
            {!isExpanded && (
              <div className={classes.icon} onClick={expandHandler}>
                <RightArrow />
              </div>
            )}
            {isExpanded && (
              <div className={classes.icon} onClick={expandHandler}>
                <DownArrow />
              </div>
            )}
          </div>
        )}
        {props.quest.link && (
          <div className={classes.title}>
            <div className={classes["quest__name"]}>{props.quest.name}</div>
            {!isExpanded && steps.length > 0 && (
              <div className={classes.icon}>
                <RightArrow />
              </div>
            )}
            {isExpanded && steps.length > 0 && (
              <div className={classes.icon}>
                <DownArrow />
              </div>
            )}
          </div>
        )}
        {isExpanded && <NewStep />}
        {isExpanded && (
          <div className={classes["step_label"]}>
            <div className={classes["step_label__position"]}>Order</div>
            <div className={classes["step_label__text"]}>
              Step description
            </div>
          </div>
        )}
        {isExpanded &&
          steps.length > 0 &&
          steps.map((step, index) => {
            return <StepItem position={index + 1} key={step._id} step={step} />;
          })}
      </div>
    </React.Fragment>
  );
};

export default QuestItem;
