import React, { useImperativeHandle, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const useStyles = makeStyles(() => ({
  select: {
    width: "100%",
  },
}));

const ScheduleDay = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [dayData, setDayData] = useState({
    day: props.day,
    from: "0:00",
    to: "0:00",
    dayoff: false,
  });
  useImperativeHandle(ref, () => ({
    getDayData: () => dayData,
  }));

  const generateHours = () => {
    let hours = [];
    let hour = "";

    for (let i = 0; i <= 24; i += 1) {
      hour = `${i}:00`;

      hours.push(
        <MenuItem key={hour} value={hour}>
          {hour}
        </MenuItem>
      );
    }

    return hours;
  };
  const handleChange = (event) => {
    setDayData({ ...dayData, [event.target.name]: event.target.value });
  };
  const toggleDayoff = () => {
    setDayData({ ...dayData, dayoff: !dayData.dayoff });
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={3}>
        <Box fontWeight="bold">
          <span style={{ color: dayData.dayoff ? "#BDBDBD" : "inherit" }}>
            {props.day}
          </span>
        </Box>
      </Grid>
      <Grid item xs={5} container spacing={1}>
        <Grid item xs={6}>
          <FormControl classes={{ root: classes.select }}>
            <InputLabel id="from">З</InputLabel>
            <Select
              labelId="from"
              id="from"
              name="from"
              value={dayData.from}
              onChange={handleChange}
              disabled={dayData.dayoff}
            >
              {generateHours()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl classes={{ root: classes.select }}>
            <InputLabel id="to">До</InputLabel>
            <Select
              labelId="to"
              id="to"
              name="to"
              value={dayData.to}
              onChange={handleChange}
              disabled={dayData.dayoff}
            >
              {generateHours()}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={4} container justify="center">
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              name="dayoff"
              checked={dayData.dayoff}
              onChange={toggleDayoff}
              color="primary"
            />
          }
          label="Вихідний"
        />
      </Grid>
    </Grid>
  );
});

export default ScheduleDay;
