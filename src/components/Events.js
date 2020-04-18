import React, { useEffect } from "react";
import { format } from "date-fns";
import { SnackbarProvider, useSnackbar } from "notistack";

import EventMessage from "./EventMessage";

export default function Events({ date, events }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const dateString = format(date, "M/d/yyyy");
    if (dateString in events) {
      enqueueSnackbar(
        JSON.stringify({ ...events[dateString], date: date.getTime() }), // preventDuplicate seems to do a string comparison
        {
          preventDuplicate: true,
        }
      );
    }
  }, [enqueueSnackbar, date, events]);
  return null;
}

export const EventProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      content={(key, message) => <EventMessage id={key} message={message} />}
    >
      {children}
    </SnackbarProvider>
  );
};
