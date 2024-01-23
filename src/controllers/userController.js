import Email from "../utils/mailer";
import bcrypt from "bcrypt";
import {
  createUser,
  getUserByEmail,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  activateUser,
  deactivateUser,
  createUserCustomer,
  GetUserPassword
} from "../services/userService";

export const changePassword = async (req, res) => {
  console.log(req.user.id)
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if ( !oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please provide userId, oldPassword, newPassword, and confirmPassword",
    });
  }

  try {
    const user = await GetUserPassword(req.user.id);
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }

    console.log("Retrieved user from database:", user);

    const storedPassword = user || null;

    if (!storedPassword) {
      return res.status(500).json({
        success: false,
        message: "User password not found in the database",
      });
    }

    const validPassword = await bcrypt.compare(oldPassword, storedPassword);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid old password",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await updateUser(req.user.id, { password: hashedPassword });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const addCustomer = async (req, res) => {
  try {
    if (!req.body.role || req.body.role === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide role",
      });
    }

    if (!req.body.firstname || req.body.firstname === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide firstname",
      });
    }
    if (!req.body.lastname || req.body.lastname === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide lastname",
      });
    }
    if (!req.body.email || req.body.email === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide email",
      });
    }
    if (!req.body.phone || req.body.phone === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide phone",
      });
    }
    // Other validation checks for firstname, lastname, email, phone...

    if (!(req.body.role === "customer" || req.body.role === "restaurentadmin")) {
      return res.status(400).json({
        success: false,
        message: "Only customers and restaurant admins can sign up",
      });
    }

    const userExist = await getUserByEmail(req.body.email);
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Generate password
    const password = `D${Math.random().toString(36).slice(-8)}`;

    // Create user with generated password and set status to active
    req.body.password = password;
    
    if (req.body.role === "restaurentadmin") {
      req.body.status = "pending";
    } else {
      req.body.status = "active";
    }
    

    const newUser = await createUser(req.body);
    newUser.password = password;

    // Send email
    await new Email(newUser).sendAccountAdded();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        role: newUser.role,
        restaurents: newUser.restaurents,
        role: req.body.role, // Corrected this line
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};


export const addUser = async (req, res) => {
  // userid, group () array, start time end time ,
  let role = req.user.role;
  // req.body.role
  // req.body.role

  if (!req.body.role || req.body.role === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide role",
    });
  }

  if (!req.body.firstname || req.body.firstname === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide firstname",
    });
  }
  if (!req.body.lastname || req.body.lastname === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide lastname",
    });
  }
  if (!req.body.email || req.body.email === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide email",
    });
  }
  if (!req.body.phone || req.body.phone === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide phone",
    });
  }
  if (role === "employee") {
    if (!(req.body.role === "customer")) {
      return res.status(400).json({
        success: false,
        message: "you are not allowed to ! except customer ",
      });
    }
  }
  if (role === "superadmin") {
    return res.status(400).json({
      success: false,
      message: "you are not allowed to add any user",
    });
  }

  if (role === "restaurentadmin") {
    if (req.body.role === "superadmin" || req.body.role === "restaurentadmin") {
      return res.status(400).json({
        success: false,
        message: "you are not allowed to add superadmin or restaurentadmin ",
      });
    }

    if (role === "restaurentadmin") {
      if (!(req.body.role === "employee" || req.body.role === "customer")) {
        return res.status(400).json({
          success: false,
          message: "you are not allowed to except employees and customer ",
        });
      }
    }

  
  }

  try {
    const userExist = await getUserByEmail(req.body.email);
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "email already exist",
      });
    }

    // generate password
    const password = `D${Math.random().toString(36).slice(-8)}`;

    // create user with generated password and set status to active
    req.body.password = password;
    req.body.status = "active";

    const newUser = await createUser(req.body);
    newUser.password = password;

    // send email
    await new Email(newUser).sendAccountAdded();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        role: newUser.role,
        restaurents: newUser.restaurents,
        rolex: role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    let users;
    if (req.user.role === "root") {
      users = await getUsers();
    }
    if (req.user.role === "superadmin") {
      users = await getUsers();
    }
 
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const updateOneUser = async (req, res) => {
  try {
    const user = await updateUser(req.user.id, req.body);
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};



export const deleteOneUser = async (req, res) => {
  try {
    const existingUser = await getUser(req.params.id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (existingUser.role === "root" && req.user.role !== "root") {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
  
    const user = await deleteUser(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const activateOneUser = async (req, res) => {
  try {
    const existingUser = await getUser(req.params.id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (existingUser.role === "superadmin" && req.user.role !== "root") {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    if (
      existingUser.role === "systemcampusadmin" &&
      req.user.role !== "superadmin"
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }


    const user = await activateUser(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User activated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const deactivateOneUser = async (req, res) => {
  try {
    const existingUser = await getUser(req.params.id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (existingUser.role === "superadmin" && req.user.role !== "root") {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    if (
      existingUser.role === "systemcampusadmin" &&
      req.user.role !== "superadmin"
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const user = await deactivateUser(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deactivated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
