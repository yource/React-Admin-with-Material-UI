import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './index/Layout';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/Button';
import './static/css/Material_roboto.css';
import './static/css/Material_icon.css';
import './index/index.scss';
import store from './reducer';

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <SnackbarProvider maxSnack={3} hideIconVariant
      anchorOrigin={{vertical: 'top',horizontal: 'right'}} 
      transitionDuration={{ exit: 150, enter: 350 }}
      autoHideDuration={2600}
      style={{fontSize:"16px"}}
      action={[
        <IconButton key="closeSnackbar" size="small"><CloseIcon style={{color:"#fff",fontSize:"18px"}}/></IconButton>
      ]}>
      <Layout />
    </SnackbarProvider>
  </Provider> , 
document.getElementById('root'));
