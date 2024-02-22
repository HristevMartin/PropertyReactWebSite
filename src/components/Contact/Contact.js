import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;


function Contact() {

    // define navigate from use Navigate
    const Navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: 'buying',
        location: '',
        propertyType: 'house',
        budget: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        
        console.log('show me the id', id);
        console.log('show me the value', value);
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            console.log('formData', formData);
            
            const response = await fetch(`${apiUrl}/uk-estate-property/inquery_create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            alert('Your request has been submitted successfully. Someone will contact you soon.')
            Navigate('/')
            // Handle success - perhaps clear form or show a success message.
        } catch (error) {
            console.error('Error:', error);
            // Handle errors - perhaps show an error message to the user.
        }
    };

    return (
        <div className="container mt-5 contact-form">
            <h1>Contact Us for Property Inquiries</h1>
            <form onSubmit={submitForm} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Enter your full name" 
                        required 
                        value={formData.name} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter your email" 
                        required 
                        value={formData.email} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input 
                        type="tel" 
                        className="form-control" 
                        id="phone" 
                        placeholder="Enter your phone number" 
                        required 
                        value={formData.phone} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="interest" className="form-label">I am interested in</label>
                    <select 
                        className="form-select" 
                        id="interest" 
                        value={formData.interest} 
                        onChange={handleInputChange}
                    >
                        <option value="buying">Buying</option>
                        <option value="selling">Selling</option>
                        <option value="renting">Renting</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Preferred Location</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="location" 
                        placeholder="Preferred city, neighborhood or area" 
                        required 
                        value={formData.location} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="propertyType" className="form-label">Property Type</label>
                    <select 
                        className="form-select" 
                        id="propertyType" 
                        value={formData.propertyType} 
                        onChange={handleInputChange}
                    >
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="commercial">Commercial</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="budget" className="form-label">Budget Range</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="budget" 
                        placeholder="Enter your budget range" 
                        required 
                        value={formData.budget} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Additional Information</label>
                    <textarea 
                        className="form-control" 
                        id="message" 
                        rows="3" 
                        placeholder="Any specific requirements or message" 
                        value={formData.message} 
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Request</button>
            </form>
        </div>
    );
}

export default Contact;
