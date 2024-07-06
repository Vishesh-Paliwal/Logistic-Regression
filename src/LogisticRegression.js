// import React, { useState, useRef, useEffect, useCallback } from 'react';

// const LogisticRegressionCanvas = () => {
//   const canvasRef = useRef(null);
//   const [data, setData] = useState([]);
//   const [hoverPoint, setHoverPoint] = useState(null);
//   const [m, setM] = useState(0);
//   const [b, setB] = useState(0);

//   // Use useCallback to memoize the draw function
//   const draw = useCallback(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw background
//     ctx.fillStyle = 'grey';  // Set your desired background color
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Draw axes
//     ctx.strokeStyle = 'white';
//     ctx.beginPath();
//     ctx.moveTo(0, canvas.height);
//     ctx.lineTo(canvas.width, canvas.height);
//     ctx.lineTo(canvas.width, 0);
//     ctx.stroke();
//     ctx.fillText('x', canvas.width - 10, canvas.height - 10);
//     ctx.fillText('y', 10, 10);

//     if (data.length > 1) {
//       logisticRegression();
//     }

//     // Draw points and details
//     for (let i = 0; i < data.length; i++) {
//       const x = map(data[i].x, 0, 1, 0, canvas.width);
//       const y = map(data[i].y, 0, 1, canvas.height, 0);
//       let col = 'green';
//       const predictedY = logisticFunction(data[i].x);
//       if (predictedY < data[i].y) col = 'red';
//       ctx.fillStyle = col;
//       ctx.beginPath();
//       ctx.arc(x, y, 4, 0, 2 * Math.PI);
//       ctx.fill();

//       // Highlight the point if hovered
//       if (hoverPoint && hoverPoint.x === data[i].x && hoverPoint.y === data[i].y) {
//         ctx.fillStyle = 'yellow';
//         ctx.fillText(`(${data[i].x.toFixed(2)}, ${data[i].y.toFixed(2)})`, x + 5, y - 5);
//       }
//     }

//     if (data.length > 1) {
//       drawCurve();
//       // Display logistic regression line equation
//       ctx.fillStyle = 'white';
//       ctx.fillText(`y = 1 / (1 + e^(-(${m.toFixed(2)} * x + ${b.toFixed(2)})))`, 10, canvas.height - 20);
//     }
//   }, [data, hoverPoint, m, b]);

//   useEffect(() => {
//     draw();
//   }, [data, hoverPoint, m, b, draw]);

//   const handleCanvasClick = (event) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = (event.clientX - rect.left) / (rect.right - rect.left);
//     const y = 1 - (event.clientY - rect.top) / (rect.bottom - rect.top);

//     const point = { x, y };
//     setData((prevData) => [...prevData, point]);
//   };

//   const handleCanvasMouseMove = (event) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = (event.clientX - rect.left) / (rect.right - rect.left);
//     const mouseY = 1 - (event.clientY - rect.top) / (rect.bottom - rect.top);

//     let foundHoverPoint = null;
//     for (let i = 0; i < data.length; i++) {
//       const dist = Math.sqrt(Math.pow(mouseX - data[i].x, 2) + Math.pow(mouseY - data[i].y, 2));
//       if (dist < 0.02) {
//         foundHoverPoint = data[i];
//         break;
//       }
//     }
//     setHoverPoint(foundHoverPoint);
//   };

//   const logisticRegression = () => {
//     const learningRate = 0.1;
//     const epochs = 1000;

//     let theta0 = 0; // Intercept
//     let theta1 = 0; // Slope

//     for (let epoch = 0; epoch < epochs; epoch++) {
//       let theta0Gradient = 0;
//       let theta1Gradient = 0;

//       for (let i = 0; i < data.length; i++) {
//         const x = data[i].x;
//         const y = data[i].y;
//         const predictedY = sigmoid(theta0 + theta1 * x);

//         theta0Gradient += (predictedY - y);
//         theta1Gradient += (predictedY - y) * x;
//       }

//       theta0 -= (learningRate / data.length) * theta0Gradient;
//       theta1 -= (learningRate / data.length) * theta1Gradient;
//     }

//     setM(theta1);
//     setB(theta0);
//   };

//   const sigmoid = (z) => {
//     return 1 / (1 + Math.exp(-z));
//   };

//   const logisticFunction = (x) => {
//     const z = m * x + b;
//     return sigmoid(z);
//   };

//   const drawCurve = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.strokeStyle = 'white';
//     ctx.beginPath();
//     for (let x = 0; x <= 1; x += 0.01) {
//       const y = logisticFunction(x);
//       const canvasX = map(x, 0, 1, 0, canvas.width);
//       const canvasY = map(y, 0, 1, canvas.height, 0);
//       if (x === 0) {
//         ctx.moveTo(canvasX, canvasY);
//       } else {
//         ctx.lineTo(canvasX, canvasY);
//       }
//     }
//     ctx.stroke();
//   };

