import { AppDataSource } from "../data-source";
import { logger } from "../logger";
import { User } from "../models/user";





export async function createUser(user: User,passwordDigest) {

    const {email,firstName,lastName} = user;
    
    const repository = AppDataSource.getRepository(User);

    const newUser = repository.create({
        email,
        firstName,
        lastName,
        passwordDigest
      //  pictureUrl,
       // isAdmin,
      //  passwordHash,
     //   passwordSalt
    });

   user = await AppDataSource.manager.save(newUser);
   return user;
}

export function getUser(){
    
}



export function findUserById(id: string) {
   
 // return UserModel.findById(id);
}

export async function findUserByEmail(email: string) {

    const repository = AppDataSource.getRepository(User);

    return await repository.createQueryBuilder("users")
            .where("email = :email", {email})
            .getOne();
}