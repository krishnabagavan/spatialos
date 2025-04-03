
import React, { useState } from "react";
import Scene from "../src/curved"; 

function App() {
    const [count, setCount] = useState(0);

    const increaseCount = () => setCount(count + 1);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            flexDirection: "column",
            backgroundColor: "#181818", 
        }}>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h1 style={{ color: "white", fontSize: "32px" }}>Count: {count}</h1>
                <button 
                    onClick={increaseCount} 
                    style={{ 
                        padding: "10px 20px", 
                        fontSize: "16px", 
                        cursor: "pointer",
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        borderRadius: "5px"
                    }}
                >
                    Increase Count
                </button>
            </div>


            <Scene />
        </div>
    );
}

export default App;

