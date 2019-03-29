// 定制 Material主题
// default theme  https://material-ui.com/customization/default-theme/

import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: amber[500],
            main: amber[600],
            dark: amber[700],
        },
        dark1: "rgba(0,0,0,0.8)",
        secondary: {
            light: red[500],
            main: red[600],
            dark: red[800],
        },
    },
    shape: {
        borderRadius: 8,
    }
});

export default {
    ...theme,
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: '#13212f',
            },
            paperAnchorDockedLeft:{
                borderRight: "none",
                boxShadow: "0 0 10px #666"
            }
        },
        MuiButton: {
            label: {
                textTransform: 'initial',
                fontSize:"15px"
            },
            contained: {
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                },
            },
            fullWidth:{
                width:"80%"
            },
            containedPrimary:{
                color:"#fff"
            }
        },
        MuiIconButton: {
            root: {
                padding: theme.spacing.unit,
                color:"rgba(67, 74, 84, 0.5)"
            },
        },
        MuiDivider: {
            root: {
                backgroundColor: '#404854',
            },
        },
        MuiListItemText: {
            root:{
                paddingLeft:"4px"
            },
            primary: {
                fontWeight: theme.typography.fontWeightMedium,
            },
        },
        MuiListItemIcon: {
            root: {
                color: 'inherit',
                marginRight: 0,
                '& svg': {
                    fontSize: 22,
                },
            },
        },
        MuiListItemSecondaryAction:{
            root:{
                right:"10px"
            }
        },
        MuiAvatar: {
            root: {
                width: 32,
                height: 32,
            },
        },
        MuiTabs:{
            root: {
                borderBottom: "1px solid rgba(0,0,0,0.12)"
            },
            indicator:{
                backgroundColor: theme.palette.primary.main
            },
        },
        MuiTab:{
            label:{
                fontSize:"15px"
            },
            selected: {
                color: theme.palette.primary.main
            }
        },
        MuiDialog:{
            paper:{
                minWidth:"400px"
            }
        },
        MuiTableCell:{
            body:{
                fontSize:"1rem"
            }
        }
    }
};
