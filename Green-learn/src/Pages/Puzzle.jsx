import React, { useEffect, useRef } from 'react';
import './PuzzleStyles.css';
import puzzleImg from '../assets/puzzle.png'; 


const answers = [
   [null, null, null, null, null, "P", null, null, null, null],
  ["R", "E", "C", "Y", "C", "L", "E", null, null, null],
  [null, null, null, null, null, "A", null, null, null, null],
  [null, null, null, "S", "U", "N", null, null, null, null],
  [null, null, null, "A", null, "T", "R", "A", "S", "H"],
  [null, null, null, "V", null, null, null, null, null, null],
  ["B", "I", "K", "E", null, null, null, null, null, null]

];

export default function Puzzle() {
  const containerRef = useRef(null);
  const inputsRef = useRef([]);
  const canvasRef = useRef(null);
  let confettiPieces = useRef([]);

  useEffect(() => {
    // Collect all input refs for navigation
    inputsRef.current = Array.from(
      containerRef.current.querySelectorAll('#crossword input')
    );
    // Handle responsive canvas
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleKeyUp = (e) => {
    const inputs = inputsRef.current;
    const idx = inputs.indexOf(e.target);
    const rowLen = 8;

    switch (e.key) {
      case 'ArrowRight':
        idx < inputs.length - 1 && inputs[idx + 1].focus();
        break;
      case 'ArrowLeft':
        idx > 0 && inputs[idx - 1].focus();
        break;
      case 'ArrowUp':
        idx - rowLen >= 0 && inputs[idx - rowLen].focus();
        break;
      case 'ArrowDown':
        idx + rowLen < inputs.length && inputs[idx + rowLen].focus();
        break;
      default:
        e.target.value && idx < inputs.length - 1 && inputs[idx + 1].focus();
    }
  };

  const startConfetti = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    confettiPieces.current = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 150; i++) {
      confettiPieces.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 10 + 5,
        color: ['#8bc34a', '#4caf50', '#009688', '#cddc39', '#ffeb3b', '#ffc107'][
          Math.floor(Math.random() * 6)
        ],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * 6.28,
        spin: Math.random() * 0.2 - 0.1,
        wave: Math.random() * 0.5 + 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiPieces.current.forEach(p => {
        p.y += p.speed;
        p.angle += p.spin;
        p.x += Math.sin((p.y * p.wave) / 100) * 2;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        if (p.y > canvas.height) {
          p.y = Math.random() * -100;
          p.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  };

  const checkAnswers = () => {
    const rows = containerRef.current.querySelectorAll('#crossword tr');
    rows.forEach((row, i) => {
      Array.from(row.cells).forEach((cell, j) => {
        const input = cell.querySelector('input');
        if (!input) return;
        const expected = answers[i][j];
        if (expected) {
          input.value = expected;
          cell.classList.add('correct');
          cell.classList.remove('incorrect');
        }
      });
    });
    startConfetti();
  };

  const clearAnswers = () => {
    inputsRef.current.forEach(input => {
      input.value = '';
      input.parentElement.classList.remove('correct', 'incorrect');
    });
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    confettiPieces.current = [];
  };

  return (
    <div
      className="puzzle-page"
      
      ref={containerRef}
    >
      <h1 className="playful-heading"> <img src={puzzleImg} alt="Puzzle Icon" className="heading-image" />
       Puzzle Mania
      </h1>

      <div className="pizzlecontainer">
        <div className="crossword-container">
          <table id="crossword">
            <tbody>
              {answers.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) =>
                    cell === null ? (
                      <td key={j} className="empty" />
                    ) : (
                      <td key={j} className="cell">
                        <input
                          maxLength={1}
                          onKeyUp={handleKeyUp}
                        />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="clues">
          <div className="across">
            <h3>Across</h3>
            <div className="clue">
              Trees provide this gas essential for human breathing. (6 letters)
            </div>
            <div className="clue">
              Trees help reduce this, making cities cooler. (4 letters)
            </div>

            <div className="down">
              <h3>Down</h3>
              <div className="clue">
                Trees provide this material used to make furniture and paper. (4 letters)
              </div>
              <div className="clue">
                Trees give us this sweet, sticky substance collected from bees. (5)
              </div>
              <div className="clue">
                Trees provide this to animals and people. (7 letters)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button className="button check-button" onClick={checkAnswers}>
          Check Answers
        </button>
        <button className="button clear-button" onClick={clearAnswers}>
          Clear Answers
        </button>
      </div>

      <canvas id="confetti" ref={canvasRef}></canvas>
    </div>
  );
}