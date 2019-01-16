import * as React from 'react'
import {Grid, Card} from '@material-ui/core'
import Input from '../../../../components/input/input'
import Validation from "../../../../validation/validation";
import {IFormControl} from "../../../../validation/interfaces/validation";

interface IState {
  hasError: boolean,
  formControls: IFormControl
}


class AddProject extends React.Component<null, IState> {

  public state = {
    hasError: true,
    formControls: {
      'name': Validation.createControlWithDefault('text', 'Имя', {
        required: true
      })
    }
  }


  private onInputHandler(name: string, value: string) {
    const formControls: IFormControl = {...this.state.formControls};

    formControls[name].touched = true
    formControls[name].value = value
    formControls[name] = Validation.valid(formControls, name)

    this.setState({...this.state, formControls, hasError: Validation.hasErrorForm(formControls)})
  }

  private onFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  public render() {
    return (
      <div>
        <Grid container={true} justify="center">
          <Grid item={true} xs={4}>
            <Card style={{padding: '20px', minHeight: '200px', marginTop: '20px'}}>
              <form onSubmit={this.onFormHandler}>
                <Input type="text"
                       change={(event: any) => this.onInputHandler('name', event.target.value)}
                       name="name"
                       value={this.state.formControls.name.value}
                       label="Имя проекта"
                       errorMessage={this.state.formControls.name.errorMessage}
                       hasError={this.state.formControls.name.hasError}
                />
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AddProject