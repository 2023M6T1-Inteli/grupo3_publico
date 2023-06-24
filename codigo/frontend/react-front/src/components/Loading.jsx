import { useRef, useEffect } from 'react';
import p5 from 'p5';
import PropTypes from 'prop-types';

/**
 * Component that renders the loading animation
 * @param {boolean} loading - boolean that indicates if the loading animation should be rendered
 */
const Loading = ({ loading }) => {
    const sketchRef = useRef(null);
    var cylinderX = 0
    var diameter = 90
    var boxZ = 90
    var boxWidth = 170
    var rolled = true
    var direction = -1

    useEffect(() => {
      const sketch = new p5(async (p) => {
        p.setup = () => {
            let canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
            canvas.position(0, 0);
        }
          
        p.draw = () => {
            p.background("#00000080");
            p.rotateZ(p.PI/2)
            p.rotateX(p.PI/5)
            
            p.push()
            p.translate(cylinderX,0,0)
            p.rotateY(p.frameCount * 0.01 * direction)
            p.cylinder(diameter, 300);
            if(diameter > 0 && rolled){
                diameter -= 0.2
                cylinderX += 0.2
            }
            else{
                diameter += 0.2
                cylinderX -= 0.2
            }
            
            p.pop()
            
            p.push()
            p.translate(90, 0, boxZ)
            p.rotateY(p.PI/2)
            p.box(boxWidth, 300, 0)
            if(rolled){
                boxWidth += 0.5
                boxZ += 0.25 
            }
            else{
                boxWidth -= 0.5
                boxZ -= 0.25 
            }
            p.pop()
            
            if(diameter <= 60){
                rolled = false
                direction = 1
            }
            if(boxWidth == 170 && diameter == 90){
                rolled = true
                direction = -1
            }
        }
      });

        // Salva a referência do sketch para destruí-lo quando o componente for desmontado
        sketchRef.current = sketch;

      // Retorna uma função de limpeza para destruir o sketch
      return () => {
          sketchRef.current.remove();
      };
    }, []);

        return loading ? <div className="loading" ref={sketchRef}></div> : null;
  };

    Loading.propTypes = {
        loading: PropTypes.bool.isRequired,
    };

  export default Loading;