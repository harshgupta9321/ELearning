import express from "express";
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registerationUser, socialAuth, updateAccessToken, updateAccessTokenOnReload, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole } from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
const userRouter=express.Router()

userRouter.post('/registration',registerationUser)
userRouter.post('/activate-user',activateUser)
userRouter.post('/login-user',loginUser)
userRouter.get('/logout-user',updateAccessToken,isAuthenticated,logoutUser)
userRouter.get('/refresh',updateAccessTokenOnReload)
userRouter.get('/me',updateAccessToken,isAuthenticated,getUserInfo)
userRouter.post('/social-auth',socialAuth)
userRouter.put('/update-user-info',updateAccessToken,isAuthenticated ,updateUserInfo)
userRouter.put('/update-user-password',updateAccessToken,isAuthenticated ,updatePassword)
userRouter.put('/update-user-avatar',updateAccessToken,isAuthenticated ,updateProfilePicture)
userRouter.get('/get-users',updateAccessToken,isAuthenticated,authorizeRole("admin") ,getAllUsers)
userRouter.put('/update-user-role',updateAccessToken,isAuthenticated,authorizeRole("admin") ,updateUserRole)
userRouter.delete('/delete-user/:id',updateAccessToken,isAuthenticated,authorizeRole("admin") ,deleteUser)

export default userRouter;
