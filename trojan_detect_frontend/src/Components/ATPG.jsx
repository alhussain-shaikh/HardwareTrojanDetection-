// import React, { useState } from "react";
// import axios from "axios";

// const ATPG = () => {
//   const [primaryInputs, setPrimaryInputs] = useState({});
//   const [levelInputs, setLevelInputs] = useState({});
//   const [outputs, setOutputs] = useState(false);
//   const [testVectorStatus, setTestVectorStatus] = useState(false);
//   const [testcases, setTestCases] = useState([]);
//   const [circuit, setCircuit] = useState([
//     {
//       level: Number,
//       gatetype: [
//         {
//           gate: String,
//           inp1: String,
//           inp2: String,
//         },
//       ],
//     },
//   ]);

//   const addLevel = () => {
//     let obj = {
//       level: Number,
//       gatetype: [
//         {
//           gate: String,
//           inp1: String,
//           inp2: String,
//         },
//       ],
//     };
//     setCircuit([...circuit, obj]);
//   };

//   const addGates = (e, index) => {
//     let data = [...circuit];
//     let obj = {
//       gate: String,
//       inp1: String,
//       inp2: String,
//     };
//     data[index]["gatetype"].push(obj);
//     setCircuit(data);
//     //  console.log(circuit);
//   };

//   const primaryInputHandler = (e) => {
//     let arr = e.target.value.split(" ");
//     for (var i = 1; i <= arr.length; i++) primaryInputs[`P${i}`] = arr[i - 1];
//     // setPrimaryInputs(arr);
//     // console.log("Primary inputs are : ", primaryInputs);
//   };

//   // const gateLogics = (gate, input1, input2) => {
//   //   let value = false;
//   //   switch (gate) {
//   //     case "AND":
//   //       value = input1 && input2;
//   //       break;
//   //     case "OR":
//   //       value = input1 || input2;
//   //       break;
//   //     case "NOR":
//   //       value = !(input1 || input2);
//   //       break;
//   //     case "XOR":
//   //       value = input1 !== input2;
//   //       break;
//   //     case "NAND":
//   //       value = !(input1 && input2);
//   //       break;
//   //     case "XNOR":
//   //       value = input1 === input2;
//   //       break;
//   //     default:
//   //       break;
//   //   }
//   //   return value;
//   // };


//   const gateLogics = (gate, input1, input2) => {
//     let value = false;
//     switch (gate) {
//       case "AND":
//         value = (input1 === 'x' || input2 === 'x') ? 'x' : (input1 && input2);
//         break;
//       case "OR":
//         value = (input1 === 'x' || input2 === 'x') ? 'x' : (input1 || input2);
//         break;
//       case "NOR":
//         value = (input1 === 'x' || input2 === 'x') ? 'x' : !(input1 || input2);
//         break;
//       case "XOR":
//         value = (input1 === 'x' || input2 === 'x') ? 'x' : (input1 !== input2);
//         break;
//       case "NAND":
//         value = (input1 === 'x' || input2 === 'x') ? 'x' : !(input1 && input2);
//         break;
//       case "XNOR":
//         value = (input1 === 'x' || input2 === 'x') ? 'x' : (input1 === input2);
//         break;
//       default:
//         break;
//     }
//     console.log("Value is : ",value);
//     return value;
//   };

//   const findOutput = () => {
//     circuit.forEach((level, index) => {
//       let levelnum = index + 1;
//       level.gatetype.forEach((gate, ind) => {
//         let outputnum = ind + 1;
//         let value = false;
//         let variable = "L" + levelnum + "O" + outputnum;
//         let input1 = gate["inp1"];
//         let input2 = gate["inp2"];
//         if (input1.startsWith("P") && input2.startsWith("P")) {

//           if(primaryInputs[input1]==="x"){
//             input1 = "x";
//             input2 = primaryInputs[input2] === "1";
//           }else if(primaryInputs[input2]==="x"){
//             input2 = "x";
//             input1 = primaryInputs[input1] === "1";
//           }else{
//             input1 = primaryInputs[input1] === "1";
//             input2 = primaryInputs[input2] === "1";
//           }

//           console.log("input 1 is : ",input1);
//           console.log("input 2 is : ",input2);

//           let value = gateLogics(gate["gate"], input1, input2);
//           let output = "0" ;
//           if(value==="x"){
//             output = "x"
//           }else{
//             output = value === false ? "0" : "1";
//           }
//           levelInputs[variable] = output;
//         } else if (input1.startsWith("P") && input2.startsWith("L")) {
//           input1 = primaryInputs[input1] === "1";
//           input2 = levelInputs[input2] === "1";
//           let value = gateLogics(gate["gate"], input1, input2);
//           let output = value === false ? "0" : "1";
//           levelInputs[variable] = output;
//         } else if (input1.startsWith("L") && input2.startsWith("P")) {
//           input2 = primaryInputs[input2] === "1";
//           input1 = levelInputs[input1] === "1";
//           let value = gateLogics(gate["gate"], input1, input2);
//           let output = value === false ? "0" : "1";
//           levelInputs[variable] = output;
//         } else if (input1.startsWith("L") && input2.startsWith("L")) {
//           input1 = levelInputs[input1] === "1";
//           input2 = levelInputs[input2] === "1";
//           let value = gateLogics(gate["gate"], input1, input2);
//           let output = value === false ? "0" : "1";
//           levelInputs[variable] = output;
//         }
//       });
//     });
//     console.log("Primary inputs are : ", primaryInputs);
//     console.log("Level Inputs are : ", levelInputs);
//     setOutputs(true);
//   };

