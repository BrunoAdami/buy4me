import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles, BlueAppBar, Logo } from './styles';
import logo from '../../../assets/images/logo-buy4me.png';
import Grid from '@material-ui/core/Grid';

export default function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BlueAppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Logo src={logo} alt="LivUp logo" title="LivUp" />
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                {props.userName}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </BlueAppBar>
    </div>
  );
}
