import { Button, Flex, Input } from "antd";
import React, { useState } from "react";
import {
  CREATECHECKOUTSESSION,
  CREATEDONOR_MUTATION,
  DONORS_QUERY,
} from "../util/query";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { useMutation } from "@apollo/client";
import "./css/DonationCard.css";

function DonationCard() {
  const [createCheckoutSession] = useMutation(CREATECHECKOUTSESSION);
  const [createDonor] = useMutation(CREATEDONOR_MUTATION, {
    refetchQueries: [{ query: DONORS_QUERY }],
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleAmountChange = (value) => {
    const inputValue = parseFloat(value);
    if (!isNaN(inputValue)) {
      setAmount(inputValue);
    }
  };

  const handleDonate = async (values) => {
    const getPriceInfo = (amount) => {
      const priceMap = {
        10: {
          price: "price_1OnIqbENbUZ7oLr43Errux6B",
          quantity: 1,
        },
        20: {
          price: "price_1OnJ5JENbUZ7oLr4mhvzX7QC",
          quantity: 1,
        },
        30: {
          price: "price_1OnJ6zENbUZ7oLr4hXgf2N8X",
          quantity: 1,
        },
        40: {
          price: "price_1OnJ7QENbUZ7oLr4EWmT3GXe",
          quantity: 1,
        },
        50: {
          price: "price_1OnJ7tENbUZ7oLr4zFemj836",
          quantity: 1,
        },
        60: {
          price: "price_1OnJ7tENbUZ7oLr4zFemj836",
          quantity: 1,
        },
        70: {
          price: "price_1OnJ9rENbUZ7oLr4KBTfQY3X",
          quantity: 1,
        },
        80: {
          price: "price_1OnJAYENbUZ7oLr4N48LnLjs",
          quantity: 1,
        },
        90: {
          price: "price_1OnJXHENbUZ7oLr4Iml1Swar",
          quantity: 1,
        },
        100: {
          price: "price_1OnJY3ENbUZ7oLr4Td7oeQMA",
          quantity: 1,
        },
      };

      return priceMap[amount] || null;
    };

    const lineItems = getPriceInfo(amount);
    try {
      const result = await createCheckoutSession({
        variables: { name, email, lineItems },
      });
      // const { data } = result;
      console.log(result);
      const url = JSON.parse(result.data.createCheckoutSession);
      window.location.assign(url);

      setSuccess("Redirecting For Payment");
      setTimeout(() => setSuccess(""), 3000);
      setName("");
      setEmail("");
      setAmount("");
    } catch (error) {
      console.log("Error in creating donation", error);
      // alert(error);
      setError("Provide valid Input");
      setTimeout(() => setError(""), 3000);
      // setName("");
      // setEmail("");
      // setAmount("");
    }
  };

  return (
    <div className="donation-card">
      <h2>Donate</h2>
      <Flex vertical gap={12}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          variant="filled"
          type="text"
          required
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          variant="filled"
          type="email"
          required
        />
        <Select_ value={amount} onChange={handleAmountChange} required />
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button type="primary" htmlType="submit" onClick={handleDonate}>
          Submit
        </Button>
      </Flex>
    </div>
  );
}

export default DonationCard;

import { Select } from "antd";
export const Select_ = ({ value, onChange }) => (
  <Flex gap={8}>
    <Select
      value={value}
      onChange={onChange}
      placeholder="Amount"
      defaultValue={"Amount"}
      variant="filled"
      style={{
        flex: 1,
      }}
      options={[
        {
          value: "10",
          label: "$10",
        },
        {
          value: "20",
          label: "$20",
        },
        {
          value: "30",
          label: "$30",
        },
        {
          value: "40",
          label: "$40",
        },
        {
          value: "50",
          label: "$50",
        },
        {
          value: "60",
          label: "$60",
        },
        {
          value: "70",
          label: "$70",
        },
        {
          value: "80",
          label: "$80",
        },
        {
          value: "90",
          label: "$90",
        },
        {
          value: "100",
          label: "$100",
        },
      ]}
    />
  </Flex>
);
