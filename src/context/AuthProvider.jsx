import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedUser = localStorage.getItem('petShopUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        
        if (email === "admin@petshop.com" && password === "admin123") {
            const mockAdmin = { email, name: "Admin", role: "admin" };
            setUser(mockAdmin);
            localStorage.setItem('petShopUser', JSON.stringify(mockAdmin));
            return { success: true };
        }

        
        if (email === "user@petshop.com" && password === "123456") {
            const mockUser = { email, name: "Pet Lover", role: "user" };
            setUser(mockUser);
            localStorage.setItem('petShopUser', JSON.stringify(mockUser));
            return { success: true };
        }

       
        const registeredUsers = JSON.parse(localStorage.getItem('petShopRegisteredUsers') || '[]');
        const foundUser = registeredUsers.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const userObj = { email: foundUser.email, name: foundUser.name, role: "user" };
            setUser(userObj);
            localStorage.setItem('petShopUser', JSON.stringify(userObj));
            return { success: true };
        }

        return { success: false, message: "Credenciales inválidas" };
    };

    const register = (name, email, password) => {
        const registeredUsers = JSON.parse(localStorage.getItem('petShopRegisteredUsers') || '[]');

        if (registeredUsers.some(u => u.email === email)) {
            return { success: false, message: "El correo ya está registrado" };
        }

        const newUser = { name, email, password };
        registeredUsers.push(newUser);
        localStorage.setItem('petShopRegisteredUsers', JSON.stringify(registeredUsers));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('petShopUser');
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
