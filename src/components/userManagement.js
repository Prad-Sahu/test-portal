export const STATIC_USERS = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        password: "password123"
    },
    {
        id: 2,
        name: "Regular User",
        email: "user@example.com",
        password: "user123"
    }
];

// Function to add a new user
export const registerUser = (newUser) => {
    // Check if user already exists
    const existingUser = STATIC_USERS.find(
        user => user.email === newUser.email
    );

    if (existingUser) {
        return {
            success: false,
            message: "Email already exists"
        };
    }

    const newId = STATIC_USERS.length > 0
        ? Math.max(...STATIC_USERS.map(u => u.id)) + 1
        : 1;

    const userToAdd = {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
    };

    STATIC_USERS.push(userToAdd);

    return {
        success: true,
        user: userToAdd
    };
};

// Function to authenticate user
export const authenticateUser = (email, password) => {
    console.log('STATIC_USERS: ', STATIC_USERS);
    const user = STATIC_USERS.find(
        u => u.email === email && u.password === password
    );

    return user
        ? { success: true, user }
        : { success: false, message: "Invalid credentials" };
};

// Function to get user by email
export const getUserByEmail = (email) => {
    return STATIC_USERS.find(user => user.email === email);
};