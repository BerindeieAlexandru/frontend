import React, {useState} from 'react';
import Header from "./components/Header/Header";
import Options from "./components/Options/Options";
import Content from "./components/Content/Content";
function App() {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div style={{ display: "flex", height: "100%", flexDirection: "column"}}>
            <Header/>
            <div style={{position: "relative"}}>
                <Options setSelectedOption={setSelectedOption}/>
                <Content selectedOption={selectedOption}/>
            </div>
        </div>
    );
}

export default App;