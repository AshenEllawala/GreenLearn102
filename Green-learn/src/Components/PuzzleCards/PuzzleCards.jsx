
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PuzzleCards.css';
import puzA from '../../assets/1puz.png';
import puzB from '../../assets/2puz.png';
import puzC from '../../assets/3puz.png';
import puzD from '../../assets/4puz.png';
import puzE from '../../assets/5puz.png';
const puzzleCategories = [
  {
    
    id: 1,
    title: 'Animal Puzzle',
    bgColor: '#FFEB3B', // Yellow
    img: puzA,
    description: 'Test your animal smarts - Can you beat the wildest quiz?',
    puzzles: [
      { id: 'animal1', title: 'Lion Quiz', route: '/puzzle2' },
      { id: 'animal2', title: 'Bird Quiz', route: '/puzzle/animal2' },
    ],
  },
  
  {
    id: 2,
    title: 'Tree Puzzle',
    bgColor: '#81C784', 
    img: puzB,
    description: 'Learn about trees with this fun puzzle.',
    puzzles: [
      { id: 'tree1', title: 'Oak Puzzle', route: '/puzzle' },
      { id: 'tree2', title: 'Pine Puzzle', route: '/puzzle/tree2' },
    ],
  },
  {
    id: 3,
    bgColor: '#4FC3F7',
    img: puzC,
    title: 'Recycling Puzzle',
    description: 'How well do you know recycling?',
    puzzles: [
      { id: 'recycle1', title: 'Plastic Puzzle', route: '/puzzle3' },
      { id: 'recycle2', title: 'Paper Puzzle', route: '/puzzle/recycle2' },
    ],
  },
  {
    id: 4,
    bgColor: '#BA68C8',
    img:puzD,
    title: 'Water Puzzle',
    description: 'Explore the water cycle with a puzzle.',
    puzzles: [
      { id: 'water1', title: 'Rain Cycle', route: '/puzzle4' },
      { id: 'water2', title: 'River Puzzle', route: '/puzzle/water2' },
    ],
  },
  {
    id: 5,
    bgColor: '#FF8A65',
    img: puzE,
    title: 'Energy Puzzle',
    description: 'Unlock powerful ways to save for a greener tomorrow!',
    puzzles: [
      { id: 'energy1', title: 'Solar Power', route: '/puzzle5' },
      { id: 'energy2', title: 'Wind Energy', route: '/puzzle/energy2' },
    ],
  },
];

const PuzzleCards = () => {
  const navigate = useNavigate();

  // Navigate to a category page that lists all puzzles of that category
  // Or for now, just navigate to the first puzzle in that category
  const handlePlayNow = (category) => {
    if (category.puzzles.length > 0) {
      navigate(category.puzzles[0].route); // Navigate to first puzzle's route
    } else {
      alert('No puzzles available yet');
    }
  };

  return (
    
    <div className="puzzle-cards-container">
      {puzzleCategories.map((category) => (
        <div
          key={category.id}
          className="puzzle-card"
          style={{ backgroundColor: category.bgColor }}
        >
          <img src={category.img} alt="Puzzle Icon" />
          <h3>{category.title}</h3>
          <p>{category.description}</p>
          <button onClick={() => handlePlayNow(category)}>Play Now</button>
        </div>
      ))}
    </div>
  );
};

export default PuzzleCards;
