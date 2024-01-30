// CardsController.js
import {
  CardsWithAll,
  // getAllCardses,
  createCards,
  getAllCardses,
  deleteOneCards,
  checkExistingCards,
  getOneCardsWithDetails,
  updateOneResto,
  Cardsfor1x,
  useCard,
  createCardsReport
  
} from "../services/CardsService";

export const useCardController = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getOneCardsWithDetails(id);
    console.log(card)
    if(card.times<req.body.use){
      return res.status(404).json({
        success: false,
        message: `your card can not support ${req.body.use}  plate`,
      });
    }
    req.body.times=card.times-req.body.use;
    req.body.userid=card.userid
    // req.body.times=card.times-req.body.used;
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "card not found",
      });
    }
  

    const currentDate = new Date();
    const hours = currentDate.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    const formattedSeconds = currentDate.getSeconds().toString().padStart(2, '0');
    
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
    
    const obj = {
      cardid: req.params.id,
      plates:req.body.use,
      date: formattedDate,
      time: formattedTime,
      status: 'used',
    };
    

    const updatedCard = await useCard(req.params.id, req.body);
    const report = await createCardsReport(obj);


    if (!updatedCard) {
      return res.status(404).json({
        success: false,
        message: "Resto not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Card Checked successfully",
      Resto: updatedCard,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
















export const addCardsController = async (req, res) => {
  let role = req.user.role;

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

    if (!req.body.duration) {
      return res.status(400).json({
        success: false,
        message: "duration is required",
      });
    }

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

// export const CustomerCards = async (req, res) => {
//   try {
//     const data = await CustomerCard(req.user.restaurents,id);
//     if (!data) {
//       return res.status(404).json({
//         message: "Cards not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Cards retrieved successfully",
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Something went wrong",
//       error,
//     });
//   }
// };



export const Cardsfor1 = async (req, res) => {
  // const { id } = req.params; req.user.restaurents,id
  try {
    const { id } = req.params;
    const Cardsesa = await getAllCardses();
    // const cardsForUserId5 = Cardses.filter(card => card.userid == id && card.categories.restaurent==req.user.restaurents );
    const Cardses = Cardsesa.filter(card => card.userid == id );


    console.log(req.user.restaurents)
    console.log(id)
    return res.status(200).json({
      success: true,
      message: "Cardses retrieved successfully",
      Cardses,
    });
  } catch (error) {
    console.log(error)
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