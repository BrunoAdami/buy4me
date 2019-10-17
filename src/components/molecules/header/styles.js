import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import styled from 'styled-components';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const BlueAppBar = styled(AppBar)`
  background-color: #0096d4 !important;
`;

export const Logo = styled.img`
  height: 6vh;
`;
