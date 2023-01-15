import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";

function LinkShortenerElement({setValue}) {

    const { state: { contract, accounts } } = useEth();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const short = async e => {
        console.log(contract);
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (inputValue === "") {
            alert("Please enter a value to write.");
            return;
        }
        await contract.methods.short(inputValue).send({ from: accounts[0], value: 100000000000000 }).then(value => {
            console.log(value);
            setValue(value.events.Log.returnValues.short);
        });

    };

    return (
        <div className="shortener">
            <input type="text" value={inputValue} onChange={handleInputChange}/>
            <button onClick={short}>Short</button>
        </div>
    );
}

export default LinkShortenerElement;
