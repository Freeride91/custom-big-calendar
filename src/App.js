import { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.scss";
import styled, { css } from "styled-components";
import huLocale from "moment/locale/hu";
import { Toolbar } from "./components/Toolbar";
import Dropdown from "./components/Dropdown";
import { usePopper } from "react-popper";
import useOnClickOutside from "./useOnClickOutside";
import { createPortal } from "react-dom";

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
  padding: 10px 5px 5px 5px;
  font-weight: 500;
  font-size: 12px;
  position: relative;
  overflow: visible;
`;

const PopperContainer = styled.div`
  display: ${(props) => (props.visible ? "inline-block" : "none")};

  width: 200px;
  height: 85px;

  flex-direction: column;
  justify-content: space-between;

  background-color: #ffffff;
  box-shadow: 1px 1px 10px rgba(84, 51, 255, 0.3);
  border-radius: 5px;
  padding: 14px;

  z-index: 9999;
`;

const PopperDateWrapper = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: black;
`;

const PopperButtonsWrapper = styled.div`
  font-size: 10px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  color: black;
  padding: 12px;
  border-top: 1px solid #e8e8e8;

  .red {
    color: red;
  }
`;

function MyEvent(props) {
  const [visible, setVisibility] = useState(false);

  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes, update } = usePopper(referenceRef.current, popperRef.current, {
    placement: "right",
    strategy: "absolute",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [20, -10],
        },
      },
    ],
  });

  const handleEventClick = () => {
    setVisibility(!visible);
    update();
  };

  const handleClose = () => {
    setVisibility(false);
  };

  const refForOutsideClick = useRef();
  useOnClickOutside(refForOutsideClick, handleClose);

  const containerStyle = {
    ...styles.popper,
    zIndex: 99999,
  };

  return (
    <>
      {createPortal(
        <div ref={popperRef} style={containerStyle} {...attributes.popper}>
          <PopperContainer style={styles.offset} visible={visible}>
            <PopperDateWrapper>Tuesday, 16 February 2021</PopperDateWrapper>
            <PopperButtonsWrapper>
              <span className="red">Delete</span>
              <span>Manage</span>
            </PopperButtonsWrapper>
          </PopperContainer>
        </div>,
        document.getElementById("portal-target")
      )}

      <StyledEvent ref={referenceRef} onClick={handleEventClick}>
        {`${moment(props.event.start).format("HH:mm")} - ${moment(props.event.end).format(
          "HH:mm"
        )}`}
      </StyledEvent>
    </>
  );
}

function App() {
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
    // {
    //   start: moment("2021-11-17 15:30").toDate(),
    //   end: moment("2021-11-17 18:30").toDate(),
    //   title: "Some event",
    // },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSlotClicked = (slotInfo) => {
    setSelectedEvent(null);
    setEvents([...events, { start: slotInfo.start, end: slotInfo.end, title: "Added event" }]);
  };

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
          // selected={selectedEvent}
          // onSelectEvent={(event) => setSelectedEvent(event)}
        />
        <div id="portal-target" />
      </CalendarWrapper>
    </div>
  );
}

export default App;
