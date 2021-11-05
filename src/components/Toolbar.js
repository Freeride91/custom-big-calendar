import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { ReactComponent as LeftIcon } from "../icons/left.svg";
import { ReactComponent as DoubleLeftIcon } from "../icons/double-left.svg";
import { ReactComponent as RightIcon } from "../icons/right.svg";
import { ReactComponent as DoubleRightIcon } from "../icons/double-right.svg";

const ToolbarWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  padding: 24px 16px 32px;
  padding-left: 50px;

  @media screen and (max-width: 576px) {
    padding-left: 16px;
  }
`;

const Button = styled.button`
  font: inherit;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

const TodayButton = styled(Button)`
  font-weight: 500;
  color: #5433ff;
`;

const DateController = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const IconButton = styled(Button)`
  padding: 0 4px;
  display: flex;
  align-items: center;
`;

const DateContent = styled.div`
  padding: 0 36px;
  font-size: 16px;
  font-weight: 700;
`;

export const Toolbar = (props) => {
  console.log(props);
  const { date, view: currentView, onView } = props;

  // const changeToDayView = () => {
  //   onView("day");
  //   setCurrentView("day");
  // };
  // const changeToWeekView = () => {
  //   onView("week");
  //   setCurrentView("week");
  // };

  const goToPrevious = () => {
    let currDate = props.date;
    let newDate;
    if (currentView === "month") {
      newDate = new Date(currDate.getFullYear(), currDate.getMonth() - 1, 1);
    } else if (currentView === "week") {
      newDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() - 7, 1);
    } else {
      newDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() - 1, 1);
    }
    props.onNavigate("prev", newDate);
  };

  const goToBiggerPrevious = () => {
    let currDate = props.date;
    let newDate;
    if (currentView === "month") {
      newDate = new Date(currDate.getFullYear() - 1, currDate.getMonth(), 1);
    } else if (currentView === "week") {
      newDate = new Date(currDate.getFullYear(), currDate.getMonth() - 1, 1);
    } else {
      newDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() - 7, 1);
    }
    props.onNavigate("prev", newDate);
  };

  const goToNext = () => {
    let currDate = props.date;
    let newDate;
    if (currentView === "month") {
      newDate = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 1);
    } else if (currentView === "week") {
      newDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 7, 1);
    } else {
      newDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 1, 1);
    }
    props.onNavigate("next", newDate);
  };

  const goToBiggerNext = () => {
    let currDate = props.date;
    let newDate;
    if (currentView === "month") {
      newDate = new Date(currDate.getFullYear() + 1, currDate.getMonth(), 1);
    } else if (currentView === "week") {
      newDate = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 1);
    } else {
      newDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 7, 1);
    }
    props.onNavigate("next", newDate);
  };

  const goToToday = () => {
    const now = new Date();
    props.date.setYear(now.getFullYear());
    props.date.setMonth(now.getMonth());
    props.date.setDate(now.getDate());
    props.onNavigate("current");
  };

  return (
    <ToolbarWrapper>
      <TodayButton onClick={goToToday}>Today</TodayButton>
      <DateController>
        <IconButton onClick={goToBiggerPrevious}>
          <DoubleLeftIcon />
        </IconButton>
        <IconButton onClick={goToPrevious}>
          <LeftIcon />
        </IconButton>
        <DateContent>{moment(date).format("MMMM YYYY")}</DateContent>
        <IconButton onClick={goToNext}>
          <RightIcon />
        </IconButton>
        <IconButton onClick={goToBiggerNext}>
          <DoubleRightIcon />
        </IconButton>
      </DateController>
    </ToolbarWrapper>
  );
};
