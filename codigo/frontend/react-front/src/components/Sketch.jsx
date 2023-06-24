import { useRef, useEffect } from 'react';
import p5 from 'p5';
import PropTypes from 'prop-types';

/**
 * Component that renders the algorithm result
 * @param {array} patterns - array of arrays that contains the patterns
 * @param {array} cuts - array of arrays that contains the number of times a pattern needs to be cut
 */
const Sketch = ({ patterns, cuts }) => {
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = new p5((p) => {


      for(let i = 0; i < 0; i++){
        patterns.push([1000, 1000, 1000, 1000, 2000, 100])
      }
      
      // Variables
      const scalingFactor = 20;
      const sketchContainer = document.querySelector('.sketch-container');
      const rect = sketchContainer.getBoundingClientRect();

      let canvasX = rect.left;
      let width  = sketchContainer.clientWidth;
      let height = sketchContainer.clientHeight;
      let spacing;
      let x;
      let w;
      var pmy;
      let last;
      let y = 0;
      let pressed;
      let upperBound = 0;
      let lowerBound = 0;
      let sum = 0;
      let biggestSum = 0;

      for (let i = 0; i < patterns.length; i++) {
        sum = 0;
        for (let j = 0; j < patterns[i].length; j++) {
          sum += patterns[i][j];
        }
        if (sum > biggestSum) {
          biggestSum = sum;
        }
      }

      p.setup = () => {
        let canvas = p.createCanvas(width, height);
        canvas.parent(sketchContainer);
        canvas.position(canvasX , 0);
      };

      p.windowResized = () => {
        width = sketchContainer.clientWidth;
        height = sketchContainer.clientHeight;
        p.resizeCanvas(width, height);
      };

      p.mousePressed = () => {
        pressed = true;
      };

      p.mouseReleased = () => {
        pressed = false;
      };

      p.mouseWheel = (event) => {
        y -= event.delta;
      }

      p.draw = () => {
        p.clear()
        click(pressed, p.mouseY, p.pmouseY);

        lowerBound = (patterns.length - 6) * -125;
        if (y > upperBound) {
          y = upperBound;
        } else if (y < lowerBound) {
          y = lowerBound;
        }
        p.translate(0, y);

        for (let j = 0; j < patterns.length; j++) {
          spacing = width / 2 + biggestSum / (2 * scalingFactor);
          for (let i = patterns[j].length - 1; i >= 0; i--) {
            last = false;
            x = spacing - patterns[j][i] / scalingFactor + 5;
            w = patterns[j][i] / scalingFactor;

            if (i === patterns[j].length - 1) {
              last = true;
            }

            desenhaBobina(p, x, 25, w, 70, scalingFactor, last);
            spacing -= patterns[j][i] / scalingFactor + 5;
          }
          p.textSize(18);
          p.text(cuts[j] + "x", spacing - 70, 70);
          p.translate(0, 125);
        }
      };

      function desenhaBobina(p, x, y, w, h, scalingFactor, last) {
        let texto = w*scalingFactor;
        let largura = p.textWidth(texto);
        p.stroke(0);

        if (last) {
          p.fill(255, 0, 0);
        } else {
          p.fill(255);
        }

        p.ellipse(x + w, y + h / 2, 0.4 * h, h);
        p.noStroke();
        p.rect(x, y, w, h);
        p.stroke(0);
        p.line(x, y, x + w, y);
        p.line(x, y + h, x + w, y + h);
        p.ellipse(x, y + h / 2, 0.4 * h, h);
        p.fill(100);
        p.ellipse(x, y + h / 2, (0.4 * h) / 5, h / 5);
        p.noStroke();
        p.textSize(14);
        p.text(w * scalingFactor, x + w/2 - largura*0.35, y + h + 20);
      }

      function click(apertou, mouseY, pmouseY) {
        if (apertou) {
          y += mouseY - pmouseY;
        }
        pmy = mouseY;
      }
    });

    // Save the reference to the sketch to destroy it when the component unmounts
    sketchRef.current = sketch;

    // Return a function to destroy the sketch
    return () => {
      sketchRef.current && sketchRef.current.remove();
    };
  }, [patterns, cuts]);

  Sketch.propTypes = {
    patterns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    cuts: PropTypes.arrayOf(PropTypes.number).isRequired,
  };

  return <div className="sketch-container" ref={sketchRef}></div>;
};

export default Sketch;
