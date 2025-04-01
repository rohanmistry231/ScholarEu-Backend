const mongoose = require("mongoose");

const StudentAmbassadorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    program: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1,
      max: new Date().getFullYear(),
    },
    profileImage: {
      type: String,
      default: "",
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    contactInfo: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(?:\+?\d{1,3})?[ -]?\(?\d{1,4}\)?[ -]?\d{1,4}[ -]?\d{1,9}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid contact number!`,
      },
    },
  },
  { timestamps: true }
);

const StudentAmbassador = mongoose.model("StudentAmbassador", StudentAmbassadorSchema);
module.exports = StudentAmbassador;
