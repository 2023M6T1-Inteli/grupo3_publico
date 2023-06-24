import "../styles/Result.css";
import { useState, useEffect } from 'react';
import Sketch from "../components/Sketch";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import documentIcon from "/document-icon.png";
import goBack from "/Go_Back.png";

/**
 * Component that renders the result page
 */
const Result = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSketch, setShowSketch] = useState(false);
  const [patterns, setPatterns] = useState(null);
  const [cuts, setCuts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [machineInfo, setMachineInfo] = useState(null);

  useEffect(() => {
    const fetchMachineInfo = async () => {
      try {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        
        const response = await axios.get(
          `http://localhost:3001/machines/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
        const machineInfoData = response.data;
        setMachineInfo(machineInfoData);
      } catch (error) {
        console.error('Erro ao buscar informações da máquina:', error);
        alert('Erro ao buscar informações da máquina');
      }
    };

    fetchMachineInfo();
  }, []);

  // const history = useHistory();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const navigate = useNavigate();
  const backPage = () => {
    navigate("/register");
  };
  const handleClick = async () => {
    if (selectedFile != null) {
      setSelectedFile(null);
      setLoading(true);
      setShowSketch(false);
      const loadingDelay = 2000;
      setTimeout(async () => {
        try {
          const response = await axios.post('http://localhost:3001/algorithm/', {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            informationMachine: {
              maxRollWidth: machineInfo?.machineWidth,
              minimumWidth: machineInfo?.minimumWidth,
              maxCuts: machineInfo?.coilsPerRun,
              multipleRuns: machineInfo?.multipleRuns,
              numberOfRuns: machineInfo?.numberOfRuns,
            },
            fileName: selectedFile.name,
          });
          const patternsData = response.data.patterns;
          const cutsData = response.data.cutsPerPattern;
          setCuts(cutsData);
          setPatterns(patternsData);
          setShowSketch(true);
        } catch (error) {
          alert(error);
        } finally {
          setLoading(false);
        }
      }, loadingDelay);
      setShowSketch(false);
    } else {
      alert('Selecione um arquivo');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await axios.post('http://localhost:3001/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Allow-Control-Allow-Origin': '*'
        }
      });
      alert('Arquivo enviado com sucesso!');
    } catch (error) {
      alert('Erro ao enviar o arquivo:', error);
    }
  };

  useEffect(() => {
    if(selectedFile) {
        handleSubmit(event);
    }
  })

  return (
    <div className="page-body">
      <div className="menu">
        <div className="form">
          <div className="text-area">
            <h3 style={{ fontFamily: 'Raleway, sans-serif', marginLeft: "15px" }} className="initial-text">{machineInfo?.name}</h3>
            <h6 style={{ fontFamily: 'Raleway, sans-serif', marginLeft: "15px" }} className="second-text">Adicione a sua planilha de demandas no espaço abaixo e clique em calcular</h6>
          </div>
          <label className="upload-area" style={{ marginTop: "30px" }}>
              <div className="upload-border">
                <h3 style={{ fontFamily: 'Raleway, sans-serif' }} className="upload-text">Clique aqui para selecionar um arquivo</h3>
                <input onSubmit = {handleSubmit} type="file" accept=".csv" style={{display: "none"}} className="input-csv" id="" onClick={handleFileChange} onChange={handleFileChange}  />
                <img src={documentIcon} className="document-icon" alt="" />
              </div>
          </label> 
          <img src={goBack} onClick = {backPage} className="go_back-icon" alt="" />
        </div>
        <div className="menu-buttons" style={{ marginTop: "30px", marginLeft: "10px" }}>
          <button style={{ fontFamily: 'Raleway, sans-serif' }} className="solveButton" onClick={handleClick}>Calcular</button>
        </div> 
        </div>
      {loading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      <div className="sketch">
        {!loading && showSketch && patterns && cuts && <Sketch patterns={patterns} cuts={cuts}/>}
      </div>
    </div>
  );
};

export default Result;