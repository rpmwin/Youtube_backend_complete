import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// get user details from frontend
// validation  - not empty
// check if user already exists: username  , email

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;

  console.log("req.body: ", req.body);

  if (fullname === "" || username === "" || email === "" || password === "") {
    throw new ApiError(400, "Please fill all the fields");
  }

  const existedUser = await User.findOne({
    $or: [
      { username: username },
      {
        email: email,
      },
    ],
  });

  if (existedUser) {
    throw new ApiError(400, "Username or Email already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

    const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage.url,
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res.status(201).json(
    new ApiResponse(200 , createdUser , "User registered successfully")
  )
});

export { registerUser };
