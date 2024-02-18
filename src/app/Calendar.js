// Calendar.js
'use client';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // For displaying time slots
import interactionPlugin from '@fullcalendar/interaction'; // For interactive features
import * as ical from 'ical.js';
import { parseISO, add } from 'date-fns';
import { RRule } from 'rrule';

function Calendar() {
  const [events, setEvents] = useState([]);

  const parseIcsEvents = (data) => {
    try {
      const jcalData = ical.parse(data);
      const comp = new ical.Component(jcalData);
      let allEvents = [];

      const generationStartDate = parseISO('2024-01-01T00:00:00Z');
      const generationEndDate = add(generationStartDate, { years: 1 });

      const vevents = comp.getAllSubcomponents('vevent');
      if (!vevents || !vevents.length) {
        console.error('No VEVENT found in the ICS data.');
        return;
      }

      vevents.forEach((event) => {
        const eventStart = event.getFirstPropertyValue('dtstart').toJSDate();
        const eventEnd = event.getFirstPropertyValue('dtend').toJSDate();
        const summary = event.getFirstPropertyValue('summary');
        const rruleProp = event.getFirstPropertyValue('rrule');

        if (rruleProp) {
          const rruleOptions = RRule.parseString(rruleProp.toString());
          rruleOptions.dtstart = eventStart;
          const rrule = new RRule(rruleOptions);
          const dates = rrule.between(generationStartDate, generationEndDate, true);

          dates.forEach((date) => {
            const duration = eventEnd.getTime() - eventStart.getTime();
            const endDate = new Date(date.getTime() + duration);

            allEvents.push({
              title: summary,
              start: date,
              end: endDate,
            });
          });
        } else {
          if (eventStart >= generationStartDate) {
            allEvents.push({
              title: summary,
              start: eventStart,
              end: eventEnd,
            });
          }
        }
      });

      allEvents.sort((a, b) => a.start - b.start);
      setEvents(allEvents.map(event => ({
        ...event,
        start: event.start.toISOString(),
        end: event.end.toISOString(),
      })));
    } catch (error) {
      console.error('Error parsing ICS file:', error);
    }
  };

  const handleFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      parseIcsEvents(e.target.result);
    };
    reader.readAsText(event.target.files[0]);
  };
  console.log(events);
  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".ics" />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        events={events}
        height="auto"
        aspectRatio={1.75}
    
        nowIndicator={true}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short',
          hour12: true
        }}
      />
    </div>
  );
}

export default Calendar;
