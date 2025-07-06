import React, { useEffect, useRef, useState } from 'react';
import './PuzzleStyles.css';
import puzzleImg from '../assets/puzzle.png'; 


const answers = [
  [null, null, null, null, null, null, null, 'S'],
  [null, null, null, null, null, null, null, 'H'],
  [null, null, null, null, null, null, null, 'E'],
  [null, null, null, null, null, null, null, 'L'],
  [null, null, null, null, 'H', 'E', 'A', 'T'],
  ['W', null, null, null, 'O', null, null, 'E'],
  ['O', null, null, null, 'N', null, null, 'R'],
  ['O', 'X', 'Y', 'G', 'E', 'N', null, null],
  ['D', null, null, null, 'Y', null, null, null]
];

export default function Puzzle() {
  const containerRef = useRef(null);
  const inputsRef = useRef([]);
  const canvasRef = useRef(null);
  let confettiPieces = useRef([]);
  const [showUsed, setShowUsed] = useState(false);

  useEffect(() => {
    inputsRef.current = Array.from(
      containerRef.current.querySelectorAll('#crossword input')
    );

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
    const currentIndex = inputs.indexOf(e.target);
    const totalCols = 8;

    switch (e.key) {
      case 'ArrowRight':
        if (currentIndex + 1 < inputs.length) {
          inputs[currentIndex + 1].focus();
        }
        break;
      case 'ArrowLeft':
        if (currentIndex - 1 >= 0) {
          inputs[currentIndex - 1].focus();
        }
        break;
      case 'ArrowUp':
        if (currentIndex - totalCols >= 0) {
          inputs[currentIndex - totalCols].focus();
        }
        break;
      case 'ArrowDown':
        if (currentIndex + totalCols < inputs.length) {
          inputs[currentIndex + totalCols].focus();
        }
        break;
      default:
        if (/^[a-zA-Z]$/.test(e.key) && currentIndex + 1 < inputs.length) {
          inputs[currentIndex + 1].focus();
        }
        break;
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

  const submitAnswers = () => {
    const rows = containerRef.current.querySelectorAll('#crossword tr');
    let allCorrect = true;

    rows.forEach((row, i) => {
      Array.from(row.cells).forEach((cell, j) => {
        const input = cell.querySelector('input');
        const expected = answers[i][j];

        if (expected && input) {
          if (input.value.toUpperCase() === expected.toUpperCase()) {
            input.classList.add('correct');
            input.classList.remove('incorrect', 'reveal');
          } else {
            allCorrect = false;
            input.classList.add('incorrect');
            input.classList.remove('correct', 'reveal');
          }
        }
      });
    });

    if (allCorrect) {
      startConfetti();
    }
  };

  const showCorrectAnswers = () => {
    if (showUsed) return;

    const rows = containerRef.current.querySelectorAll('#crossword tr');

    rows.forEach((row, i) => {
      Array.from(row.cells).forEach((cell, j) => {
        const input = cell.querySelector('input');
        const expected = answers[i][j];

        if (expected && input) {
          if (!input.classList.contains('correct')) {
            input.value = expected;
            input.classList.remove('incorrect');
            input.classList.add('reveal');
          }
        }
      });
    });

    setShowUsed(true);
  };

  const clearAll = () => {
    inputsRef.current.forEach(input => {
      input.value = '';
      input.classList.remove('correct', 'incorrect', 'reveal');
    });

    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    confettiPieces.current = [];
    setShowUsed(false);
  };

  return (
    <div className="puzzle-page" ref={containerRef}>
      <h1 className="playful-heading">
        <img src={puzzleImg} alt="Puzzle Icon" className="heading-image" />
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
            <div className="clue">Trees provide this gas essential for human breathing. (6 letters)</div>
            <div className="clue">Trees help reduce this, making cities cooler. (4 letters)</div>
          </div>

          <div className="down">
            <h3>Down</h3>
            <div className="clue">Trees provide this material used to make furniture and paper. (4 letters)</div>
            <div className="clue">Trees give us this sweet, sticky substance collected from bees. (5 letters)</div>
            <div className="clue">Trees provide this to animals and people. (7 letters)</div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button className="button submit-button" onClick={submitAnswers}>Submit</button>
        <button className="button show-button" onClick={showCorrectAnswers}>Show Answers</button>
        <button className="button clear-button" onClick={clearAll}>Clear</button>
      </div>

      <canvas id="confetti" ref={canvasRef}></canvas>
    </div>
  );
}