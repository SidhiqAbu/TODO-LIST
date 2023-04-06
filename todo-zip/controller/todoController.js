var todoModel = require("../model/todo");

module.exports.createTodo = async function (req, res) {
  //destructure
  const { name, category, date } = req.body;
  console.log("name", name, "category", category, "date", date);

  try {
    if (!name || !category || !date) {
      return res.status(402).json({
        success: false,
        message: "Name ,Category,Date Is Not Valid Value",
      });
    }

    if (!todoModel.isValidCategory(category)) {
      return res.status(402).json({
        success: false,
        message: "Category Is Invalid",
      });
    }

    let resp = await todoModel.findOne({ name: name }); // get the first todo having name = ''
    console.log("resp", resp);
    if (resp) {
      return res.status(402).json({
        success: false,
        message: "Name Is Already Used",
      });
    }

    let data = await todoModel.create({
      name: name,
      category: category,
      date: date,
    });

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    let errMssg = error.message;
    if (process.env.enviroment == "production") {
      errMssg = "Internal Server Error !!";
    }
    return res.status(500).json({
      success: false,
      message: errMssg,
    });
  }
};

module.exports.getTodo = async function (req, res) {
  try {
    let data = await todoModel.find({});
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    let errMssg = error.message;
    if (process.env.enviroment == "production") {
      errMssg = "Internal Server Error !!";
    }
    return res.status(500).json({
      success: false,
      message: errMssg,
    });
  }
};

module.exports.getTodoBYId = async function (req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(402).json({
        success: false,
        message: "Invalid Id",
      });
    }
    let data = await todoModel.findById(id).select("-_id");
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    let errMssg = error.message;
    if (process.env.enviroment == "production") {
      errMssg = "Internal Server Error !!";
    }
    return res.status(500).json({
      success: false,
      message: errMssg,
    });
  }
};

//edit
//update status

module.exports.updateStatus = async function (req, res) {
  const { id, status_id } = req.params;
  console.log("status", status_id);
  try {
    if (!(status_id == 0 || status_id == 1)) {
      return res.status(402).json({
        success: false,
        message: "Invalid  Status Id",
      });
    }
    if (!id) {
      return res.status(402).json({
        success: false,
        message: "Invalid Id",
      });
    }

    let data = await todoModel.findById(id);
    if (!data) {
      return res.status(402).json({
        success: false,
        message: "Id Not Found",
      });
    }

    if (status_id == 1) {
      data.status = 1;
    } else {
      data.status = 0;
    }

    await data.save();

    return res.status(200).json({
      success: true,
      data: data,
      message: "status_updated",
    });
  } catch (error) {
    let errMssg = error.message;
    if (process.env.enviroment == "production") {
      errMssg = "Internal Server Error !!";
    }
    return res.status(500).json({
      success: false,
      message: errMssg,
    });
  }
};
