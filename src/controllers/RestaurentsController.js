// RestaurentController.js
import {
  RestaurentWithAll,
  // getAllRestaurentes,
  createRestaurent,
  getAllRestaurentes,
  deleteOneRestaurent,
  checkExistingRestaurent,
  getOneRestaurentWithDetails,
  updateOneRestaurent,
} from "../services/RestaurentService";

export const addRestaurentController = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not superadmin",
      });
    }

    req.body.name = req.body.name.toUpperCase();

    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // const existingRestaurent = await checkExistingRestaurent(req.body.name);
    // if (existingRestaurent) {
    //   console.log("Restaurent with the same name already exists ");
    //   return res.status(400).json({
    //     success: false,
    //     message: "Restaurent with the same name already exists ",
    //   });
    // }

    const newRestaurent = await createRestaurent(req.body);
    return res.status(201).json({
      success: true,
      message: "Restaurent created successfully",
      Restaurent: newRestaurent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const RestaurentWithAllController = async (req, res) => {
  try {
    const data = await getAllRestaurentes();
    if (!data) {
      return res.status(404).json({
        message: "Restaurent not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Restaurent retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};



// export const getAllRestaurentesController = async (req, res) => {
//   try {
//     const Restaurentes = await getAllRestaurentes();
//     return res.status(200).json({
//       success: true,
//       message: "Restaurentes retrieved successfully",
//       Restaurentes,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Something went wrong",
//       error,
//     });
//   }
// };

// export const deleteOneRestaurentController = async (req, res) => {
//   try {
//     if (req.user.role !== "superadmin") {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized, you are not superadmin",
//       });
//     }

//     const Restaurent = await deleteOneRestaurent(req.params.id);
//     if (!Restaurent) {
//       return res.status(404).json({
//         success: false,
//         message: "Restaurent not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Restaurent deleted successfully",
//       Restaurent,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Something went wrong",
//       error,
//     });
//   }
// };

// export const getOneRestaurentController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = await getOneRestaurentWithDetails(id);
//     if (!data) {
//       return res.status(404).json({
//         message: "Restaurent not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Restaurent retrieved successfully",
//       data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Something went wrong",
//       error,
//     });
//   }
// };

// export const updateOneRestaurentController = async (req, res) => {
//   try {
//     if (req.user.role !== "superadmin") {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized, you are not superadmin",
//       });
//     }
//     req.body.name = req.body.name.toUpperCase();
//     if (req.body.name !== undefined) {
//       const existingRestaurentByName = await checkExistingRestaurent(req.body.name);
//       if (existingRestaurentByName && existingRestaurentByName.id !== req.params.id) {
//         console.log("Restaurent with the new name already exists");
//         return res.status(400).json({
//           success: false,
//           message: "Restaurent with the new name already exists",
//         });
//       }
//     }
//     const updatedRestaurent = await updateOneRestaurent(req.params.id, req.body);
//     if (!updatedRestaurent) {
//       return res.status(404).json({
//         success: false,
//         message: "Restaurent not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Restaurent updated successfully",
//       Restaurent: updatedRestaurent,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Something went wrong",
//       error,
//     });
//   }
// };
