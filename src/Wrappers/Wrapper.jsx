/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Styling Imports --------------------------------------------------------------- */
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/core/styles";
import {BreakpointProvider} from 'react-socks';
import './Wrapper.scss';


/* Component Imports ------------------------------------------------------------- */
import {ReduxWrapper} from "./ReduxWrapper";
import {Router} from "./Router";
import {ShutdownSnackbar} from "../Components/ShutdownSnackbar";


/* Component --------------------------------------------------------------------- */

const theme = createMuiTheme({
	palette : {
		primary: {
			main: 'hsl(227, 25%, 18%)',
			transparent80: 'hsla(227, 25%, 18%, 0.8)',
			transparent60: 'hsla(227, 25%, 18%, 0.6)',
			transparent40: 'hsla(227, 25%, 18%, 0.4)',
			transparent30: 'hsla(227, 25%, 18%, 0.3)',
			transparent20: 'hsla(227, 25%, 18%, 0.2)',
			transparent10: 'hsla(227, 25%, 18%, 0.1)',
		},
		secondary: {
			main: 'hsl(344, 93%, 50%)',
			transparent80: 'hsla(344, 93%, 50%, 0.8)',
			transparent60:  'hsla(344, 93%, 50%, 0.6)',
			transparent40:  'hsla(344, 93%, 50%, 0.4)',
			transparent30:  'hsla(344, 93%, 50%, 0.3)',
			transparent20:  'hsla(344, 93%, 50%, 0.2)',
			transparent10:  'hsla(344, 93%, 50%, 0.1)',
		},
		disabled: {
			main: 'hsla(227, 25%, 18%, 0.4)',
		},
		white: {
			main: 'rgb(255, 255, 255)',
			transparent80: 'rgba(255, 255, 255, 0.8)',
			transparent60: 'rgba(255, 255, 255, 0.6)',
			transparent40: 'rgba(255, 255, 255, 0.4)',
			transparent20: 'rgba(255, 255, 255, 0.2)',
		},
		gray1: 'hsl(0, 0%, 95%)',
		gray2: 'hsl(0, 0%, 90%)',
	}
});



export const Wrapper = () => {

	// window.console.log = () => {};
	// window.console.warn = () => {};
	// window.console.error = () => {};

	return(
		<ThemeProvider theme={theme}>
			<BreakpointProvider>
				<ReduxWrapper>
					<Router/>
					<ShutdownSnackbar/>
				</ReduxWrapper>
			</BreakpointProvider>
		</ThemeProvider>
	)
};

