import React from "react";
import { render, fireEvent, findAllByAltText, findAllByText } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("renders ContactForm without crashing", () => {
    render(<ContactForm />);
});

test("Allows First Name, Last Name, Email, and Message to be entered", () => {
    const { getByLabelText } = render(<ContactForm />);

    // get fields for input:
    const firstnameInput = getByLabelText(/first name/i);
    const lastnameInput = getByLabelText(/last name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);
    // caught missing "id" properties on inputs!

    // fire events to fill in fields:
    fireEvent.change(firstnameInput, {target: {
        name: "firstName", value: "Bron"}
    });
    fireEvent.change(lastnameInput, {target: {
        name: "lastName", value: "Helstrom"
    }});
    fireEvent.change(emailInput, {target: {
        name: "email", value: "reasonablyhappy@triton.com"
    }});
    fireEvent.change(messageInput, {target: {
        name: "message", target: "...or at least, happily, reasonable."
    }});
})

test("Allows fields to be submitted once filled in, without error messages", () => {
    const { getByLabelText, findByTestId, queryAllByText } = render(<ContactForm />);

    // get fields for input:
    const firstnameInput = getByLabelText(/first name/i);
    const lastnameInput = getByLabelText(/last name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);
    // caught missing "id" properties on inputs!

    // fire events to fill in fields:
    fireEvent.change(firstnameInput, {target: {
        name: "firstName", value: "Bron"}
    });
    fireEvent.change(lastnameInput, {target: {
        name: "lastName", value: "Helstrom"
    }});
    fireEvent.change(emailInput, {target: {
        name: "email", value: "reasonablyhappy@triton.com"
    }});
    fireEvent.change(messageInput, {target: {
        name: "message", target: "...or at least, happily, reasonable."
    }});

    //get Submit button and click:
    findByTestId("submit").then(res=>{
        fireEvent.click(res);
    });

    //check for data error messages:
    const errText = queryAllByText(/error/i);;
})