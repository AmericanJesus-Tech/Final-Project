import React, { useState } from 'react';

const Form: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [description, setDescription] = useState('');
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newCandy = { name, price, description };
        console.log('New Candy:', newCandy);

        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCandy),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            // Optionally update state with the new candy data
        } catch (error) {
            console.error('Error:', error);
        }

        setName('');
        setPrice('');
        setDescription('');
    };

    

    return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Candy Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="Number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Candy</button>
            </form>
    );
};

export default Form;