import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import * as R from 'ramda';
import shortid from 'shortid';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

function Calendar(props) {
  const testId = shortid.generate();
  const [events, setEvent] = useState({
    [testId]: {
      id: testId,
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title',
    },
  });
  
  const onEventResize = (data) => {
    const { start, end } = data;
    const updatedState = {
      ...events,
      [data.event.id]: { ...events[data.event.id], start, end },
    };
    
    setEvent(updatedState);
  };
  
  const onEventDrop = (data) => {
    const { start, end } = data;
    const updatedState = {
      ...events,
      [data.event.id]: { ...events[data.event.id], start, end },
    };
    
    setEvent(updatedState);
  };
  
  const onNavigate = (props) => {
    //called when navigate in period
    console.log('onNavigate', props)
  };
  const onView = (props) => {
    //called on change of the view month/week/day/agenda
    //returns string
    console.log('onView', props)
  };
  const onDrillDown = (props) => {
    //called when click the date text on calendar
    //called when click header of the week
    console.log('onDrillDown', props)
  };
  const onRangeChange = (props) => {
    //called when change the view of the calendar or navigate in period
    //month
    //returns object
    // start - date from which to show month
    // end - date until when to show months date
    //
    //week
    //returns array of dates
    //
    //day
    //returns array of one date
    //
    //agenda
    //returns object
    // start - date from which to show month
    // end - date until when to show months date
    console.log('onRangeChange', props)
  };
  const onSelectSlot = (data) => {
    //called when select place where to add event
    //return
    // action: "click"
    // bounds: undefined
    // box: {x: 764, y: 500, clientX: 764, clientY: 500}
    // end: Thu Aug 13 2020 00:00:00 GMT+0300 (Moscow Standard Time) {}
    // slots: [Thu Aug 13 2020 00:00:00 GMT+0300 (Moscow Standard Time)]
    // start: Thu Aug 13 2020 00:00:00 GMT+0300 (Moscow Standard Time) {}
    console.log('onSelectSlot', props)
    const testId = shortid.generate();
    setEvent({
      ...events,
      [testId]: {
        id: testId,
        start: data.start,
        end: data.end,
        title: 'New title',
      }})
  };
  const onSelectEvent = (props) => {
    //click on the Event in schedule
    //returns Event data from state
    console.log('onSelectEvent', props)
  };
  const onDoubleClickEvent = (props) => {
    //double click on the Event in schedule
    //returns Event data from state
    console.log('onDoubleClickEvent', props)
  };
  const onSelecting = (props) => {
    console.log('onSelecting', props)
  };
  
  return (
    <div className='App'>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView='month'
        events={R.values(events)}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onView={onView}
        onEventResize={onEventResize}
        resizable
        selectable={true}
        style={{ height: '60vh' }}
        onNavigate={onNavigate}
        onSelecting={onSelecting}
        onDrillDown={onDrillDown}
        onRangeChange={onRangeChange}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
      />
    </div>
  );
}

export default Calendar;
