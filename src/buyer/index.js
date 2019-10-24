import React from 'react';
import { Grid, Button, Stepper, Step, StepLabel } from '@material-ui/core';
import Footer from '../components/molecules/footer';
import Header from '../components/molecules/header';
import GPaper from '../components/atoms/gpaper';
import Wellcome from '../components/atoms/wellcome';
import GButton from '../components/atoms/button';
import PropTypes from 'prop-types';

class Buyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screenStep: 0, stepperStep: 0 };
  }

  getSteps = () => ['Lista', 'Agendamento', 'Confirmação'];

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return 'index 0';
      case 1:
        return 'index 1';
      case 2:
        return 'index 2';
      default:
        return 'Unknown stepIndex';
    }
  };

  handleNextStepButton = () => {
    this.setState(prevState => ({
      ...prevState,
      screenStep: prevState.screenStep + 1,
    }));
  };

  handleNextStepper = () => {
    this.setState(prevState => ({
      ...prevState,
      stepperStep: prevState.stepperStep + 1,
    }));
  };

  render() {
    if (this.state.screenStep === 0) {
      return (
        <React.Fragment>
          <Header name={this.props.name} />
          <GPaper>
            <Grid
              container
              spacing={8}
              direction="column"
              justify="center"
              alignItems="center"
              style={{ marginTop: '8em' }}
            >
              <Grid item>
                <Wellcome name={this.props.name} gender={this.props.gender} />
              </Grid>
              <Grid item>
                <GButton type="purple" size="large" onClick={this.handleNextStepButton} text="SOLICITAR ENTREGA" />
              </Grid>
            </Grid>
          </GPaper>
          <Footer />
        </React.Fragment>
      );
    } else if (this.state.screenStep === 1) {
      const steps = this.getSteps();
      return (
        <React.Fragment>
          <Header name={this.props.name} />
          <GPaper>
            <Stepper activeStep={this.state.stepperStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label} style={index === 0 ? { marginRight: '30px' } : {}}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <GButton type="purple" size="large" onClick={this.handleNextStepper} text="CONTINUAR" />
          </GPaper>
          <Footer />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Header name={this.props.name} />
          <GPaper>PAGINA AINDA NAO IMPLEMENTADA</GPaper>
          <Footer />
        </React.Fragment>
      );
    }
  }
}

const { string } = PropTypes;
Buyer.propTypes = {
  gender: string.isRequired,
  name: string.isRequired,
};

export default Buyer;