//   const handleGateChange = (e, index, parentIndex) => {
//     let data = e.target.value;
//     let arr = data.split(" ");
//     let currentCircuit = [...circuit];
//     // console.log("current circuit is : ",currentCircuit);
//     currentCircuit[parentIndex]["gatetype"][index]["gate"] = arr[0];
//     currentCircuit[parentIndex]["gatetype"][index]["inp1"] = arr[1];
//     currentCircuit[parentIndex]["gatetype"][index]["inp2"] = arr[2];
//     setCircuit(currentCircuit);
//     // console.log("current circuit is :-------->  ",circuit);
//   };

//   const getTestVectors = async() => {
//     const response = await axios.get('http://localhost:8000/api/testcases')
//     console.log("test vectors are : ",response.data);
//     setTestCases(response.data.testVectors);
//   }

//   return (
//     <>
//     <div style={{ overflow: 'scroll', border: '2px solid red' }}>
//       {circuit.map((level, index) => {
//         return (
//           <>
//             <h1 key={index}>Level {index + 1} </h1>
//             {level.gatetype.map((gate, ind) => {
//               return (
//                 <>
//                   <h2 key={ind}>Gate {ind + 1}</h2>
//                   <input
//                     key={gate}
//                     type="text"
//                     onChange={(e) => {
//                       handleGateChange(e, ind, index);
//                     }}
//                     name="gate"
//                     id="gate"
//                   />
//                 </>
//               );
//             })}
//             <button
//               onClick={(e) => {
//                 addGates(e, index);
//               }}
//             >
//               Add Gates
//             </button>
//           </>
//         );
//       })}
//       <br />
//       <br />
//       <button onClick={addLevel}>Add Level</button>
//       <br />
//       <br />
//       <input
//         type="text"
//         onChange={(e) => {
//           primaryInputHandler(e);
//         }}
//         name="numPrimaryInputs"
//         id="numPrimaryInputs"
//       />
//       <button onClick={findOutput}> Final Output </button> <br />
//       <hr />
//       <br />
//       {outputs ? (
//         <>
//           {Object.entries(levelInputs).map(([key, value]) => (
//             <h3 key={key}>{`${key}: ${value}`}</h3>
//           ))}
//         </>
//       ) : (
//         <></>
//       )}
//       <br /><hr /><br />
//       <button onClick={getTestVectors}> Get Test Cases </button>
//       <div style={{ overflowY: 'auto', maxHeight: '200px', border: '2px solid red' }}>
//         {testcases.length > 0 ?
//           <>
//             {testcases.map((testcase, index) => (
//               <p key={index}>{testcase}</p>
//             ))}
//           </>
//           : <></>}
//       </div>
//       </div>
//     </>
//   );
// };

// export default ATPG;

import React, { useState } from "react";
import axios from "axios";
import Nav from "./Homepage/Nav";
import './ATPG.css'
import { blue } from "@mui/material/colors";

