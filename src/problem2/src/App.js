import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: "400px",
    marginTop: theme.spacing(2),
    margin: "auto",
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  themeButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const lightTheme = createTheme({
  palette: {
    type: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [otp, setOTP] = useState("");

  const [isOTPValid, setIsOTPValid] = useState(true);
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // can be a yup check
  const [addError, setAddError] = useState(false);

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const classes = useStyles();

  const handleThemeChange = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleOTPChange = (event) => {
    const value = event.target.value;

    const regex = /^[0-9\b]+$/;
    if (value === "" || regex.test(value)) {
      setOTP(value);
    }
    // Check if the OTP is valid
    setIsOTPValid(/^\d{6}$/.test(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form inputs
    let isValid = true;
    if (address.trim() === "") {
      setAddError(true);
      isValid = false;
    } else {
      setAddError(false);
    }

    if (amount < 1) {
      console.log(amount);
      isValid = false;
      setIsAmountValid(false);
    } else {
      setIsAmountValid(true);
    }

    setIsOTPValid(/^\d{6}$/.test(otp));

    if (isValid) {
      console.log("Form submitted successfully!");
      setIsLoading(true);
      setTimeout(() => {
        //Simulate delay for 2 seconds
        setIsSuccessDialogOpen(true);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleSuccessDialogClose = () => {
    setIsSuccessDialogOpen(false);
  };
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h3" align="center" gutterBottom>
              Fancy Form
            </Typography>
            <form onSubmit={handleSubmit} className={classes.root}>
              <TextField
                label="ETH Address"
                variant="outlined"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                error={addError}
                helperText={addError ? "Please enter ETH Address" : null}
              />
              <TextField
                label="Amount to send"
                variant="outlined"
                value={amount}
                type="number"
                onChange={(event) => setAmount(event.target.value)}
                error={!isAmountValid}
                helperText={!isAmountValid ? "Please enter amount" : null}
              />
              <TextField
                label="OTP Authentication"
                variant="outlined"
                value={otp}
                onChange={handleOTPChange}
                error={!isOTPValid}
                helperText={
                  !isOTPValid ? "Please enter a valid 6-digit OTP" : ""
                }
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submitButton}
              >
                {isLoading ? <CircularProgress size={24} /> : " SEND TOKENS"}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={isSuccessDialogOpen} onClose={handleSuccessDialogClose}>
        <DialogTitle>Transaction Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>Your Token successfully Sent.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip
        title={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
      >
        <IconButton className={classes.themeButton} onClick={handleThemeChange}>
          {isDarkTheme ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    </ThemeProvider>
  );
}

export default App;
