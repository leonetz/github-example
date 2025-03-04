import { PrismaClient } from "@prisma/client";
import { password } from "bun";
const prisma = new PrismaClient;

export const UserController = {
    signIn : async ({ body,  jwt}: {
        body: {
            username: string;
            password: string;
        }; jwt : any
    }) => {
        try {
            const user = await prisma.user.findUnique({
                select: {
                    id: true,
                    name: true,
                    level: true,
                    username: true,
                    createdAt: true,
                    
                },
                where : {
                    username: body.username,
                    password: body.password,
                }
            })

            if(!user) {
                return { message: "ไม่พบ Username และ Password"}
            }

            const token = await jwt.sign(user)

            return {user, token}
        } catch (error) {
            return error;
        }
    },

    list: async () => {
        try{
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    username: true,
                    password: true,
                    level: true,
                    name: true,
                    section: {
                        select: {
                            name: true,
                            id: true,
                            department: {
                                select: {
                                    name: true,
                                    id: true
                                }
                            }
                        }
                    }
                },
                where: {
                    status: "active"
                },
                orderBy: {
                    id: "desc"
                }
            });

            return users;
        } catch (error) {
            return error;
        }
    },

    create : async ({body}: {
        body: {
            username: string;
            password: string;
            level: string;
            name : string;
            sectionId: number;
        }
    }) => {
        try {
            await prisma.user.create({
                data: {
                    username: body.username,
                    password: body.password,
                    level: body.level,
                    name: body.name,
                    sectionId: body.sectionId || null,
                }
            });

            return { message: "sucess"}
        } catch (error){
            return error;
        }
    },

    updateUser: async ({ body, params }: { 
        body: { 
            username: string; 
            password: string; 
            level: string; 
            name: string; 
            sectionId: string; 
        }, 
        params: { 
            id: string; 
        } 
    }) => {
        try {
            const newData = {
                username: body.username,
                password: body.password,
                level: body.level,
                name: body.name,
                sectionId: parseInt(body.sectionId), 
            };
    
            const updatedUser = await prisma.user.update({
                where: { 
                    id: parseInt(params.id) 
                },
                data: newData
            });
    
            return { message: "Suscess"}
        } catch (error) {
            return error;
        }
    },

    remove: async ({ params }: {
        params: { id: string }
    }) => {
        try {
            await prisma.user.delete({
                where: { id: parseInt(params.id) } 
            });
    
            return { message: "success" }
        } catch (error) {
            return error;
        }
    },

    listEngineer : async () => {
        try {
            const engineers = await prisma.user.findMany({
                where : {
                    level : "engineer",
                    status : "active",
                },
                orderBy : {
                    username : "asc"
                }
            });
            return engineers;
        } catch (error) {
            return error;
        }
    },
    


}