const ATPG = () => {
  const [primaryInputs, setPrimaryInputs] = useState({});
  const [levelInputs, setLevelInputs] = useState({});
  const [outputs, setOutputs] = useState(false);
  const [testVectorStatus, setTestVectorStatus] = useState(false);
  const [testcases, setTestCases] = useState([]);
  const [circuit, setCircuit] = useState([
    {
      level: Number,
      gatetype: [
        {
          gate: String,
          inp1: String,
          inp2: String,
        },
      ],
    },
  ]);

  const addLevel = () => {
    let obj = {
      level: Number,
      gatetype: [
        {
          gate: String,
          inp1: String,
          inp2: String,
        },
      ],
    };
    setCircuit([...circuit, obj]);
  };

  const addGates = (e, index) => {
    let data = [...circuit];
    let obj = {
      gate: String,
      inp1: String,
      inp2: String,
    };
    data[index]["gatetype"].push(obj);
    setCircuit(data);
    //  console.log(circuit);
  };

  const primaryInputHandler = (e) => {
    let arr = e.target.value.split(" ");
    for (var i = 1; i <= arr.length; i++) primaryInputs[`P${i}`] = arr[i - 1];
    // setPrimaryInputs(arr);
    // console.log("Primary inputs are : ", primaryInputs);
  };

  const gateLogics = (gate, input1, input2) => {
    let value = false;
    switch (gate) {
      case "AND":
        value = input1 && input2;
        break;
      case "OR":
        value = input1 || input2;
        break;
      case "NOR":
        value = !(input1 || input2);
        break;
      case "XOR":
        value = input1 !== input2;
        break;
      case "NAND":
        value = !(input1 && input2);
        break;
      case "XNOR":
        value = input1 === input2;
        break;
      default:
        break;
    }
    return value;
  };

  const findOutput = () => {
    circuit.forEach((level, index) => {
      let levelnum = index + 1;
      level.gatetype.forEach((gate, ind) => {
        let outputnum = ind + 1;
        let value = false;
        let variable = "L" + levelnum + "O" + outputnum;
        let input1 = gate["inp1"];
        let input2 = gate["inp2"];
        if (input1.startsWith("P") && input2.startsWith("P")) {
          input1 = primaryInputs[input1] === "1";
          input2 = primaryInputs[input2] === "1";
          let value = gateLogics(gate["gate"], input1, input2);
          let output = value === false ? "0" : "1";
          levelInputs[variable] = output;
        } else if (input1.startsWith("P") && input2.startsWith("L")) {
          input1 = primaryInputs[input1] === "1";
          input2 = levelInputs[input2] === "1";
          let value = gateLogics(gate["gate"], input1, input2);
          let output = value === false ? "0" : "1";
          levelInputs[variable] = output;
        } else if (input1.startsWith("L") && input2.startsWith("P")) {
          input2 = primaryInputs[input2] === "1";
          input1 = levelInputs[input1] === "1";
          let value = gateLogics(gate["gate"], input1, input2);
          let output = value === false ? "0" : "1";
          levelInputs[variable] = output;
        } else if (input1.startsWith("L") && input2.startsWith("L")) {
          input1 = levelInputs[input1] === "1";
          input2 = levelInputs[input2] === "1";
          let value = gateLogics(gate["gate"], input1, input2);
          let output = value === false ? "0" : "1";
          levelInputs[variable] = output;
        }
      });
    });
    console.log("Primary inputs are : ", primaryInputs);
    console.log("Level Inputs are : ", levelInputs);
    setOutputs(true);
  };

  const handleGateChange = (e, index, parentIndex) => {
    let data = e.target.value;
    let arr = data.split(" ");
    let currentCircuit = [...circuit];
    // console.log("current circuit is : ",currentCircuit);
    currentCircuit[parentIndex]["gatetype"][index]["gate"] = arr[0];
    currentCircuit[parentIndex]["gatetype"][index]["inp1"] = arr[1];
    currentCircuit[parentIndex]["gatetype"][index]["inp2"] = arr[2];
    setCircuit(currentCircuit);
    // console.log("current circuit is :-------->  ",circuit);
  };

  const getTestVectors = async() => {
    const response = await axios.get('http://localhost:8000/api/testcases')
    console.log("test vectors are : ",response.data);
    setTestCases(response.data.testVectors);
  }

  return (
    <>
      <Nav /> <br /><br />
      {circuit.map((level, index) => {
        return (
          <>
            <h1 key={index} style={{ marginLeft: '20px' ,marginTop: '20px', color: 'black'}}>Level {index + 1} </h1>
            {level.gatetype.map((gate, ind) => {
              return (
                <>
                  <h2 key={ind} style={{ marginLeft: '20px' }}>Gate {ind + 1}</h2>
                  <input style={{ marginLeft: '20px' }}
                    key={gate}
                    type="text"
                    onChange={(e) => {
                      handleGateChange(e, ind, index);
                    }}
                    name="gate"
                    id="gate"
                  />
                </>
              );
            })}
            <button style={{ marginLeft: '20px' }}
              onClick={(e) => {
                addGates(e, index);
              }}
            >
              Add Gates
            </button>
          </>
        );
      })}
      <br />
      <br />
      <button onClick={addLevel} style={{ marginLeft: '20px' }}>Add Level</button>
      <br />
      <br />
      <input
        style={{ marginLeft: '20px' }}
        type="text"
        onChange={(e) => {
          primaryInputHandler(e);
        }}
        name="numPrimaryInputs"
        id="numPrimaryInputs"
      />
      <button onClick={findOutput} style={{ marginLeft: '20px' }}> Final Output </button> <br />
      <hr />
      <br />
      {outputs ? (
        <>
          {Object.entries(levelInputs).map(([key, value]) => (
            <h3 key={key}>{`${key}: ${value}`}</h3>
          ))}
        </>
      ) : (
        <></>
      )}
      <br /><hr /><br />
      <button onClick={getTestVectors} style={{ marginLeft: '20px' }}> Get Test Cases </button>
      {testcases.length > 0 ?
       <>
        {testcases.map((testcase)=>{
          return(
            <>
              <p>{testcase}</p>
            </>
          )
        })}
       </> 
       : <></>}
    </>
  );
};

export default ATPG;