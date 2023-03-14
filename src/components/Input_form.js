import { useState } from "react";
import * as Web3 from "web3";
export default function Input_form(props) {
  const [addressErrorMessege, setAddressErrorMessege] = useState("");

  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  async function getAddress(event) {
    event.preventDefault();
    props.setIsFirstLoading(false);
    let addr = event.target.elements.address.value;
    console.log("addr = " + addr);

    //check if address is valid first. If valid, call props.setAddress(addr) to set the wallet address
    props.setIsValidAddress(false);
    if (addr === "") {
      console.log("Input is empty. Enter a valid address or ENS name");
      props.setIsValidAddress(false);
      setAddressErrorMessege("Enter the address");
    } else {
      try {
        await web3.eth.ens.getAddress(addr);
        console.log(addr + " is a valid ENS name");
        props.setIsValidAddress(true);
        setAddressErrorMessege("");
        props.setAddress(addr);
        props.setUpdateResult(true);
      } catch {
        const isAddress = await web3.utils.isAddress(addr);
        if (isAddress) {
          console.log(addr + " is a valid address");
          props.setIsValidAddress(true);
          setAddressErrorMessege("");
          props.setAddress(addr);
          props.setUpdateResult(true);
        } else {
          console.log(addr + " is an invalid address");
          props.setIsValidAddress(false);
          setAddressErrorMessege("Invalid Address!");
        }
      }
    }
  }

  return (
    <form className="container" onSubmit={getAddress}>
      <div className="row">
        <div className="col-sm-6">
          <input
            name="address"
            type="text"
            className="col-sm-12"
            placeholder="Wallet address or ENS name"
          ></input>
        </div>
        <div className="col-sm-3">
          <span style={{ fontWeight: "bold", color: "red" }}>
            {addressErrorMessege}
          </span>
        </div>
        <div className="col-sm-3 text-right">
          <button className="btn btn-primary btn-sm " type="Submit">
            Fetch
          </button>
        </div>
      </div>
    </form>
  );
}
