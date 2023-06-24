import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

/**
 * Component that renders the home page
 */
const IndexPage = () => {
    const navigate = useNavigate();
    const changePage = () => {
        navigate("/register");
    };
    return (
        <div className="main">
            <div className="content">
            <h1>Otimize Seus Cortes Diários</h1>
            <h3>Padrões de corte que reduzem o número de trocas da posição das facas</h3>
            <button onClick={() => changePage()}>COMEÇAR</button>
            </div>
            <div>
                <img src="paper.png" className="first" alt="" />
            </div>
        </div>


    );
};
export default IndexPage;