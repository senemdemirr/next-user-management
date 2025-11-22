import { promises as fs } from 'fs';
import path from "path";
import bcrypt from "bcryptjs";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

async function readUsersFromFile() {
    const fileData = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(fileData);
}
async function writeUserToFile(user) {
    await fs.writeFile(usersFilePath, JSON.stringify(user, null, 2), "utf-8");
}
export async function getUsers() {
    return await readUsersFromFile();
}
export async function findUserByEmail(email) {
    const users = await getUsers();
    return users.find((u) => u.email === email);
}

export async function findUserByCredential(email, password) {
    const user = await findUserByEmail(email);
    if (!user) return null;

    const isMatchUser = await bcrypt.compare(password, user.passwordHash);
    if (!isMatchUser) return null;

    return user;
}

export async function nextIdForNewUser() {
    const users = await readUsersFromFile();
    return users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
}

export async function createUser({ name, email, password }) {
    const userWithEmail = await findUserByEmail(email);
    const allUsers = await readUsersFromFile();

    if (userWithEmail) throw new Error("Already exist this email user.");

    const newId = await nextIdForNewUser();

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
        id: newId,
        name,
        email,
        passwordHash
    }

    //to-do => create function for new user push the users.json
    allUsers.push(newUser);
    await writeUserToFile(allUsers);

    return newUser;
}
export async function updateUserPassword({ email, newPassword }) {
    const users = await readUsersFromFile();
    const user = await findUserByEmail(email);

    if (!user) throw new Error('User not found');

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = newPasswordHash;

    await writeUserToFile(users);

    return user;
}

export async function findUserById(userId) {
    const users = await getUsers();
    return users.find((u) => u.id === userId);
}
export async function deleteUser({ userId, password }) {
    const users = await getUsers();
    const userWithId = await findUserById();

    if (!userWithId) throw new Error("User not found");

    const isMatchPassword = await bcrypt.compare(password, userWithId.passwordHash);

    if (!isMatchPassword) throw new Error("Password is wrong");

    const filteredUsers = users.filter((u) => u.id !== userId);
    await writeUserToFile(filteredUsers);

    return true;
}