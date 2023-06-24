import { Stack } from "@mui/material";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { Button, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

/**
 * Component that renders the form to update a machine
 * @param {string} machineName - name of the machine
 * @param {number} minWidth - minimum width of the machine
 * @param {number} width - maximum width of the machine
 * @param {number} coils - number of coils per run
 * @param {number} id - id of the machine
 * @param {boolean} open - boolean that indicates if the form is open
 * @param {boolean} runs - boolean that indicates if the machine has multiple runs
 * @param {number} numRuns - number of runs of the machine
 * @param {function} setUpdate - function that sets the update of the machine
 */
const UpdateMenu = ({ machineName, minWidth, width, coils, id, open, runs, numRuns, setUpdate}) => {
    const [openForm, setOpenForm] = useState(false);
    const [name, setName] = useState(machineName);
    const [machineMinWidth, setMachineMinWidth] = useState(minWidth);
    const [machineWidth, setMachineWidth] = useState(width);
    const [coilsPerRun, setCoilsPerRun] = useState(coils);
    const [multipleRuns, setMultipleRuns] = useState(false);
    const [numberOfRuns, setNumberOfRuns] = useState(numRuns);
    const [openQuantity, setOpenQuantity] = useState(false);
    
    useEffect(() => {
        setMachineMinWidth(minWidth);
        setMachineWidth(width);
        setName(machineName);
        setCoilsPerRun(coils);
        setNumberOfRuns(numRuns);
        setOpenQuantity(runs);
    }, [machineName, minWidth, width, coils, numRuns, runs]);

    useEffect(() => {
        setOpenForm(open);
    }, [open]);

    const changeInput = (e) => {
        if (!e) {
          setOpenQuantity(false);
        } else {
          setOpenQuantity(true);
        }
        setMultipleRuns(runs);
    };

    const handleClose = () => {
        setOpenForm(false);
        setUpdate(false);
    };

    // Update the machine in the database
    const update = async () => {
        try {
            if(name && machineWidth && coilsPerRun && machineMinWidth) {
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
                await axios.put("http://localhost:3001/machines/" + id, data)
                .then(() => {
                    alert("Máquina atualizada com sucesso!");
                })
                .catch((error) => {
                console.log(error);
                });
                setOpenForm(false);
                setUpdate(false);
            }
            else {
                alert("Preencha todos os campos!");
            }
            } catch (error) {
            console.log(error);
            }
    }

    return (
        <div>
            <Dialog
                open={openForm}
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
                    <input
                        value={machineMinWidth}
                        type="text"
                        required={true}
                        name=""
                        id=""
                        onChange={(e) => setMachineMinWidth(e.target.value)}
                    />
                    </Stack>
                    <Stack>
                    <Stack direction="row">
                        <p style={{ color: "#009039" }}>Largura máx:</p>
                    </Stack>
                    <input
                        type="text"
                        required={true}
                        name=""
                        id=""
                        value={machineWidth}
                        onChange={(e) => setMachineWidth(e.target.value)}
                    />
                    </Stack>
                </Stack>
                <Stack justifyContent="space-around" direction="row">
                    <Stack>
                    <Stack direction="row">
                        <p style={{ color: "#009039" }}>Bobinas por tirada:</p>
                    </Stack>
                    <input
                        type="text"
                        name=""
                        id=""
                        value={coilsPerRun}
                        onChange={(e) => setCoilsPerRun(e.target.value)}
                    />
                    </Stack>
                    <Stack ml={1}>
                    <Stack direction="row">
                        <p style={{ color: "#009039" }}>Nome da máquina:</p>
                    </Stack>
                    <input
                        type="text"
                        name=""
                        id=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </Stack>
                </Stack>
                <Stack justifyContent="space-beetween" direction="row">
                    <Stack>
                    <Stack ml={5} direction="row">
                        <p style={{ color: "#009039" }}>Tiradas Múltiplas?</p>
                        <Switch
                        checked={openQuantity}
                        onChange={(e) => setMultipleRuns(e.target.checked)}
                        onClick={(e) => changeInput(e.target.checked)}
                        sx={{ marginTop: "12px" }}
                        />
                    </Stack>
                    <Stack ml={5} direction="row">
                        <p style={{ color: "#009039" }}>Quantas?</p>
                        <input
                        onChange={(e) => setNumberOfRuns(e.target.value)}
                        disabled={!openQuantity}
                        style={{
                            marginTop: "20px",
                            width: "50px",
                            marginLeft: "10px",
                            height: "20px",
                        }}
                        type="text"
                        name=""
                        id=""
                        value={numberOfRuns}
                        />
                    </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={5} direction="row" justifyContent="space-between">
                    <Button
                    onClick={() => handleClose()}
                    sx={{
                        width: "200px",
                        backgroundColor: "#E3DBCA",
                        color: "#009039",
                        "&:hover": { backgroundColor: "#E3DBCA" },
                    }}
                    variant="contained"
                    >
                    Cancelar
                    </Button>
                    <Button
                    onClick={() => update()}
                    sx={{
                        width: "200px",
                        backgroundColor: "#009039",
                        color: "#E3DBCA",
                        "&:hover": { backgroundColor: "#009039" },
                    }}
                    variant="contained"
                    >
                    Confirmar
                    </Button>
                </Stack>
                </Stack>
            </DialogContent>
            </Dialog>
        </div>
    )
}

UpdateMenu.propTypes = {
    machineName: PropTypes.string,
    minWidth: PropTypes.string,
    width: PropTypes.string,
    coils: PropTypes.string,
    id: PropTypes.string,
    open: PropTypes.bool,
    setUpdate: PropTypes.func,
    runs: PropTypes.bool,
    numRuns: PropTypes.number,
}

export default UpdateMenu