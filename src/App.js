import React, {useState} from 'react';
import Header from "./components/Header/Header";
import Options from "./components/Options/Options";
import Content from "./components/Content/Content";
function App() {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div style={{ display: "flex", height: "100vh", flexDirection: "column"}}>
            <Header/>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh"}}>
                <Options setSelectedOption={setSelectedOption}/>
                <Content selectedOption={selectedOption}/>
            </div>
        </div>
    );
}

export default App;