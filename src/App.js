import React, {useState} from 'react';
import Locator from "./components/Locator";
import Header from "./components/Header/Header";
import Options from "./components/Options/Options";
import Content from "./components/Content/Content";
function App() {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div>
            <Header/>
            <div style={{ display: "flex" }}>
                <Options setSelectedOption={setSelectedOption}/>
                <Content selectedOption={selectedOption}/>
            </div>
        </div>
    );
}

export default App;