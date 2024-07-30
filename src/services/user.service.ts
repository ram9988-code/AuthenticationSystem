import { redis } from "@/utils/redis";

//get user by id
export const getUserById = async (id: string) => {
  const userJSON = await redis.get(id);
  if (userJSON) {
    const user = JSON.parse(userJSON as any);
    return user;
  }
};

//Get all Users
// export const getAllUsersService = async (res: Response) => {
//   const users = await userModel.find().sort({ createdAt: -1 });

//   res.status(201).json({
//     success: true,
//     users,
//   });
// };

// //Update Users Role

// export const updateUserRoleService = async (
//   res: Response,
//   id: string,
//   role: string
// ) => {
//   const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

//   res.status(201).json({
//     success: true,
//     user,
//   });
// };
