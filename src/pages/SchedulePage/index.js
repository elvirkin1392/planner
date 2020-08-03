import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import useFetch from "use-http";

function FilmsList() {
  const { data, loading } = useFetch("/films/", {}, []);
  
  if (loading) {
    return "loading";
  }
  
  return (
    <List>
      {data.results.map((film, i) => (
        <ListItem key={i}>
          <ListItemText primary={film.title} />
        </ListItem>
      ))}
    </List>
  );
}

export default function SchedulePage() {
  return (
    <div>
      <Typography>This is my schedule page</Typography>
      <FilmsList />
    </div>
  );
}
