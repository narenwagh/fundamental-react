/* eslint-disable react/no-multi-comp */
import Calendar from '../Calendar';
import moment from 'moment';
import React from 'react';
import {
    boolean,
    date,
    number,
    optionsKnob,
    text
} from '@storybook/addon-knobs';

export default {
    title: 'Component API/Calendar',
    component: Calendar,
    parameters: {
        storyshots: { disable: true }
    }
};

function dateKnobToDate(name, defaultValue) {
    const stringTimestamp = date(name, defaultValue);
    return moment(stringTimestamp);
}

const afterDateDefault = new Date(new Date().getFullYear() + 1, 0, 1);
const beforeDateDefault = new Date(new Date().getFullYear() - 1, 0, 1);

const blockedDateFirstDefault = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
const blockedDateSecondDefault = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 10);

const disabledDateFirstDefault = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 15);
const disabledDateSecondDefault = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 25);

const weekdayOptions = {
    Sunday: 'Sunday',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday'
};

export const primary = () => (<Calendar />);

export const disableWeekends = () => (
    <Calendar
        disableBeforeDate={new Date()}
        disableWeekends />
);

disableWeekends.storyName = 'Disabled Weekends and Disabled Before Date';

export const blockedDates = () => (
    <Calendar
        blockedDates={[new Date(2018, 1, 1, 0, 0, 0, 0), new Date(2018, 3, 3, 0, 0, 0, 0)]}
        disableWeekday={['Monday', 'Tuesday']} />
);

export const openToDate = () => {
    const _openToDate = moment().year('2000').month(0).date(1);
    return <Calendar openToDate={_openToDate} />;
};

export const specialDays = () => (
    <Calendar
        specialDays={{
            [moment().add(1, 'day').endOf('day').format('YYYYMMDD')]: 1,
            [moment().add(2, 'day').endOf('day').format('YYYYMMDD')]: 2,
            [moment().add(3, 'day').endOf('day').format('YYYYMMDD')]: 3,
            [moment().add(7, 'day').endOf('day').format('YYYYMMDD')]: 4
        }} />
);

export const rangeSelection = () => (
    <Calendar enableRangeSelection />
);

export const weekdayStart = () => {
    const _weekdayStart = number('weekdayStart', 1);
    return <Calendar weekdayStart={_weekdayStart} />;
};

export const dev = () => (
    <Calendar
        blockedDates={[dateKnobToDate('block between dates (1)', blockedDateFirstDefault),
            dateKnobToDate('block between dates (2)', blockedDateSecondDefault)]}
        disableAfterDate={dateKnobToDate('disable after date', afterDateDefault)}
        disableBeforeDate={dateKnobToDate('disable before date', beforeDateDefault)}
        disableFutureDates={boolean('disable future dates', false)}
        disablePastDates={boolean('disable past dates', false)}
        disableWeekday={optionsKnob('disable weekdays', weekdayOptions, null, { display: 'check' })}
        disableWeekends={boolean('disable weekends', false)}
        disabledDates={[dateKnobToDate('disable between dates (1)', disabledDateFirstDefault),
            dateKnobToDate('disable between dates (2)', disabledDateSecondDefault)]}
        locale={text('locale', 'en')}
        openToDate={dateKnobToDate('open to date', new Date())}
        weekdayStart={number('weekdayStart', 0)} />
);

dev.parameters = {
    docs: { disable: true }
};
