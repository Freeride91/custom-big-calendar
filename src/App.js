import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.scss";
import styled from "styled-components";
import huLocale from "moment/locale/hu";
import { Toolbar } from "./components/Toolbar";

moment.locale("hu", {
  week: {
    dow: 1,
    doy: 1,
  },
});

moment.updateLocale(huLocale);

const localizer = momentLocalizer(moment);

const defaultScrollToTime = moment().set({ h: 9, m: 58 }).toDate();

export const DEFAULT_VIEW = "week";

const CalendarWrapper = styled.div`
  height: 650px;
  width: 860px;
  overflow: hidden;
  background-color: white;
  padding: 24px;
  border-radius: 20px;
`;

const StyledHeader = styled.div`
  /* background-color: red; */
  padding-top: 8px;
  padding-bottom: 8px;
`;

const HeaderDay = styled.span`
  display: block;
`;

const HeaderDayNum = styled.span`
  font-weight: 600;
`;

function MyHeader({ date }) {
  return (
    <StyledHeader>
      <HeaderDay>{moment(date).format("dddd")}</HeaderDay>
      <HeaderDayNum>{moment(date).format("D")}</HeaderDayNum>
    </StyledHeader>
  );
}

const StyledEvent = styled.div`
  z-index: 999;
  height: 100%;
  padding: 3px;
  font-weight: 500;
  font-size: 14px;
`;

function MyEvent({ event }) {
  return (
    <StyledEvent>
      {`${moment(event.start).format("HH:mm")} - ${moment(event.end).format("HH:mm")}`}
    </StyledEvent>
  );
}

function App() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentView, setCurrentView] = useState(DEFAULT_VIEW);

  let resizeWindow = () => {
    if (window.innerWidth < 576) {
      setCurrentView("day");
    }
    if (window.innerWidth >= 576) {
      setCurrentView("week");
    }
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const [events, setEvents] = useState([
    {
      start: moment("2021-11-04 12:30").toDate(),
      end: moment("2021-11-04 14:30").toDate(),
      title: "Some event",
    },
    {
      start: moment("2021-11-04 15:30").toDate(),
      end: moment("2021-11-04 17:30").toDate(),
      title: "Some event",
    },
  ]);

  const handleSlotClicked = (slotInfo) => {
    setEvents([...events, { start: slotInfo.start, end: slotInfo.end, title: "Added event" }]);
  };

  console.log("Current view: " + currentView);

  return (
    <div className="App">
      <CalendarWrapper>
        <Calendar
          localizer={localizer}
          defaultView={currentView}
          view={currentView}
          onView={setCurrentView}
          events={events}
          components={{
            event: MyEvent,
            week: {
              header: MyHeader,
            },
            toolbar: Toolbar,
          }}
          toolbar={true}
          selectable={true}
          onSelectSlot={handleSlotClicked}
          drilldownView={null}
          scrollToTime={defaultScrollToTime}
        />
      </CalendarWrapper>
    </div>
  );
}

export default App;
