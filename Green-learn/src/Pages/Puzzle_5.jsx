import React, { useEffect, useRef, useState } from 'react';
import './PuzzleStyles.css';
import puzzleImg from '../assets/puzzle.png';

const answers = [
  ['E', null, null, null, null, null, null, null, null, null, 'P', null],
  ['C', 'O', 'N', 'S', 'E', 'R', 'V', 'A', 'T', 'I', 'O', 'N'],
  ['O', null, null, null, null, null, null, null, null, null, 'L', null],
  ['S', null, null, null, null, null, null, null, null, null, 'L', null],
  ['Y', null, null, null, null, null, null, null, null, null, 'U', null],
  ['S', null, null, null, null, 'C', 'L', 'I', 'M', 'A', 'T', 'E'],
  ['t', null, null, null, null, null, null, null, null, null, 'I', null],
  ['E', null, null, null, null, null, null, null, null, null, 'T', null],
  ['M', null, null, 'R', 'E', 'C', 'Y', 'C', 'L', 'I', 'N', 'G'],
];

export default function Puzzle() {
  const containerRef = useRef(null);
  const inputsRef = useRef([]);
  const canvasRef = useRef(null);
  const confettiPieces = useRef([]);
  const [showUsed, setShowUsed] = useState(false);

  useEffect(() => {
    inputsRef.current = Array.from(
      containerRef.current.querySelectorAll('#crossword input')
    );

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleKeyUp = (e) => {
    const inputs = inputsRef.current;
    const index = inputs.indexOf(e.target);
    const cols = 15;

    switch (e.key) {
      case 'ArrowRight':
        if (index + 1 < inputs.length) inputs[index + 1].focus();
        break;
      case 'ArrowLeft':
        if (index - 1 >= 0) inputs[index - 1].focus();
        break;
      case 'ArrowUp':
        if (index - cols >= 0) inputs[index - cols].focus();
        break;
      case 'ArrowDown':
        if (index + cols < inputs.length) inputs[index + cols].focus();
        break;
      default:
        if (/^[a-zA-Z]$/.test(e.key) && index + 1 < inputs.length) {
          inputs[index + 1].focus();
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
        color: ['#8bc34a', '#4caf50', '#009688', '#cddc39', '#ffeb3b', '#ffc107'][Math.floor(Math.random() * 6)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.2 - 0.1,
        wave: Math.random() * 0.5 + 0.5,
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

        if (expected && input && !input.classList.contains('correct')) {
          input.value = expected;
          input.classList.remove('incorrect');
          input.classList.add('reveal');
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

      <div className="puzzlecontainer">
        <div className="crossword-and-clues">
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
                            autoComplete="off"
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
                The responsible management and protection of natural resources to prevent exploitation and preserve the environment. (11)
              </div>
              <div className="clue">
                The average weather conditions in a region over a long period of time. (7)
              </div>
              <div className="clue">
                The process of converting waste into reusable material to reduce environmental impact. (9)
              </div>
            </div>

            <div className="down">
              <h3>Down</h3>
              <div className="clue">
                A community of living organisms interacting with each other and their natural environment. (9)
              </div>
              <div className="clue">
                The presence of harmful substances in the air, water, or soil that affects living organisms. (9)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button className="button submit-button" onClick={submitAnswers}>Submit</button>
        <button className="button show-button" onClick={showCorrectAnswers}>Show Answers</button>
        <button className="button clear-button" onClick={clearAll}>Clear</button>
      </div>

      <canvas id="confetti" ref={canvasRef} />
    </div>
  );
}
