import React from 'react'
import classNames from "classnames";
import styles from "./styles.module.scss";
import Checked from "@/svg-icon/checked";

interface Props {
  step: number;
  labelStep: { [key: number]: string };
}

const ProcessSteps: React.FC<Props> = ({step, labelStep}) => {
  return (
    <div className={styles.processStep}>
      {Object.entries(labelStep).map(([key, stepLabel], index) => {
        const stepNumber = Number(key);
        const isActive = stepNumber === step;
        const isCompleted = step > stepNumber;
        return (
          <div key={stepNumber} className={styles.step}>
            <div className={classNames(styles.circle, {[styles.active]: isActive}, {[styles.completed]: isCompleted})}>
              {isCompleted && <Checked/>}
            </div>

            {index !== Object.keys(labelStep).length - 1 && (
              <div className={styles.line}/>
            )}
            <label className={styles.label}>
              <span>Step {stepNumber}</span>
              <span>{stepLabel}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ProcessSteps);
