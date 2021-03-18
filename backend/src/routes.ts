import { UserController} from "./controller/UserController";
import { DessertController} from "./controller/DessertController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
}, {
    method: "post",
    route: "/signup",
    controller: UserController,
    action: "signUp"
    },
{
    method: "get",
    route: "/desserts",
    controller: DessertController,
    action: "GetAllDesserts"
}, {
    method: "get",
    route: "/desserts/{id}",
    controller: DessertController,
    action: "GetOneDessert"
}, {
    method: "post",
    route: "/desserts",
    controller: DessertController,
    action: "CreateDessert"
},{
    method: "delete",
    route: "/desserts/{id}",
    controller: DessertController,
    action: "DeleteDessert"
    },
];