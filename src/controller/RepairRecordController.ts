const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

export const RepairRecordController = {
    list: async () => {
        try {
            const repairRecords = await prisma.repairRecord.findMany({
                where : {
                    status : "active"
                },
                include: {
                    device: true,
                    user: true,
                },
                orderBy: {
                    id: "desc"
                }
            });

            return repairRecords;
        } catch (error) {
            return error;
        }
    },

    create : async ({body}: {
        body: {
            customerName: string;
            customerPhone: string;
            deviceName: string;
            deviceId: number;
            deviceBarcode: string;
            deviceSerial: string;
            problem: string;
            
        }
    }) => {
        try {
            const row = await prisma.repairRecord.create({
                data: body
            });

            return { message: "sucess", row: row};
        } catch(error) {
            return error;
        }
    },

    revice: async ({body}: {
        body: {
            amount : number;
            id: number;
        }
    }) => {
        try {
            await prisma.repairRecord.update({
                where: {
                    id: body.id
                },

                data: {
                    amount : body.amount,
                    payDate : new Date(),
                    status: "complete"
                }
            });

            return { message : "success"};
        } catch(error) {
            return error;
        }
    }
}