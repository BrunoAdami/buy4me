import React from 'react';
import axios from 'axios';
import {
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Fab,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  MenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Footer from '../components/molecules/footer';
import Header from '../components/molecules/header';
import GPaper from '../components/atoms/gpaper';
import Wellcome from '../components/atoms/wellcome';
import GButton from '../components/atoms/button';
import PropTypes from 'prop-types';

// const url_base = 'http://127.0.0.1:5000/';
const url_base = 'http://100.24.55.110:5000/';
class Buyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenStep: 0,
      stepperStep: 0,
      items: [],
      selectedDate: '',
      inputValue: '',
      deliverName: '',
      deliverVehiclePlate: '',
      deliverVehicleType: '',
      deliverVehicleModel: '',
      dbItems: [],
    };
  }

  getSteps = () => ['Lista', 'Agendamento', 'Confirmação'];

  // getdbItems = () => [
  //   {
  //     value: 'banana 1',
  //     name: 'banana 1',
  //     price: 12,
  //   },
  //   {
  //     value: 'banana 2',
  //     name: 'banana 2',
  //     price: 12,
  //   },
  //   {
  //     value: 'banana 3',
  //     name: 'banana 3',
  //     price: 12,
  //   },
  //   {
  //     value: 'banana 4',
  //     name: 'banana 4',
  //     price: 12,
  //   },
  //   {
  //     value: 'banana 5',
  //     name: 'banana 5',
  //     price: 12,
  //   },
  // ];

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
    this.setState(prevState => {
      if (prevState.stepperStep === 2)
        setTimeout(() => {
          this.handleNextStepper();
          this.handleNextStepButton();
        }, 4000);
      return {
        ...prevState,
        screenStep: prevState.screenStep + 1,
      };
    });
  };

  handleRequestConfirmation = () => {
    axios.get(`${url_base}available-deliver`).then(result => {
      console.log(result.data);
      const { data } = result;
      this.setState(prevState => {
        return {
          ...prevState,
          deliverName: data.name,
          deliverVehiclePlate: data.vehicle_plate,
          deliverVehicleType: data.vehicle_type,
          deliverVehicleModel: data.vehicle_brand,
        };
      });
    });
    this.setState(prevState => {
      setTimeout(() => {
        this.handleNextStepper();
        this.handleNextStepButton();
      }, 4000);
      return {
        ...prevState,
        screenStep: prevState.screenStep + 1,
      };
    });
  };

  handleRequestDeliveryButton = () => {
    axios
      .get(`${url_base}items`)
      .then(result => {
        console.log(result.data);
        this.setState(prevState => {
          return {
            ...prevState,
            dbItems: result.data.map(item => ({ name: item.name, value: item.name, price: item.price })),
          };
        });
      })
      .catch(error => console.log(error));
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

  handleDateChange = event => {
    const { value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      selectedDate: value,
    }));
    console.log(this.state.selectedDate);
  };

  handleAddItem = () => {
    const hasEqual = this.state.items.find(item => item.name === this.state.inputValue);
    if (hasEqual) {
      this.setState(prevState => ({
        ...prevState,
        items: prevState.items.map(item => {
          if (item.name === this.state.inputValue) return { ...item, quantity: item.quantity + 1 };
          else return item;
        }),
      }));
    } else {
      const selectedItem = this.state.dbItems.find(item => item.name === this.state.inputValue);
      this.setState(prevState => ({
        ...prevState,
        items: [...prevState.items, { name: selectedItem.name, price: selectedItem.price, quantity: 1 }],
      }));
    }
  };

  handleCancel = () => {
    this.setState(prevState => ({
      screenStep: 0,
      stepperStep: 0,
      items: [],
      selectedDate: '',
      inputValue: '',
      deliverName: 'Nome de teste',
      deliverVehiclePlate: 'PLACA-TEST',
      deliverVehicleType: 'Carro teste',
      deliverVehicleModel: 'Modelo teste',
      dbItems: [],
    }));
  };

  handleListView = () => {
    this.setState(prevState => ({ ...prevState, screenStep: 5 }));
  };

  handleGoBackToCreateList = () => {
    this.setState(prevState => ({ ...prevState, screenStep: 1 }));
  };

  toFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
  }

  renderAdditemsScreen = () => {
    return (
      <React.Fragment>
        <Grid item>
          <Grid container spacing={2} justify="flex-start">
            <Grid item xs={9}>
              <TextField
                style={{ marginTop: '-20px', marginLeft: '1em', width: '12em' }}
                variant="outlined"
                label="Item"
                onChange={this.handleInputChange}
                select
                value={this.state.inputValue}
              >
                {this.state.dbItems.map(item => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Fab color="secondary" style={{ marginTop: '-21px' }} onClick={this.handleAddItem}>
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>Itens adicionados: {this.state.items.reduce((prev, curr) => prev + curr.quantity, 0)}</Grid>
        <Grid item>
          <GButton type="orange" size="large" onClick={this.handleListView} text="VER LISTA" />
        </Grid>
      </React.Fragment>
    );
  };

  renderDateSelectionScreen = () => {
    return (
      <React.Fragment>
        <Grid item>
          <TextField type="datetime-local" onChange={this.handleDateChange} />
        </Grid>
      </React.Fragment>
    );
  };

  renderConfirmationScreen = (itemsValue, shippingValue) => (
    <React.Fragment>
      <Grid item>Compra: R$ {this.toFixed(itemsValue, 2)}</Grid>
      <Grid item>Entrega: R$ {this.toFixed(shippingValue, 2)}</Grid>
      <Grid item>
        <strong>TOTAL: R$ {this.toFixed(itemsValue + shippingValue, 2)}</strong>
      </Grid>
    </React.Fragment>
  );

  renderLoading = () => (
    <React.Fragment>
      <Grid container direction="column" justify="center">
        <Grid item>
          <CircularProgress />
        </Grid>
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
                <GButton
                  type="purple"
                  size="large"
                  onClick={this.handleRequestDeliveryButton}
                  text="SOLICITAR ENTREGA"
                />
              </Grid>
            </Grid>
          </GPaper>
          <Footer />
        </React.Fragment>
      );
    } else if (this.state.screenStep === 1 && this.state.stepperStep < 3) {
      const steps = this.getSteps();
      const purchasePrice = this.state.items.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
      const deliveryPrice = 5 + 0.05 * purchasePrice;
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
              {this.state.stepperStep === 0 && this.state.dbItems.length >= 1 && this.renderAdditemsScreen()}
              {this.state.stepperStep === 0 && !(this.state.dbItems.length >= 1) && this.renderLoading()}
              {this.state.stepperStep === 1 && this.renderDateSelectionScreen()}
              {/* a data ainda não está sendo armazenada no estado */}
              {this.state.stepperStep === 2 && this.renderConfirmationScreen(purchasePrice, deliveryPrice)}
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
                      <GButton type="purple" size="large" onClick={this.handleRequestConfirmation} text="CONFIRMAR" />
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
      //Searching Screen
      return (
        <React.Fragment>
          <Header name={this.props.name} />
          <GPaper>
            <Grid container spacing={4} direction="column" justify="center" alignItems="center">
              <Grid style={{ marginTop: '6em' }} item>
                <strong>BUSCANDO ENTREGADOR...</strong>
              </Grid>
              <Grid item>
                <CircularProgress />
              </Grid>
              <Grid item>Buscando por entregadores próximos a você...</Grid>
              <Grid item>
                <GButton type="red" size="large" onClick={this.handleCancel} text="CANCELAR" />
              </Grid>
            </Grid>
          </GPaper>
          <Footer />
        </React.Fragment>
      );
    } else if (this.state.screenStep === 3) {
      // Found deliver screen
      return (
        <React.Fragment>
          <Header name={this.props.name} />
          <GPaper>
            <Grid container spacing={4} direction="column" justify="center" alignItems="center">
              <Grid item style={{ marginTop: '5em' }}>
                <strong>ENTREGADOR ENCONTRADO!</strong>
              </Grid>
              <Grid item>
                <p>
                  <strong>Nome:</strong> {this.state.deliverName}
                </p>
                <p>
                  <strong>Veículo:</strong> {this.state.deliverVehicleType}
                </p>
                <p>
                  <strong>Modelo:</strong> {this.state.deliverVehicleModel}
                </p>
                <p>
                  <strong>Placa:</strong> {this.state.deliverVehiclePlate}
                </p>
              </Grid>
              <Grid item>
                <Grid container justify="space-between" alignItems="flex-end" style={{ marginBottom: '10px' }}>
                  <Grid item>
                    <GButton
                      type="red"
                      size="large"
                      onClick={this.handleCancel}
                      text="CANCELAR"
                      style={{ marginRight: '1em' }}
                    />
                  </Grid>
                  <Grid item>
                    <GButton type="orange" size="large" onClick={this.handleNextStepButton} text="FINALIZAR" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </GPaper>
          <Footer />
        </React.Fragment>
      );
    } else if (this.state.screenStep === 4) {
      //deliver stored
      const dateAndTime = this.state.selectedDate.split('T');
      let date, time, printableDate, printableTime;
      if (dateAndTime[0]) {
        date = dateAndTime[0].split('-');
        time = dateAndTime[1].split(':');
        printableDate = `${date[2]}/${date[1]}/${date[0]}`;
        printableTime =
          Number(time[0]) < 22
            ? `${Number(time[0])}h${time[1]}min - ${Number(time[0]) + 2}h${time[1]}min`
            : `${Number(time[0])}h${time[1]}min - ${Number(time[0]) - 22}h${time[1]}min`;
      } else {
        printableDate = 'Não selecionado';
        printableTime = 'Não selecionado';
      }

      console.log(date);
      return (
        <React.Fragment>
          <Header name={this.props.name} />
          <GPaper>
            <Grid container spacing={4} direction="column" justify="center" alignItems="center">
              <Grid item style={{ marginTop: '5em' }}>
                <strong>ENTREGA AGENDADA!</strong>
              </Grid>
              <Grid item>
                <p>
                  <strong>Data:</strong> {printableDate}
                </p>
                <p>
                  <strong>Horário:</strong> {printableTime}
                </p>
                <p>
                  <strong>Entregador:</strong> {this.state.deliverName}
                </p>
                <p>
                  <strong>Placa:</strong> {this.state.deliverVehiclePlate}
                </p>
              </Grid>
              <Grid item>
                <GButton type="blue" size="large" onClick={this.handleCancel} text="VOLTAR" />
              </Grid>
            </Grid>
          </GPaper>
          <Footer />
        </React.Fragment>
      );
    } else if (this.state.screenStep === 5) {
      const rows = this.state.items;

      return (
        <React.Fragment>
          <Header name={this.props.name} />
          <GPaper>
            <Grid container spacing={4} direction="column" justify="center" alignItems="center">
              <Grid item>
                <Table stickyHeader aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Preço</TableCell>
                      <TableCell align="right">Quantidade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.price}
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter />
                </Table>
              </Grid>
              <Grid item>
                <GButton type="blue" size="large" onClick={this.handleGoBackToCreateList} text="VOLTAR" />
              </Grid>
            </Grid>
          </GPaper>
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