//   const map = (value, start1, stop1, start2, stop2) => {
//     return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
//   };

//   return (
//     <canvas
//       id="regressionCanvas"
//       ref={canvasRef}
//       width={600}
//       height={600}
//       style={{ border: '1px solid black', backgroundColor: 'black', marginTop: '10%' }} // Set width, height, and background color
//       onClick={handleCanvasClick}
//       onMouseMove={handleCanvasMouseMove}
//     ></canvas>
//   );
// };

// export default LogisticRegressionCanvas;

import React, { useState, useRef, useEffect, useCallback } from 'react';

const LogisticRegressionCanvas = () => {
  const canvasRef = useRef(null);
  const [data, setData] = useState([]);
  const [hoverPoint, setHoverPoint] = useState(null);
  const [m, setM] = useState(0);
  const [b, setB] = useState(0);

  // Use useCallback to memoize the draw function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = 'black';  // Set your desired background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
    ctx.fillText('x', canvas.width - 10, canvas.height - 10);
    ctx.fillText('y', 10, 10);

    if (data.length > 1) {
      logisticRegression();
    }

    // Determine the decision boundary
    const decisionBoundaryX = -b / m;

    // Draw points and details
    for (let i = 0; i < data.length; i++) {
      const x = map(data[i].x, 0, 1, 0, canvas.width);
      const y = map(data[i].y, 0, 1, canvas.height, 0);
      const col = data[i].x < decisionBoundaryX ? 'green' : 'red';

      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Highlight the point if hovered
      if (hoverPoint && hoverPoint.x === data[i].x && hoverPoint.y === data[i].y) {
        ctx.fillStyle = 'yellow';
        ctx.fillText(`(${data[i].x.toFixed(2)}, ${data[i].y.toFixed(2)})`, x + 5, y - 5);
      }
    }

    if (data.length > 1) {
      drawCurve();
      // Display logistic regression line equation
      ctx.fillStyle = 'white';
      ctx.fillText(`y = 1 / (1 + e^(-(${m.toFixed(2)} * x + ${b.toFixed(2)})))`, 10, canvas.height - 20);
    }
  }, [data, hoverPoint, m, b]);

  useEffect(() => {
    draw();
  }, [data, hoverPoint, m, b, draw]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / (rect.right - rect.left);
    const y = 1 - (event.clientY - rect.top) / (rect.bottom - rect.top);

    const point = { x, y };
    setData((prevData) => [...prevData, point]);
  };

  const handleCanvasMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / (rect.right - rect.left);
    const mouseY = 1 - (event.clientY - rect.top) / (rect.bottom - rect.top);

    let foundHoverPoint = null;
    for (let i = 0; i < data.length; i++) {
      const dist = Math.sqrt(Math.pow(mouseX - data[i].x, 2) + Math.pow(mouseY - data[i].y, 2));
      if (dist < 0.02) {
        foundHoverPoint = data[i];
        break;
      }
    }
    setHoverPoint(foundHoverPoint);
  };

  const logisticRegression = () => {
    const learningRate = 0.1;
    const epochs = 1000;

    let theta0 = 0; // Intercept
    let theta1 = 0; // Slope

    for (let epoch = 0; epoch < epochs; epoch++) {
      let theta0Gradient = 0;
      let theta1Gradient = 0;

      for (let i = 0; i < data.length; i++) {
        const x = data[i].x;
        const y = data[i].y;
        const predictedY = sigmoid(theta0 + theta1 * x);

        theta0Gradient += (predictedY - y);
        theta1Gradient += (predictedY - y) * x;
      }

      theta0 -= (learningRate / data.length) * theta0Gradient;
      theta1 -= (learningRate / data.length) * theta1Gradient;
    }

    setM(theta1);
    setB(theta0);
  };

  const sigmoid = (z) => {
    return 1 / (1 + Math.exp(-z));
  };

  const logisticFunction = (x) => {
    const z = m * x + b;
    return sigmoid(z);
  };

  const drawCurve = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    for (let x = 0; x <= 1; x += 0.01) {
      const y = logisticFunction(x);
      const canvasX = map(x, 0, 1, 0, canvas.width);
      const canvasY = map(y, 0, 1, canvas.height, 0);
      if (x === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();
  };

  const map = (value, start1, stop1, start2, stop2) => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  };

  return (
    <canvas
      id="regressionCanvas"
      ref={canvasRef}
      width={600}
      height={600}
      style={{ border: '1px solid black', backgroundColor: 'black', marginTop: '10%' }}
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
    ></canvas>
  );
};

export default LogisticRegressionCanvas;
