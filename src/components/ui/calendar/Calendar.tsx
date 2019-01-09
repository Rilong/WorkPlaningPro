import * as React from 'react'
// import * as dateFns from 'date-fns'
import {Fab, Grid} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack"
import ArrowForward from "@material-ui/icons/ArrowForward"

interface IProps {
  size:string
}

interface IState {
  currentDate: Date
  selectedDate: Date
}

class Calendar extends React.Component<IProps, IState> {

  public state: IState = {
    currentDate: new Date(),
    selectedDate: new Date()
  }

  constructor(props: IProps) {
    super(props)
  }

  public headerRender() {
    return (
      <>
        <Grid container={true} item={true} xs={3} justify="flex-start">
          <Fab color="secondary"><ArrowBack/></Fab>
        </Grid>
        <Grid container={true} item={true} xs={6} justify="center">
          test
        </Grid>
        <Grid container={true} item={true} xs={3} justify="flex-end">
          <Fab color="secondary"><ArrowForward/></Fab>
        </Grid>
      </>
    )
  }

  public render() {
    return (
      <>
        {this.headerRender()}
      </>
    );
  }
}

export default Calendar