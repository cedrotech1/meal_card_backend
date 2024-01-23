// CardsController.js
import {
  CardsWithAll,
  // getAllCardses,
  createCards,
  getAllCardses,
  deleteOneCards,
  checkExistingCards,
  getOneCardsWithDetails,
  // getAllCardsesWithModels,
  updateOneResto,
  
} from "../services/CardsService";

export const addCardsController = async (req, res) => {
  let role = req.user.role;

  if (!role === "employee") {
      return res.status(400).json({
        success: false,
        message: "you are not allowed to add card for customers ",
      });
    
  }

  if (!role === "employee") {
    return res.status(400).json({
      success: false,
      message: "you are not allowed to add card for customers ",
    });
  
}

  
  try {
    // if (req.user.role !== "superadmin") {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Not authorized, you are not superadmin",
    //   });
    // }

    // req.body.name = req.body.name.toUpperCase();

    // if (!req.body.name) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Name is required",
    //   });
    // }

    // const existingCards = await checkExistingCards(req.body.name);
    // if (existingCards) {
    //   console.log("Cards with the same name already exists ");
    //   return res.status(400).json({
    //     success: false,
    //     message: "Cards with the same name already exists ",
    //   });
    // }
    
    

    const newCards = await createCards(req.body);
    return res.status(201).json({
      success: true,
      message: "Cards created successfully",
      Cards: newCards,
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

export const CardsWithAllController = async (req, res) => {
  try {
    const data = await getAllCardses();
    if (!data) {
      return res.status(404).json({
        message: "Cards not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cards retrieved successfully",
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



export const getAllCardsesController = async (req, res) => {
  try {
    const Cardses = await getAllCardses();
    return res.status(200).json({
      success: true,
      message: "Cardses retrieved successfully",
      Cardses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const deleteOneCardsController = async (req, res) => {
  try {
    // if (req.user.role !== "superadmin") {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Not authorized, you are not superadmin",
    //   });
    // }

    const Cards = await deleteOneCards(req.params.id);
    if (!Cards) {
      return res.status(404).json({
        success: false,
        message: "Cards not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cards deleted successfully",
      Cards,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};



export const updateOneRestoController = async (req, res) => {
  try {
    // if (req.user.role !== "superadmin") {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Not authorized, you are not superadmin",
    //   });
    // }
    // req.body.name = req.body.name.toUpperCase();
    // if (req.body.name !== undefined) {
    //   const existingRestoByName = await checkExistingResto(req.body.name);
    //   if (existingRestoByName && existingRestoByName.id !== req.params.id) {
    //     console.log("Cards with the new name already exists");
    //     return res.status(400).json({
    //       success: false,
    //       message: "Cards with the new name already exists",
    //     });
    //   }
    // }
    const updatedResto = await updateOneResto(req.params.id, req.body);
    if (!updatedResto) {
      return res.status(404).json({
        success: false,
        message: "Resto not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Resto updated successfully",
      Resto: updatedResto,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const getOneCardsController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getOneCardsWithDetails(id);
    if (!data) {
      return res.status(404).json({
        message: "Resto not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Resto retrieved successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};