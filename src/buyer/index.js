import React from 'react';
import { Grid, Button, Stepper, Step, StepLabel, TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Footer from '../components/molecules/footer';
import Header from '../components/molecules/header';
import GPaper from '../components/atoms/gpaper';
import Wellcome from '../components/atoms/wellcome';
import GButton from '../components/atoms/button';
import PropTypes from 'prop-types';

class Buyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screenStep: 0, stepperStep: 0, itens: [], inputValue: '' };
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
    console.log(this.state);
  };

  handleNextStepper = () => {
    this.setState(prevState => ({
      ...prevState,
      stepperStep: prevState.stepperStep + 1,
    }));
  };

  handleBackStepper = () => {
    this.setState(prevState => ({
      ...prevState,
      stepperStep: prevState.stepperStep - 1,
    }));
  };

  handleInputChange = event => {
    const { value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      inputValue: value,
    }));
  };

  handleAddItem = () => {
    this.setState(prevState => ({
      ...prevState,
      itens: [...prevState.itens, this.state.inputValue],
    }));
  };

  renderAddItensScreen = () => {
    return (
      <React.Fragment>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                style={{ marginTop: '-20px', marginLeft: '1em' }}
                variant="outlined"
                label="Item"
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <Fab color="secondary" style={{ marginTop: '-21px' }} onClick={this.handleAddItem}>
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>Itens adicionados: {this.state.itens.length}</Grid>
        <Grid item>
          <GButton type="orange" size="large" onClick={() => console.log('click')} text="VER LISTA" />
        </Grid>
      </React.Fragment>
    );
  };

  renderDateSelectionScreen = () => {
    return (
      <React.Fragment>
        <Grid item>
          <TextField type="datetime-local" />
        </Grid>
      </React.Fragment>
    );
  };

  renderConfirmationScreen = (itensValue, shippingValue) => (
    <React.Fragment>
      <Grid item>Compra: R$ {itensValue}</Grid>
      <Grid item>Entrega: R$ {shippingValue}</Grid>
      <Grid item>
        <strong>TOTAL: R$ {itensValue + shippingValue}</strong>
      </Grid>
    </React.Fragment>
  );

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
    } else if (this.state.screenStep === 1 && this.state.stepperStep < 3) {
      const steps = this.getSteps();
      return (
        <React.Fragment>
          <Header name={this.props.name} />
          <GPaper>
            <Grid container spacing={4} direction="column" justify="center" alignItems="center">
              <Grid item>
                <Stepper activeStep={this.state.stepperStep} alternativeLabel>
                  {steps.map((label, index) => (
                    <Step key={label} style={index === 0 ? { marginRight: '30px' } : {}}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              {this.state.stepperStep === 0 && this.renderAddItensScreen()}
              {this.state.stepperStep === 1 && this.renderDateSelectionScreen()}
              {/* a data ainda não está sendo armazenada no estado */}
              {this.state.stepperStep === 2 && this.renderConfirmationScreen(120.44, 32.2)}
              {/* valores da compra ainda não estão vindo do estado */}
              {/* RENDERIZAR OS OUTROS STEPS */}
              <Grid item>
                <Grid container justify="space-between" alignItems="flex-end" style={{ marginBottom: '10px' }}>
                  <Grid item>
                    <GButton
                      type={this.state.stepperStep !== 0 ? 'purple' : ''}
                      size="large"
                      onClick={this.handleBackStepper}
                      text="VOLTAR"
                      style={{ marginRight: '1em' }}
                      disabled={this.state.stepperStep === 0}
                    />
                  </Grid>
                  <Grid item>
                    {this.state.stepperStep < 2 && (
                      <GButton type="purple" size="large" onClick={this.handleNextStepper} text="CONTINUAR" />
                    )}
                    {this.state.stepperStep >= 2 && (
                      <GButton type="purple" size="large" onClick={this.handleNextStepButton} text="CONFIRMAR" />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </GPaper>
          <Footer />
        </React.Fragment>
      );
    } else if (this.state.screenStep === 2) {
      return (
        <React.Fragment>
          <Header name={this.props.name} />
          <GPaper>PAGINA AINDA NAO IMPLEMENTADA</GPaper>
          <Footer />
        </React.Fragment>
      );
    } else {
      return 'erro';
    }
  }
}

const { string } = PropTypes;
Buyer.propTypes = {
  gender: string.isRequired,
  name: string.isRequired,
};

export default Buyer;
