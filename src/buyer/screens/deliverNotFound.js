import React from 'react';
import {Grid} from '@material-ui/core';
import Header from '../../components/molecules/header';
import Footer from '../../components/molecules/footer';
import GPaper from '../../components/atoms/gpaper';
import GButton from '../../components/atoms/button'

class DeliverNotFound extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Header name={this.props.name}/>
                <GPaper>
                    <Grid container spacing={4} direction="column" justify="center" alignItems="center">
                    <Grid item style={{ marginTop: '5em' }}>
                        <strong>Entregador não encontrado...</strong>
                    </Grid>
                    <Grid item style={{ margin: '15px 25px 15px 25px'}}>
                        Não foi possível encontrar um entregador, tente novamento mais tarde.
                    </Grid>
                    <Grid item>
                        <GButton type="blue" size="large" onClick={() => console.log('click')} text="VOLTAR" />
                    </Grid>
                    </Grid>
          </GPaper>                
                <Footer/>
            </React.Fragment>
        )
    }
}

export default DeliverNotFound;