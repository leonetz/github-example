const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const DeviceController = {
    create: async ({body}: {
        body: {
            name: string;
            barcode: string;
            remark: string;
            serial: string;
            expireDate: Date;
        }
    }) => {
        try {
             const row = await prisma.device.create({
                data: body
            })

            return { message : "success", row : row};
        } catch (error) {
            return error;
        }
    },

    list : async () => {
        try {
            const devices = await prisma.device.findMany({
                select : {
                    id: true,
                    name: true,
                    barcode: true,
                    remark: true,
                    serial: true,
                    expireDate: true,
                },
                where : {
                    status: "active"
                },
                orderBy : {
                    id : "desc"
                }

            });

            return devices;
        } catch (error) {
            return error;
        }
    },

    remove : async ({params}: {
        params: {
            id: string
        }
    }) => {
        try {
            await prisma.device.update({
                where : {
                    id: parseInt(params.id)
                },
                data: {
                    status: "inactive"
                }
            })

            return { message : "success"}
        } catch (error) {
            return error;
        }
    },
}