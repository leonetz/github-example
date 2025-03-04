import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { UserController } from "./controller/UserController";
import { DepartmentController } from "./controller/DepartmentController";
import { SectionController } from "./controller/SectionController";
import { DeviceController } from "./controller/DeviceControllert";
import { RepairRecordController } from "./controller/RepairRecordController";

const app = new Elysia()
  .use(cors())
  .use(jwt({
    name : "jwt",
    secret: "secret",
  }))

  .get("/", () => "Hello Elysia")
  .post("/api/user/signIn", UserController.signIn)

  //user
  .get("/api/user/list", UserController.list)
  .post("/api/user/create", UserController.create)
  .put("/api/user/updateUser/:id", UserController.updateUser)
  .delete("/api/user/remove/:id", UserController.remove)
  .get("/api/user/listEngineer", UserController.listEngineer)
  
  //departmen and section
  .get("/api/department/list", DepartmentController.list)
  .get("/api/section/listByDepartment/:departmentId", SectionController.listByDepartment)


  //device
  .get("/api/device/list", DeviceController.list)
  .post("/api/device/create", DeviceController.create)
  .put("/api/device/remove/:id", DeviceController.remove)

  //RepairRecord
  .post("/api/repairRecord/create", RepairRecordController.create)
  .put("/api/repairRecord/update/:id", RepairRecordController.update)
  .get("/api/repairRecords/list", RepairRecordController.list)
  .put("/api/repairRecord/receive", RepairRecordController.receive)
  .put("/api/repairRecord/remove/:id", RepairRecordController.delete)
  .put("/api/repairRecord/updateStatus/:id", RepairRecordController.updateStatus)
  .get('/api/income/report/:startDate/:endDate', RepairRecordController.report) // API แสดงรายรับตามช่วงวันที่


  .listen(3001);
  

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
