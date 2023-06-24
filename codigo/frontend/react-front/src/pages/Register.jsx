import "../styles/Register.css";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Switch } from "@mui/material";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { Grid } from "@mui/material";
import recImage from "/rec.png";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopperComponent from "../components/Popper";
import UpdateMenu from "../components/UpdateMenu";

/**
 * Component that renders the register page
 */
const RegisterPage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openQuantity, setOpenQuantity] = useState(false);
    const [name, setName] = useState(null);
    const [machineMinWidth, setMachineMinWidth] = useState(null);
    const [machineWidth, setMachineWidth] = useState("");
    const [coilsPerRun, setCoilsPerRun] = useState("");
    const [multipleRuns, setMultipleRuns] = useState(false);
    const [numberOfRuns, setNumberOfRuns] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const [machines, setMachines] = useState([]);
    const [generatedButtons] = useState([]);
    const [openPopper, setOpenPopper] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [id, setId] = useState(null);
    const [update, setUpdate] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    useEffect(() => {
      fetch("http://localhost:3001/machines/")
        .then((response) => response.json())
        .then((data) => {
          setMachines(data);
        })
        .catch((error) => {
          console.error("Error fetching machines:", error);
        });
    }, [machines]);

    const containerStyle = {
      width: "100%",
      height: "100%",
    };

    const upload_page = (machineId) => {
      navigate(`/upload/${machineId}`);
    };

    const back = () => {
        navigate("/");
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleUpdateOpen = () => {
      setOpenPopper(false);
      setUpdate(true);
    };

    const changeInput = (e) => {
      if(e == false) {
        setOpenQuantity(false);
      } else {
        setOpenQuantity(true);
      }
    };
    
    const makePost = () => {
      try {
        if(name && machineWidth && coilsPerRun && machineMinWidth) {
          console.log(machineMinWidth);
          let data = {};
          if(openQuantity == false) {
            data = {
              "name": name,
              "machineWidth": machineWidth,
              "minimumWidth": machineMinWidth,
              "coilsPerRun": coilsPerRun,
              "multipleRuns": multipleRuns,
            };

          } else {
            data = {
              "name": name,
              "machineWidth": machineWidth,
              "minimumWidth": machineMinWidth,
              "coilsPerRun": coilsPerRun,
              "multipleRuns": multipleRuns,
              "numberOfRuns": numberOfRuns,
            };
          }
          axios.post("http://localhost:3001/machines/", data)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
          setOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
      setIsSubmit(true);
    };

    if(isSubmit && (!name || !machineWidth || !coilsPerRun || !machineMinWidth)) {
      alert("Preencha todos os campos!");
      setIsSubmit(false);
    }

    const getOptions = (machineName, id, minWidth, width, coil, runs, numRuns) => {
      setSelectedMachine(machineName);
      setId(id);
      setMachineMinWidth(minWidth);
      setMachineWidth(width);
      setCoilsPerRun(coil);
      setMultipleRuns(runs);
      setNumberOfRuns(numRuns);
      setOpenPopper(!openPopper); 
    };

    const handleDelete = (id) => { 
      console.log(id);
      setIdToDelete(id);
      setOpenDeleteDialog(true);
      setOpenPopper(false);
    };

    const handleDeleteMachine = () => { 
      axios.delete(`http://localhost:3001/machines/${idToDelete}`).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
      setOpenDeleteDialog(false);
    };

    const handleCloseDialog = () => {
      setOpenDeleteDialog(false);
    };

    return (
      <div style={containerStyle}>
        <Box sx={{ width: "1352px", height: "1280px", backgroundColor: "#3D4B14" }}>
          <Box sx={{ margin: "0 auto", justifyContent: "center", alignItems: "center", flexWrap: "wrap" ,overflow: "auto" ,width: "1280px", backgroundColor: "#3D4B14" }}>
            <Stack direction="row" justifyContent="flex-end">
                <img style={{ cursor: "pointer", width: "50px", height: "50px", marginRight: "50px" }} onClick={() => back()} src="Back.png" alt="Back icon" />
            </Stack>
            <div style={{ maxHeight: "calc(91vh - 2px)", display: "flex", alignItems: "flex-start" }}>
                  <Grid container spacing={2} alignItems="flex-start" >
                    <Grid item>
                        <Grid container spacing={2}>
                          <Grid item>
                            <img onClick={() => handleOpen()} style={{ cursor: "pointer" }} src={recImage} alt="" className="rec" />
                          </Grid>
                          {machines.map((machine) => (
                            <Grid item key={machine._id}>
                              <div className="machine-card">
                                <MoreVertIcon className="options-button" fontSize="large" id={machine._id} onClick={() => getOptions(machine.name, machine._id, machine.minimumWidth, machine.machineWidth, machine.coilsPerRun, machine.multipleRuns, machine.numberOfRuns)}/>
                                {openPopper && id === machine._id && <PopperComponent handleUpdate={handleUpdateOpen} handleDelete={() => handleDelete(machine._id)}/>}
                                <Button className="machine-result" onClick={() => upload_page(machine._id)}>
                                  <span className="btn-text">{machine.name}</span>
                                </Button>
                              </div>
                            </Grid>
                          ))}
                          {generatedButtons.map((button) => (
                            <Grid item key={generatedButtons.indexOf(button)}>
                              {button}
                            </Grid>
                          ))}
                        </Grid>
                    </Grid>
                  </Grid>
              </div>
        </Box>
        </Box>
        {update && <UpdateMenu open={update} setUpdate={setUpdate} machineName={selectedMachine} minWidth={machineMinWidth} width={machineWidth} coils={coilsPerRun} id={id} runs={multipleRuns} numRuns={numberOfRuns}/> }
        <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ height: "1000px", backgroundColor: "#E3DBCA" }}>
          <DialogContentText id="alert-dialog-description">
            <h2 style={{ color: "#009039" }}>Preencha os dados da máquina:</h2>
            <p style={{ color: "#009039" }}>Escreva nos campos abaixo os dados da máquina</p>
          </DialogContentText>
          <Stack spacing={7}>
            <Stack spacing={4} justifyContent="space-around" direction="row">
              <Stack>
                <Stack direction="row">
                  <p style={{ color: "#009039" }}>Largura min:</p>
                </Stack>
                <input type="text" required={true} name="" id="" onChange={(e) => setMachineMinWidth(e.target.value)} />
              </Stack>
              <Stack>
                <Stack direction="row">
                  <p style={{ color: "#009039" }}>Largura máx:</p>
                </Stack>
                <input type="text" required={true} name="" id="" onChange={(e) => setMachineWidth(e.target.value)} />
              </Stack>
            </Stack>
            <Stack justifyContent="space-around" direction="row">
              <Stack>
                <Stack direction="row">
                  <p style={{ color: "#009039" }}>Bobinas por tirada:</p>
                </Stack>
                <input type="text" name="" id="" onChange={(e) => setCoilsPerRun(e.target.value)} />
              </Stack>
              <Stack ml={1}>
                <Stack direction="row">
                    <p style={{ color: "#009039" }}>Nome da máquina:</p>
                </Stack>
                <input type="text" name="" id="" onChange={(e) => setName(e.target.value)} />
              </Stack>
            </Stack>
            <Stack justifyContent="space-beetween" direction="row">
              <Stack>
                <Stack ml={5} direction="row">
                  <p style={{ color: "#009039" }}>Tiradas Múltiplas?</p>
                  <Switch checked={openQuantity} onChange={(e) => setMultipleRuns(e.target.checked)} onClick={(e) => changeInput(e.target.checked)} sx={{ marginTop: "12px" }} defaultChecked={true} />
                </Stack>
                <Stack ml={5} direction="row">
                  <p style={{ color: "#009039" }}>Quantas?</p>
                    <input onChange={(e) => setNumberOfRuns(e.target.value)} disabled={!openQuantity} style={{ marginTop: "20px", width: "50px", marginLeft: "10px", height: "20px" }} type="text" name="" id="" />
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing={5} direction="row" justifyContent="space-between">
              <Button onClick={() => handleClose()} sx={{ width: "200px", backgroundColor: "#E3DBCA", color: "#009039", "&:hover": { backgroundColor: "#E3DBCA" } }} variant="contained">Cancelar</Button>
              <Button onClick={() => makePost()} sx={{ width: "200px", backgroundColor: "#009039", color: "#E3DBCA", "&:hover": { backgroundColor: "#009039" } }} variant="contained">Confirmar</Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
        <div>
          <Dialog
            open={openDeleteDialog}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent >
              <DialogContentText>
                Deseja mesmo excluir essa máquina?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button sx={{ color: "#009039" }} onClick={handleCloseDialog}>
                CANCELAR
              </Button>
              <Button sx={{ color: "#009039" }} onClick={handleDeleteMachine}>
                EXCLUIR
              </Button>
            </DialogActions>
          </Dialog>
      </div>
     </div>
    );
};

export default RegisterPage;