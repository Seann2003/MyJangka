const bcrypt = require('bcrypt');
const supabase = require('../config/supabase');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('user_email', email)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Supabase Error:', error);
            return res.status(400).json({ error: 'User not found' });
        }

        const user = data;
        const passwordMatch = await bcrypt.compare(password, user.user_password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', 
            user: { 
                id: user.id, 
                email: user.user_email, 
                name: user.user_name,
                address: user.wallet_address
            }   
        });
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


const signup = async (req, res) => {
    const saltRounds = 10;
    const { username, email, password, walletAddress } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
        if(username === "" || email === "" || password === ""){
            return res.status(400).json({ error: 'All fields are required' });
        }

        if(!emailRegex.test(email)){
            return res.status(400).json({ error: 'Invalid email' });
        }
        
        if(password.length < 8){
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const { data, error } = await supabase
            .from('users')
            .insert([
                { user_name: username, user_email: email, user_password: hashedPassword, wallet_address: walletAddress }
            ]);

        if (error) {
            console.error('Supabase Error:', error);
            return res.status(400).json({error: "User/Email already exists"});
        }

        res.status(201).json({ message: 'User registered successfully', data });
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { login, signup };