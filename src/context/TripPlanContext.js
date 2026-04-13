import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { trip } from '../content/active';

/**
 * TripPlanContext — manages which content items are selected for which days.
 *
 * State shape:
 * {
 *   selections: {
 *     '2026-06-15': [
 *       { itemId: 'eat-gaviao-novo', timeSlot: 'evening', note: '' },
 *       { itemId: 'see-zona-velha',  timeSlot: 'evening', note: '' },
 *     ],
 *     ...
 *   }
 * }
 *
 * The context provides helpers to:
 *  - addToDay(itemId, date, timeSlot)
 *  - removeFromDay(itemId, date)
 *  - moveToDay(itemId, fromDate, toDate)
 *  - isSelected(itemId)          → boolean
 *  - getSelectedDay(itemId)      → date string or null
 *  - getItemsForDay(date)        → array of { itemId, timeSlot, note }
 *  - getAllSelectedIds()          → Set of all selected item IDs
 */

const TripPlanContext = createContext();

const TIME_SLOTS = ['morning', 'afternoon', 'evening', 'all-day'];

// Build an array of date strings for the trip
const buildTripDates = () => {
  const dates = [];
  const start = new Date(trip.dates.start + 'T00:00:00');
  const end = new Date(trip.dates.end + 'T00:00:00');
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
};

const initialState = {
  selections: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_DAY': {
      const { itemId, date, timeSlot = 'all-day', note = '' } = action.payload;
      const dayItems = state.selections[date] || [];
      // Prevent duplicates
      if (dayItems.some((s) => s.itemId === itemId)) return state;
      return {
        ...state,
        selections: {
          ...state.selections,
          [date]: [...dayItems, { itemId, timeSlot, note }],
        },
      };
    }

    case 'REMOVE_FROM_DAY': {
      const { itemId, date } = action.payload;
      const dayItems = (state.selections[date] || []).filter(
        (s) => s.itemId !== itemId
      );
      const newSelections = { ...state.selections };
      if (dayItems.length === 0) {
        delete newSelections[date];
      } else {
        newSelections[date] = dayItems;
      }
      return { ...state, selections: newSelections };
    }

    case 'MOVE_TO_DAY': {
      const { itemId, fromDate, toDate, timeSlot } = action.payload;
      // Remove from old day
      const fromItems = (state.selections[fromDate] || []).filter(
        (s) => s.itemId !== itemId
      );
      // Add to new day
      const toItems = state.selections[toDate] || [];
      const entry = { itemId, timeSlot: timeSlot || 'all-day', note: '' };
      const newSelections = { ...state.selections };
      if (fromItems.length === 0) {
        delete newSelections[fromDate];
      } else {
        newSelections[fromDate] = fromItems;
      }
      newSelections[toDate] = [...toItems, entry];
      return { ...state, selections: newSelections };
    }

    case 'CLEAR_ALL':
      return initialState;

    default:
      return state;
  }
}

export function TripPlanProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const tripDates = useMemo(() => buildTripDates(), []);

  const helpers = useMemo(() => {
    const allSelectedIds = new Set();
    const itemToDate = {};
    Object.entries(state.selections).forEach(([date, items]) => {
      items.forEach(({ itemId }) => {
        allSelectedIds.add(itemId);
        itemToDate[itemId] = date;
      });
    });

    return {
      tripDates,

      addToDay: (itemId, date, timeSlot) =>
        dispatch({ type: 'ADD_TO_DAY', payload: { itemId, date, timeSlot } }),

      removeFromDay: (itemId, date) =>
        dispatch({ type: 'REMOVE_FROM_DAY', payload: { itemId, date } }),

      moveToDay: (itemId, fromDate, toDate, timeSlot) =>
        dispatch({ type: 'MOVE_TO_DAY', payload: { itemId, fromDate, toDate, timeSlot } }),

      clearAll: () => dispatch({ type: 'CLEAR_ALL' }),

      isSelected: (itemId) => allSelectedIds.has(itemId),

      getSelectedDay: (itemId) => itemToDate[itemId] || null,

      getItemsForDay: (date) => state.selections[date] || [],

      getAllSelectedIds: () => allSelectedIds,

      selections: state.selections,
    };
  }, [state, tripDates]);

  return (
    <TripPlanContext.Provider value={helpers}>
      {children}
    </TripPlanContext.Provider>
  );
}

export function useTripPlan() {
  const ctx = useContext(TripPlanContext);
  if (!ctx) throw new Error('useTripPlan must be inside TripPlanProvider');
  return ctx;
}

export { TIME_SLOTS };
export default TripPlanContext;
